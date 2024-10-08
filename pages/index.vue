<script setup>
import useSettingsStore from '~/stores/settings' 
import useProjectsStore from '~/stores/projects'
import CalendarContainer from '@/components/calendar/CalendarContainer.vue'
import { ref } from 'vue'
import {
  getLocalTimeZone,
  today,
} from '@internationalized/date'
// import { ProjectDetail } from '~/types/ProjectDetail.ts'
import PageLoading from '@/components/loader/PageLoading.vue'
import { useToast } from '@/components/ui/toast/use-toast'

/* data */
const settingsStore = useSettingsStore()
const projectsStore = useProjectsStore()
const projects = ref([])
const perPageOptions = [12, 24, 48]
const { toast } = useToast()

/* methods */
onMounted(async () => {
  await fetchProjects();
})

const fetchProjects = async () => {
  settingsStore.setIsLoading(true)
  projectsStore.setProjects([])
  
  try {
    const { projectsWithDetails, totalCount } = await $fetch('/api/projects');
    projects.value = projectsWithDetails
    await settingsStore.setTotalResults(totalCount)
  } catch (error) {
    toast({
      title: 'Something went wrong',
      description: error.statusMessage,
      type: 'background'
    });
  } finally {
    settingsStore.setIsLoading(false)
  }
}

const handleCalendarDateUpdate = (date) => {
  settingsStore.setUpdatedSince(date.toLocaleString().substring(0, 10))
}

const handleSelectUpdated = (value) => {
  settingsStore.setPerPage(value)
  settingsStore.setCurrentPage(1)
  settingsStore.setTotalResults(0)
}

const handlePaginationUpdate = (page) => {
  settingsStore.setCurrentPage(page)
}

/* computed */
const totalPaginationItems = computed(() => Math.ceil(settingsStore.totalResults / settingsStore.perPage))

/* watchers */
watch(
  [
    () => settingsStore.currentPage,
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
    <div class="flex flex-col sm:flex-row justify-between items-center content-center"> 
      <h1
        class="text-xl md:text-3xl font-semibold m-0 mb-6 sm:mb-0 self-stretch tight" 
      >
        Nasa TechPort Projects
      </h1>
      <div class="flex flex-row gap-2 self-stretch w-[220px]">
        <CalendarContainer
          @calendar-updated="handleCalendarDateUpdate"
          :date="settingsStore.updatedSince"
          :disabled="settingsStore.isLoading"
          :max-date="today(getLocalTimeZone())" />
        
        <div class="w-[60px]">
          <SelectContainer
            :options="perPageOptions"
            :currentlySelected="settingsStore.perPage"
            @select-updated="handleSelectUpdated"
            :disabled="settingsStore.isLoading"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-end content-stretch mt-3 sm:mt-0" v-if="!settingsStore.isLoading">
      <h3
        class="text-sm m-0 mt-6 sm:mt-0 order-2 sm:order-1 self-end w-full"
      >
        Total results: <span class="font-semibold">{{ settingsStore.totalResults }}</span>
      </h3>
      <PaginationContainer
        class="order-1 sm:order-2"
        v-if="totalPaginationItems > 1"
        :disabled="settingsStore.isLoading"
        :total="Number(settingsStore.totalResults)"
        :itemsPerPage="Number(settingsStore.perPage)"
        :page="Number(settingsStore.currentPage)"
        @pagination-updated="handlePaginationUpdate" />
    </div>

    <div v-if="!settingsStore.isLoading" class="flex flex-col justify-between items-end content-stretch w-full">
      <ul class="grid sm:grid-cols-2 md:grid-cols-3 xlg:grid-cols-4 gap-4 items-stretch content-stretch justify-start w-full" >
        <li v-for="project in projects"
          :key="project.id"
          v-if="projects.length > 0"
          class="h-full self-stretch">
          <ProjectCard :project="project" />
        </li>

        <li v-else class="grid col-span-3 items-stretch content-stretch justify-center w-full leading-7 [&:not(:first-child)]:mt-6">
          For given calendar date, there are no projects.
        </li>
      </ul>

      <div class="flex flex-row py-6 justify-between items-end content-stretch" v-if="!settingsStore.isLoading && totalPaginationItems > 1">
        <PaginationContainer
          :total="Number(settingsStore.totalResults)"
          :itemsPerPage="Number(settingsStore.perPage)"
          :page="Number(settingsStore.currentPage)"
          @pagination-updated="handlePaginationUpdate" />
      </div>
    </div>
    <div v-else class="flex flex-col justify-start items-center content-start w-full h-[100px] pt-6">
      <PageLoading />
    </div>
  </div>
</template>