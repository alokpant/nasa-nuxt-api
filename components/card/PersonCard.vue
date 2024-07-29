<script setup lang="ts">
import { ref } from 'vue'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps<{
  members: ManagerContactInformation[],
  role: string
}>()

const avatarFallbackText = (name: string) => {
  const nameArray = name.split(' ')
  const lastName = nameArray[nameArray.length - 1][0]
  return `${name.charAt(0).toUpperCase()}${lastName.toUpperCase()}`
}

</script>

<template>
  <ul class="flex items-center justify-start space-x-4 gap-6">
    <li class="flex items-center space-x-4" v-for="member in members" :key="member.contactId">
      <Avatar>
        <AvatarFallback>{{  avatarFallbackText(member.fullName) }}</AvatarFallback>
      </Avatar>
      <div>
        <p class="text-sm font-semibold leading-none">
          {{ member.fullNameInverted }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ member.primaryEmail }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ role }}
        </p>
      </div>
    </li>
  </ul>
</template>
