import { formatDate } from '@/lib/date'
import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'
import { ref, watch } from 'vue'
import { isBefore, sub } from 'date-fns';
import { useCookie } from 'nuxt/app';

const REFETCH_INTERVAL = 1000 * 60 * 60; // 1 hour
const STORE_KEY = 'projects'
const PROJECT_DETAILS_STORE_KEY = 'projectsDetailCache'

export const useProjectsStore = defineStore(STORE_KEY, () => {
  console.log('store called')

  const projectDetailsCacheCookie = useCookie(PROJECT_DETAILS_STORE_KEY);
  const projects = ref([])
  console.log('store called', projectDetailsCacheCookie.value)
  const projectDetailsCache = ref(projectDetailsCacheCookie.value ? new Map(projectDetailsCacheCookie.value) : new Map());
  console.log('store called', projectDetailsCacheCookie.value)

  const settingsStore = useSettingsStore();

  const fetchProjects = async () => {
    const { updatedSince, currentPage, perPage } = settingsStore;
    console.log('fetching projects', settingsStore)
    const apiUrl = `${process.env.NASA_API_URL}/projects?updatedSince=${updatedSince}`;
    console.log('api called from store')
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.NASA_API_KEY}`
      }
    });
    if (!response.ok) {
      return { error: 'Failed to fetch projects' };
    }

    const result = await response.json();
    settingsStore.settotalResults(result?.projects.length || 0);

    if (result?.projects.length === 0) {   
      projects.value = [];
      return;
    }

    const viewableProjects = result.projects.slice(currentPage , perPage)
    const projectWithDetails = await Promise.all(
      viewableProjects.map(async (
        project: { projectId: string; lastUpdated: string; }
      ) => {
        const projectDetail = await fetchProjectDetail(project);
        return { ...project, ...projectDetail};
      })
    );
    
    return projectWithDetails;
  }

  const fetchProjectDetail = async (project: any) => {
    const cacheKey = formatDate(new Date(project.lastUpdated)); 
    const cacheKeyForProjectDetails = `${project.projectId}-${cacheKey}`;

    if (projectDetailsCache.value.has(cacheKeyForProjectDetails)) {
      const projectDetails = projectDetailsCache.value.get(cacheKeyForProjectDetails);

      // if projectDetails is older than REFETCH_INTERVAL, delete it from cache
      if (
        isBefore(
          projectDetails.lastFetched,
          sub(new Date(), { seconds: REFETCH_INTERVAL })
        )
      ) {
        return projectDetailsCache.value.get(cacheKeyForProjectDetails);
      }    
    }

    const apiUrl = `${process.env.NASA_API_URL}/projects/${project.projectId}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.NASA_API_KEY}`
      }
    });
    if (!response.ok) {
      return { error: 'Failed to fetch projects' };
    }
    const result = await response.json();
    const resultWithLastFetched = { ...result, lastFetched: new Date().toISOString() };
    projectDetailsCache.value.set(cacheKeyForProjectDetails, resultWithLastFetched.project);

    return resultWithLastFetched.project;
  }

  // /* Watchers */
  watch(projectDetailsCache, (newVal) => {
    projectDetailsCacheCookie.value = JSON.stringify(Array.from(newVal.entries()));
  });

  // loadCache();

  return {
    projects,
    projectDetailsCache,
    fetchProjects,
  }
});

export default useProjectsStore;