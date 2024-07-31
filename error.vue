<script setup>
import { House as HouseIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'
const error = useError();
</script>

<template>
  <NuxtLayout>
    <div class="prose">
      <div class='flex flex-col'>
        <div class="flex justify-start w-full gap-3 mb-6">
          <Button @click="$router.back()"
            data-test-id="project-page-back-button">
            <ArrowLeftIcon class="h-4 w-4" />
          </Button>
          <Button @click="$router.push({ path: '/' })"
            data-test-id="project-page-home-button">
            <HouseIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
        
	    <template v-if="error.statusCode === 404">
	      <h1 class="text-3xl font-semibold">404!</h1>
	      <p>Sorry, that page doesn't exist.</p>
	    </template>

      <template v-else>
	      <h1 class="text-3xl font-semibold">Dang</h1>
				<p>
				  <strong>{{ error.message }}</strong>
				</p>
	      <p>It looks like something broke.</p>
	      <p>Sorry about that.</p>
      </template>
    </div>
  </NuxtLayout>
</template>
