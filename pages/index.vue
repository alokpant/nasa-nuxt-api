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
import {
  getLocalTimeZone,
  today,
} from '@internationalized/date'
// import PageLoading from '@/components/loader/PageLoading.vue'

/* data */
const settingsStore = useSettingsStore()
const projectsStore = useProjectsStore()
const projects = ref([])
const perPageOptions = [10, 25, 50]

const fetchProjects = async () => {
  settingsStore.setIsLoading(true)
  projectsStore.setProjects([])
  
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
}

/* methods */
onMounted(async () => {
  await fetchProjects();
})

const handleCalendarDateUpdate = (date) => {
  settingsStore.setUpdatedSince(date.toLocaleString().substring(0, 10))
}

const handleSelectUpdated = (value) => {
  settingsStore.setPerPage(value)
}

/* watchers */
watch(
  [
    // () => settingsStore.currentPage,
    () => settingsStore.perPage,
    () => settingsStore.updatedSince
  ],
  async () => {
    await fetchProjects();
  }
);
</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">  
    <div class="flex flex-row justify-between items-center content-center">
      <h1
        class="text-3xl font-semibold m-0 self-stretch"
      >
        Projects
      </h1>
      <div class="flex flex-row gap-2 self-stretch">
        <CalendarContainer
          @calendar-updated="handleCalendarDateUpdate"
          :date="settingsStore.updatedSince"
          :disabled="settingsStore.isLoading"
          :max-date="today(getLocalTimeZone())" />
        
        <SelectContainer
          :options="perPageOptions"
          :currentlySelected="settingsStore.perPage"
          @select-updated="handleSelectUpdated"
          :disabled="settingsStore.isLoading"
        />
      </div>
    </div>

    <ul v-if="!settingsStore.isLoading" class="grid grid-cols-3 gap-4 items-stretch content-stretch justify-start w-full" >
      <NuxtLink :to="{ name: 'projects-pid', params: { pid: project.projectId } }"
        v-for="project in projects"
        :key="project.id"
        v-if="projects.length > 0"
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

      <li v-else class="grid col-span-3 items-stretch content-stretch justify-center w-full leading-7 [&:not(:first-child)]:mt-6">
        For given calendar date, there are no projects.
      </li>
    </ul>

    <p v-else>loading...</p>
  </div>
</template>