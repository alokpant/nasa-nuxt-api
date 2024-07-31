<script setup>
import Alert from '@/components/alert/Alert.vue'
import { Toaster } from '@/components/ui/toast'
import Button from '@/components/ui/button/Button.vue';

const resetError = (error) => {
  error.value = null
}

</script>
<template>
  <div class="p-8 max-w-screen-lg mx-auto">
    <NuxtLoadingIndicator color="#348feb" />
    <NuxtErrorBoundary>
      <slot />
      <template #error="{ error, refresh }">
        <Alert  />
      </template>
    </NuxtErrorBoundary>  
    <Toaster />
  </div>
</template>