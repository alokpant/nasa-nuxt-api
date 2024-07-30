import { defineStore } from 'pinia'
import { ref, } from 'vue'
import type { ProjectDetail } from '@/types/ProjectDetail';

const STORE_KEY = 'projects'

const useProjectsStore = defineStore(STORE_KEY, () => {
  const projects = ref<ProjectDetail[]>([]);
  const setProjects = (projectDetails: ProjectDetail[]) => {
    projects.value = projectDetails;
  }

  // TODO: cookies cannot store large amount of data
  // replace this something that is available on both server
  // side as well as client side. localStorage does not work
  // here as it is only available on client side.
  // const PROJECT_DETAILS_STORE_KEY = 'projectsDetails'
  // const projectsWithDetailsCache = useCookie(PROJECT_DETAILS_STORE_KEY);
  // watch(projects, (newVal: ProjectDetail[]) => {
  //   const newProjectsWithDetails: any = {};
  //   if (newVal === undefined || newVal.length === 0) return;

  //   newVal.forEach((project: any) => {
  //     const cacheKey = formatDate(new Date(project.lastUpdated)); 
  //     const cacheKeyForProjectDetails = `${project.projectId}-${cacheKey}`;      
  //     newProjectsWithDetails[cacheKeyForProjectDetails] = {
  //       ...project,
  //       lastFetched: formatDate(new Date(project.lastFetched)),
  //     }; 
  //   });

  //   projectsWithDetailsCache.value = JSON.stringify(newProjectsWithDetails);
  // }, { deep: true, immediate: true });

  return {
    setProjects,
    projects,
  }
});

export default useProjectsStore;