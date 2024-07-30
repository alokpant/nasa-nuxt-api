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
import type { ManagerContactInformation } from '@/types/ManagerContactInformation';

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
    <li class="flex items-center space-x-4" data-test-id="person-card-list" v-for="member in members" :key="member.contactId">
      <Avatar>
        <AvatarFallback data-test-id="person-card-avatar-fallback">{{  avatarFallbackText(member.fullName) }}</AvatarFallback>
      </Avatar>
      <div class="flex flex-col">
        <p class="text-sm font-semibold leading-none" data-test-id="person-card-name">{{ member.fullNameInverted }}</p>
        <p class="text-sm text-muted-foreground" data-test-id="person-card-email">{{ member.primaryEmail }}</p>
        <p class="text-sm text-muted-foreground" data-test-id="person-card-role">{{ role }}</p>
      </div>  
    </li>
  </ul>
</template>
