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
  currentlySelected: {
    type: Number,
    default: ''
  }
})

const emit = defineEmits(['selectUpdated'])

const handleSelectUpdate = (newValue: String) => {
  emit('selectUpdated', newValue)
}

</script>

<template>
  <Select :disabled="disabled"
    :defaultValue="String(currentlySelected)"
    @update:modelValue="handleSelectUpdate"
    data-test-id="select-container"
  >
    <SelectTrigger data-test-id="select-trigger" >
      <SelectValue data-test-id="select-value" placeholder="Select a value" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-for="option in options" :key="option" data-test-id="`select-item-${option}`">
        <SelectItem :value="String(option)"> 
          {{ option }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>