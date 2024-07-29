<script setup lang="ts">
import { ref } from 'vue'
import {
  CalendarDate,
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  today,
  parseDateTime
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// Create the date formatter
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const settingsStore = useSettingsStore()
const { updatedSince, setUpdatedSince } = settingsStore

// Convert the string to a DateValue
// this is needed as Calendar only works with Internationalized format
const value = ref(parseDateTime(updatedSince)) as Ref<DateValue>

watch(value, () => {
  setUpdatedSince(value.value.toLocaleString().substring(0, 10))
})

</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
