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

const props = defineProps({
  date: String,
  maxDate: CalendarDate,
  disabled: Boolean,
})
const emit = defineEmits<{
  (e: 'calendarUpdated', value: CalendarDate): void
}>()

// Convert the string to a DateValue
// this is needed as Calendar only works with Internationalized format
const value = ref(parseDateTime(props.date)) as Ref<DateValue>

// This is needed to manually hide the calendar when
// the user selects a date
const calendarOpen = ref(false) 

// TODO: this could be dynamic based on the locale
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const handleCalendarUpdated = (newValue: DateValue) => {
  // when same value is clicked, it puts newValue as undefined
  if (!newValue) return

  emit('calendarUpdated', newValue)
  calendarOpen.value = false
}

</script>

<template>
  <Popover :open="calendarOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
        :disabled="disabled"
        @click="() => { calendarOpen = !calendarOpen }"
        data-test-id="calendar-button"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value"
        initial-focus
        :max-value="maxDate"
        @update:modelValue="handleCalendarUpdated"
        data-test-id="calendar-component"
      />
    </PopoverContent>
  </Popover>
</template>
