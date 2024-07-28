<script setup>
  import { ref } from 'vue'
  import useProjectStore from '~/stores/projects'
  import useSettingsStore from '~/stores/settings' 

  /* data */
  const projectsStore = useProjectStore()
  const settingsStore = useSettingsStore()

  /* computed */
  const projects = computed(() => projectsStore.projects);

  /* methods */
  onMounted(async () => {
    console.log('index called')

    settingsStore.setIsLoading(true);
    const UPDATED_SINCE = '2024-05-01'

    try {
      // await useAsyncData('projects', () => projectStore.fetchProjects())
      await projectsStore.fetchProjects();
    } catch (error) {
      console.log(error)
    } finally {
      settingsStore.setIsLoading(false);
    }
  })

  /* watchers */
  watch(
    [
      () => settingsStore.currentPage,
      () => settingsStore.perPage,
      () => settingsStore.lastUpdated
    ],
    async () => {
      settingsStore.setIsLoading(true);
      await projectsStore.fetchProjects();
      settingsStore.setIsLoading(false);
    }
  );
</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">  
    <h1 class="text-black dark:text-white text-4xl sm:text-5xl font-semibold">Projects</h1>

    <ul class="grid grid-cols-5 gap-4 items-start justify-start w-full" >
      <NuxtLink :to="{ name: 'projects-pid', params: { pid: project.projectId } }" v-for="project in projects.value" :key="project.id" class="border-2 border-black dark:border-white">
        <p>{{ project.projectId }}</p>
        <p>{{ project.lastUpdated }}</p>
        <p class="text-sm line-clamp-3">{{ project.description }}</p>
      </NuxtLink>
    </ul>
  </div>
</template>