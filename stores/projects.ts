import { formatDate } from '@/lib/date'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useCookie } from 'nuxt/app';

const REFETCH_INTERVAL = 1000 * 60 * 60; // 1 hour
const STORE_KEY = 'projects'
const PROJECT_DETAILS_STORE_KEY = 'projectsDetails'

export const useProjectsStore = defineStore(STORE_KEY, () => {
  const projectsWithDetailsCache = useCookie(PROJECT_DETAILS_STORE_KEY);
  const projects = ref([]);

  const setProjects = (projectDetails: any[]) => {
    projects.value = projectDetails;
  }

  watch(projects, (newVal) => {
    const newProjectsWithDetails: any = {};

    newVal.forEach((project: any) => {
      const cacheKey = formatDate(new Date(project.lastUpdated)); 
      const cacheKeyForProjectDetails = `${project.projectId}-${cacheKey}`;      
      newProjectsWithDetails[cacheKeyForProjectDetails] = {
        ...project,
        lastFetched: formatDate(new Date(project.lastFetched)),
      }; 
    });

    projectsWithDetailsCache.value = JSON.stringify(newProjectsWithDetails);
  }, { deep: true, immediate: true });

  return {
    setProjects,
    projects,
  }
});

export default useProjectsStore;