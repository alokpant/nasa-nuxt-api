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

const props = defineProps<{
  project: any
}>()

const projectInfo = ref<Record<string, string>[]>([
  { title: 'Start Date', value: props.project.startDateString },
  { title: 'End Date', value: props.project.endDateString },
  { title: 'Total views', value: props.project.viewCount },
])
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
      <div class="flex flex-col md:flex-row justify-between">
        <div class="flex flex-col" v-for="info in projectInfo" :key="info.title">
          <p class="text-sm tracking-tight font-semibold text-gray-700 mb-2">{{ info.title }}</p>
          <p class="text-sm">{{ info.value }}</p>
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
