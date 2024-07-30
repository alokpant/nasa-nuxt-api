// tests/components/calendar/CalendarContainer.spec.ts

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CalendarContainer from '@/components/calendar/CalendarContainer.vue'
import { today, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

describe('CalendarContainer', () => {
  const currentDate = '2023-01-01'
  const maxDate = today(getLocalTimeZone())
  const getWrapper = (props = {}) => {
    return mount(CalendarContainer, {
      props: {
        date: currentDate,
        maxDate,
        disabled: false,
        ...props,
      },
    })
  }

  it('renders the button with the correct initial date', () => {
    const wrapper = getWrapper()

    const button = wrapper.find('[data-test-id="calendar-button"]')
    expect(button.text()).toContain('January 1, 2023')
    expect(wrapper.findComponent(CalendarIcon).exists()).toBe(true)
  })

  it('disables the button when the disabled prop is true', () => {
    const wrapper = getWrapper({
      disabled: true, 
    });

    const button = wrapper.find('[data-test-id="calendar-button"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('opens and closes the calendar on button click', async () => {
    const wrapper = getWrapper()
    const button = wrapper.find('[data-test-id="calendar-button"]')

    await button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Calendar).exists()).toBe(true)

    await button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(Calendar).exists()).toBe(false)
  })

  it('emits calendarUpdated with the correct value when a date is selected', async () => {
    const wrapper = getWrapper()
    const newDate = today(getLocalTimeZone())

    const button = wrapper.find('[data-test-id="calendar-button"]')
    await button.trigger('click')
    await wrapper.vm.$nextTick()

    const calendar = wrapper.findComponent(Calendar)
    await calendar.vm.$emit('update:modelValue', newDate)

    expect(wrapper.emitted('calendarUpdated')).toHaveLength(1)
    expect(wrapper.emitted('calendarUpdated')![0]).toEqual([newDate])
  })

  it('does not emit when same calendar date is selected', async () => { 
    const wrapper = getWrapper()

    const button = wrapper.find('[data-test-id="calendar-button"]')
    await button.trigger('click')
    await wrapper.vm.$nextTick()

    const calendar = wrapper.findComponent(Calendar)
    await calendar.vm.$emit('update:modelValue', undefined)

    expect(wrapper.emitted('calendarUpdated')).toBeUndefined()
  })
})
