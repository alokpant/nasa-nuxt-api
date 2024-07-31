<script setup>
import { Terminal } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
</script>

<template>
  <Alert>
    <Terminal class="h-4 w-4" />
    <AlertTitle>Something went wrong</AlertTitle>
    <AlertDescription>
      An error occurred while processing your request. Please try again later.
    </AlertDescription>
    <Button as-child="" class="mt-6 text-sm ml-6">
      <NuxtLink to="/">Go to home page</NuxtLink>
    </Button>
  </Alert>
</template>