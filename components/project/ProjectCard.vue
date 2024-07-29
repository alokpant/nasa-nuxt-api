<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import { ProjectDetail } from '@/types/ProjectDetail';

defineProps<{
  project: any
}>()
</script>

<template>
  <Card class="h-full group flex flex-col justify-between content-between bg-slate-50 hover:bg-slate-100 transition-colors duration-200 ease-in-out">
    <CardHeader>
      <CardTitle
        :title="project.title"
        class="lg:min-h-[80px] text-lg tracking-tight text-gray-900 line-clamp-3 m-0 group-hover:text-gray-800">
        {{ project.title }}
      </CardTitle> 
    </CardHeader>
    <span class="mb-6 mx-6 border-b-2 h-0 border-gray-200 border-dashed" />
    <CardContent class="flex flex-col justify-between">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <p class="text-sm tracking-tight font-semibold text-gray-700 mb-2">Start Date</p>
          <p class="text-sm">{{ project.startDateString }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-sm tracking-tight font-semibold text-gray-700 mb-2">End Date</p>
          <p class="text-sm">{{ project.endDateString }}</p>
        </div>
        <div class="flex flex-col">
          <p class="text-sm tracking-tight font-semibold text-gray-700 mb-2">View count</p>
          <p class="text-sm">{{ project.viewCount }}</p>
        </div>
      </div>
      <span class="my-6 border-b-2 h-0 border-gray-200 border-dashed" />
      <div class="p-0 line-clamp-3" v-html="project.description"></div>
    </CardContent>
    <CardFooter>
      <Button>View details</Button>
    </CardFooter>
  </Card>
</template>
