// tests/components/ProjectCard.spec.ts

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProjectCard from '@/components/project/ProjectCard.vue'

describe('ProjectCard', () => {
  const project = {
    title: 'Project Title',
    startDateString: '2024-01-01',
    endDateString: '2024-12-31',
    viewCount: '100',
    description: '<p>Project Description</p>',
  }

  const getWrapper = () => mount(ProjectCard, {
    props: { project },
  })

  it('renders project title', () => {
    const wrapper = getWrapper()
    expect(wrapper.find('[data-test-id="project-card-title"]').text()).toBe(project.title)
  })

  it('renders project information', () => {
    const wrapper = getWrapper()

    const infoStartsDate = wrapper.find('[data-test-id="project-card-info-start-date"]')
    const infoEndsDate = wrapper.find('[data-test-id="project-card-info-end-date"]')
    const infoViews = wrapper.find('[data-test-id="project-card-info-total-views"]')
    
    expect(infoStartsDate.text()).toContain(project.startDateString)
    expect(infoEndsDate.text()).toContain(project.endDateString)
    expect(infoViews.text()).toContain(project.viewCount)
  })

  it('renders project description', () => {
    const wrapper = getWrapper()
    expect(wrapper.find('.p-0').html()).toContain(project.description)
  })

  it('renders View details button', () => {
    const wrapper = getWrapper()

    expect(wrapper.find('[data-test-id="project-card-view-details-button"]').text()).toBe('View details')
  })
})
