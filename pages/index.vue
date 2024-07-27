<script setup>
const loading = ref(false)
const data = ref([])

onMounted(async () => {
  loading.value = true

  const UPDATED_SINCE = '2024-05-01'

  try {
    console.log(`${process.env.NASA_API_URL}projects?api_key=${process.env.API_KEY}&updated_since=${UPDATED_SINCE}`)
    const response = await fetch(`/api/projects?updated_since=${UPDATED_SINCE}&page=${1}&limit=${10}`);
    data.value = await response.json()
    console.log('data index', data)  
  } catch (error) {
    console.log(error)
    loading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col gap-6 w-full h-full">  
    <h1 class="text-black dark:text-white text-4xl sm:text-5xl font-semibold">Projects</h1>

    <ul class="grid grid-cols-5 gap-4 items-center justify-start w-full h-screen">
      <li v-for="item in data" :key="item.id" class="border-2 border-black dark:border-white">
        <p>{{ item.projectId }}</p>
        <p>{{ item.lastUpdated }}</p>
      </li>
    </ul>
  </div>
</template>