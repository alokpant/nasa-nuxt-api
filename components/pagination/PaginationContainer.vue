<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'

const props = defineProps(<PaginationRootProps>{
  total: Number,
  page: Number,
  itemsPerPage: Number,
  showEdges: Boolean,
  disabled: Boolean,
})
const emit = defineEmits<{
  (e: 'paginationUpdated', value: Number): void
}>()

const handlePageChange = (value: Number) => {
  emit('paginationUpdated', value)
}

/* computed */
const totalPaginationPages = computed(() => Math.ceil(props.total / props.itemsPerPage))
const disablePrevButtons = computed(() => props.disabled || props.page === 1)
const disableNextButtons = computed(() => props.disabled || totalPaginationPages.value === props.page)

console.log(props, 'pagination props', totalPaginationPages.value, props.page)
</script>

<template>
  <Pagination
    :total="total"
    :disabled="disabled"
    :itemsPerPage="itemsPerPage"
    :siblingCount="2"
    :page="page"
    @update:page="handlePageChange"
    v-if="total > 1">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst :disabled="disablePrevButtons" @click="handlePageChange(1)" />
      <PaginationPrev :disabled="disablePrevButtons" @click="handlePageChange(page - 1)" />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child>
          <Button 
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
            :disabled="page === item.value"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext :disabled="disableNextButtons" @click="handlePageChange(page + 1)" />
      <PaginationLast :disabled="disableNextButtons" @click="handlePageChange(totalPaginationPages)" />
    </PaginationList>
  </Pagination>
</template>
