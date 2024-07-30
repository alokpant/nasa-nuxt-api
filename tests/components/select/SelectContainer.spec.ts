// tests/components/select/SelectContainer.spec.ts

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SelectContainer from '@/components/select/SelectContainer.vue'
import { Select } from '@/components/ui/select'

describe('SelectContainer', () => {
  const options = [1, 2, 3, 4]
  const currentlySelected = 2

  const getWrapper = (props = {}) => mount(SelectContainer, {
    props: {
      options,
      currentlySelected,
      ...props,
    }
  })

  it('renders options correctly', async () => {
    const wrapper = getWrapper();

    await wrapper.vm.$nextTick();
    const selectedValue = wrapper.find('[data-test-id="select-value"]')
    expect(selectedValue.text()).toBe(currentlySelected.toString())

    const selectContainer = wrapper.find('[data-test-id="select-container"]')
    expect(selectContainer.attributes('disabled')).toBeUndefined()
    expect(selectContainer.findAll('option').length).toBe(options.length)

    // check the disabled state of the button trigger
    const selectTrigger = wrapper.find('[data-test-id="select-trigger"]')
    expect(selectTrigger.attributes('disabled')).not.toBeDefined()
  })

  it('renders empty value when no value is selected', () => {
    const wrapper = getWrapper({ currentlySelected: null })
    const selectedValue = wrapper.find('[data-test-id="select-value"]')
    expect(selectedValue.text()).toBe('')
  })

  it('disables the Select component if disabled prop is true',  () => {
    const wrapper = getWrapper({ disabled: true })

    const selectTrigger = wrapper.find('[data-test-id="select-trigger"]')
    // when disabled, the button should have the disabled attribute with empty value
    expect(selectTrigger.attributes('disabled')).toBeDefined()
  })

  it('emits selectUpdated with the correct value when an option is selected', async () => {
    const wrapper = getWrapper()
    wrapper.findComponent(Select).vm.$emit('update:modelValue', '3')

    expect(wrapper.emitted('selectUpdated')).toHaveLength(1)
    expect(wrapper.emitted('selectUpdated')![0]).toEqual(['3'])

    wrapper.findComponent(Select).vm.$emit('update:modelValue', '3')

    expect(wrapper.emitted('selectUpdated')).toHaveLength(2)
    expect(wrapper.emitted('selectUpdated')![0]).toEqual(['3'])
  })
})
