// tests/components/ProjectCard.spec.ts

import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ProjectCard from '@/components/project/ProjectCard.vue'

describe('ProjectCard', () => {
  const project = {
    title: 'Project Title',
    startDateString: '2024-01-01',
    endDateString: '2024-12-31',
    viewCount: '100',
    description: '<p>Project Description</p>',
    projectId: 123,
  }

  const getWrapper = () => mount(ProjectCard, {
    props: { project },
    global: {
      stubs: {
        NuxtLink: RouterLinkStub,
      }
    }
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

  it('renders action button', () => {
    const wrapper = getWrapper()

    expect(wrapper.find('[data-test-id="project-card-view-details-button"]').text()).toBe('View details')
    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({ name: 'projects-pid', params: { pid: project.projectId } })

  })
})
