<script setup>
import useSettingsStore from '~/stores/settings' 
import useProjectsStore from '~/stores/projects'
import { ref } from 'vue'

/* data */
const settingsStore = useSettingsStore()
const projectsStore = useProjectsStore()
const projects = ref([])

/* methods */
onMounted(async () => {
  settingsStore.setIsLoading(true)  
  
  try {
    const response = await fetch('/api/projects');
    const { projectsWithDetails, totalCount } = await response.json()
    projects.value = projectsWithDetails
    await projectsStore.setProjects(projectsWithDetails)
    await settingsStore.setTotalResults(totalCount)
  } catch (error) {
    console.log(error)
  } finally {
    settingsStore.setIsLoading(false)
  }
})
</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">  
    <h1 class="text-black dark:text-white text-4xl sm:text-5xl font-semibold">Projects</h1>

    <ul class="grid grid-cols-3 gap-4 items-start justify-start w-full" >
      <NuxtLink :to="{ name: 'projects-pid', params: { pid: project.projectId } }"
        v-for="project in projects"
        :key="project.id"
        class="border-2 border-black dark:border-white">
        <p>{{ project.projectId }}</p>
        <p>{{ project.lastUpdated }}</p>
        <p class="text-sm line-clamp-3">{{ project.title }}</p>
      </NuxtLink>
    </ul>
  </div>
</template>