<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  disabled: Boolean,
  currentlySelected: Number,
})

const emit = defineEmits(['selectUpdated'])

const handleSelectUpdate = (newValue: String) => {
  emit('selectUpdated', newValue)
}

</script>

<template>
  <Select :disabled="disabled" :defaultValue="currentlySelected" @update:modelValue="handleSelectUpdate">
    <SelectTrigger>
      <SelectValue placeholder="Select a value" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="option in options" :key="option">
        <SelectItem :value="option" :disabled="option === currentlySelected">
          {{ option }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>