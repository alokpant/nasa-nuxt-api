<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { cn } from '@/lib/utils'
import PersonCard from '@/components/card/PersonCard.vue'
import { House as HouseIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'
import PageLoading from '@/components/loader/PageLoading.vue'
import { ProjectDetail } from '@/types/ProjectDetail.ts'
import { useSettingsStore } from '@/stores/settings'

const route = useRoute();
const settingsStore = useSettingsStore();
const project = ref<ProjectDetail>({});

/* computed */
const lastUpdatedAt = computed(() => (new Date(project.value?.lastUpdated)).toLocaleDateString())

/* methods */
onMounted(async () => {
  settingsStore.setIsLoading(true)
  const pid = useRoute().params.pid;
  try {
    const response = await fetch(`/api/projects/${pid}`);
    project.value = await response.json()
    console.log('invidiual project', project.value)
  } catch (error) {
    console.log(error)
  } finally {
    settingsStore.setIsLoading(false)
  }
})

useSeoMeta({
  title: () => project.value?.title,
  ogTitle: () => project.value?.title,
  description: () => project.value?.description,
  ogDescription: () => project.value?.description,
  ogImage: "https://techport.nasa.gov/images/NASA-Logo.png",
  twitterCard: 'summary_large_image',
})
</script>


<template>
  <div class='flex flex-col'>
    <div class="flex justify-start w-full gap-3">
      <Button @click="$router.back()"
        data-test-id="project-page-back-button">
        <ArrowLeftIcon class="h-4 w-4" />
      </Button>
      <Button @click="$router.push({ path: '/' })"
        data-test-id="project-page-home-button">
        <HouseIcon class="h-4 w-4" />
      </Button>
    </div>

  <div class='flex flex-col text-sm'
    data-test-id="project-page-container"
    v-if="!settingsStore.isLoading"
  >
    <div class="flex flex-col"
      v-if="project"
      data-test-id="project-page-content"
    >
      <header class="flex flex-col mt-6 justify-between">
        <h3 class="text-sm font-semibold">{{ project.program.title }}</h3>
        <h1 class="text-2xl font-semibold ">{{ project.title }}</h1>
      </header>

      <main class="flex mt-6 flex-col justify-between">
        <div class="flex flex-col justify-start">
          <div class="flex flex-col md:flex-row">
            <p class="text-sm md:pr-1 tracking-tight font-semibold text-gray-700 mb-2">Start Date:</p>
            <p class="text-sm">{{ project.startDateString }}</p>
          </div>
          <div class="flex flex-col md:flex-row">
            <p class="text-sm md:pr-1 tracking-tight font-semibold text-gray-700 mb-2">End Date:</p>
            <p class="text-sm">{{ project.endDateString }}</p>
          </div>
          <div class="flex flex-col md:flex-row">
            <p class="text-sm md:pr-1 tracking-tight font-semibold text-gray-700 mb-2">Total views:</p>
            <p class="text-sm">{{ project.viewCount }}</p>
          </div>
          <div class="flex flex-col md:flex-row">
            <p class="text-sm md:pr-1 tracking-tight font-semibold text-gray-700 mb-2">Release Status:</p>
            <p :class="cn(
              'text-sm',
              project.releaseStatusString === 'Released' && 'text-green-800',
            )">{{ project.releaseStatusString }}</p>
          </div>
          <div class="flex flex-col md:flex-row">
            <p class="text-sm md:pr-1 tracking-tight font-semibold text-gray-700 mb-2">Last Updated:</p>
            <p class="text-sm">{{ lastUpdatedAt }}</p>
          </div>
          <div class="flex flex-col md:flex-row" v-if="project.website">
            <p class="text-sm md:pr-1 tracking-tight font-semibold text-gray-700 mb-2">Website:</p>
            <p class="">{{ project.website }}</p>
          </div>
        </div>

        <div class="flex flex-col justify-start gap-3 py-6" v-html="project.description"></div>

        <div class="flex flex-col justify-start gap-3 py-6" v-if="project.benefits">
          <h2 class="text-lg font-semibold">Benefits</h2>
          <div class="flex flex-col justify-start gap-3" v-html="project.benefits"></div>
        </div>

        <div class="flex flex-col justify-start gap-3 py-6" v-if="project.leadOrganization">
          <h2 class="text-lg font-semibold">Lead Organizations</h2>
          <ul class="flex flex-col">
            <li class="font-semibold">
              {{ project.leadOrganization.organizationName }}
              <span v-if="project.leadOrganization.acronym">
                ({{ project.leadOrganization.acronym }})
              </span>
            </li>
            <li>
              {{ project.leadOrganization.city }}
              <span v-if="project.leadOrganization?.country?.abbreviation">
                ,&nbsp;{{ project.leadOrganization.country.abbreviation }}
              </span>
            </li>
          </ul>
        </div>

        <h2 class="text-lg font-semibold pt-6">Members</h2>

        <div class="flex flex-col justify-start gap-3 py-6" v-if="project.principalInvestigators?.length > 0">
          <PersonCard :members="project.principalInvestigators" role="Principal Investigator" />
        </div>

        <div class="flex flex-col justify-start gap-3 py-6" v-if="project.programManagers?.length > 0">
          <PersonCard :members="project.programManagers" role="Program Manager" />
        </div>

        <div class="flex flex-col justify-start gap-3 py-6" v-if="project.projectManagers?.length > 0">
          <PersonCard :members="project.projectManagers" role="Project Manager" />
        </div>
      </main>
    </div>

    <div
      v-else
      data-test-id="project-page-not-found"
      class="flex flex-col justify-start items-center content-start w-full h-[100px] pt-6">
      <h3 class="text-sm font-semibold">Project not found</h3>
    </div>
  </div>

  <div v-else
    class="flex flex-col justify-start items-center content-start w-full h-[100px] pt-6">
    data-test-id="project-page-loading">
    <PageLoading />
  </div>
</div>
</template>