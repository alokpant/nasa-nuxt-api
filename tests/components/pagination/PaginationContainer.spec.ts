// tests/components/pagination/PaginationContainer.spec.ts

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PaginationContainer from '@/components/pagination/PaginationContainer.vue'
import { Button } from '@/components/ui/button'
import {
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrev,
  Pagination,
} from '@/components/ui/pagination'

describe('PaginationContainer', () => {
  const total = 50
  const itemsPerPage = 10
  const currentPage = 1
  const getWrapper = (props = {}) => {
    return mount(PaginationContainer, {
      props: {
        total,
        page: currentPage,
        itemsPerPage,
        showEdges: true,
        disabled: false,
        ...props,
      },
    })
  }

  it('renders pagination correctly', () => {
    const wrapper = getWrapper()

    const paginationContainer = wrapper.find('[data-test-id="pagination-container"]')
    expect(paginationContainer.exists()).toBe(true)
  })

  it('disabled buttons on disabled is true', () => {
    const wrapper = getWrapper({
      disabled: true
    });

    [
      PaginationFirst, PaginationPrev, PaginationNext, PaginationLast
    ].forEach(component => {
      expect(wrapper.findComponent(component).attributes('disabled')).toBeDefined()
    })

    wrapper.findAllComponents(Button).forEach(button => {
      expect(button.attributes('disabled')).toBeDefined()
    })
  });

  it('disables previous buttons on first page', () => {
    const wrapper = getWrapper()

    const firstButton = wrapper.findComponent(PaginationFirst)
    const prevButton = wrapper.findComponent(PaginationPrev)

    expect(firstButton.attributes('disabled')).toBeDefined()
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next buttons on last page', () => {
    const wrapper = mount(PaginationContainer, {
      props: {
        total,
        page: Math.ceil(total / itemsPerPage),
        itemsPerPage,
        showEdges: true,
        disabled: false,
      },
    })

    const nextButton = wrapper.findComponent(PaginationNext)
    const lastButton = wrapper.findComponent(PaginationLast)

    expect(nextButton.attributes('disabled')).toBeDefined()
    expect(lastButton.attributes('disabled')).toBeDefined()
  })

  it('emits paginationUpdated with correct value when a page number is clicked', async () => {
    const wrapper = getWrapper()

    wrapper.findComponent(Pagination).vm.$emit('update:page', 2)
    expect(wrapper.emitted('paginationUpdated')).toHaveLength(1)
    expect(wrapper.emitted('paginationUpdated')![0]).toEqual([2])

    wrapper.findComponent(Pagination).vm.$emit('update:page', 4)
    expect(wrapper.emitted('paginationUpdated')).toHaveLength(2)
    expect(wrapper.emitted('paginationUpdated')).toEqual([[2], [4]])
  })
})
