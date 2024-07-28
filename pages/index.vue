<script setup>
import useSettingsStore from '~/stores/settings' 
import useProjectsStore from '~/stores/projects'
import CalendarContainer from '@/components/calendar/CalendarContainer.vue'
import { ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    <div class="flex flex-row justify-between items-center">
      <h1 class="text-black dark:text-white text-4xl sm:text-5xl font-semibold">Projects</h1>
      <div class="flex flex-row gap-2">
        <CalendarContainer />
        <span>per page</span>
      </div>
    </div>

    <ul class="grid grid-cols-3 gap-4 items-stretch content-stretch justify-start w-full" >
      <NuxtLink :to="{ name: 'projects-pid', params: { pid: project.projectId } }"
        v-for="project in projects"
        :key="project.id"
        class="h-full self-stretch">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>{{ project.title }}</CardTitle>
            <CardDescription>{{ project.lastUpdated }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm line-clamp-3">{{ project.description }}</p>
          </CardContent>
          <!-- <CardFooter>
            <p class="text-sm line-clamp-3">{{ project.description }}</p>
          </CardFooter> -->
        </Card>
      </NuxtLink>
    </ul>
  </div>
</template>