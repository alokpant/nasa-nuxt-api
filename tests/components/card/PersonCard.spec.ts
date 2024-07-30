// tests/components/card/PersonCard.spec.ts

import { mount } from '@vue/test-utils'
import PersonCard from '@/components/card/PersonCard.vue'
import { describe, it, expect } from 'vitest'

describe('PersonCard', () => {
  const MEMBERS_MOCK = [
    {
      contactId: '1',
      fullName: 'John Doe',
      fullNameInverted: 'Doe, John',
      primaryEmail: 'john.doe@example.com',
      avatarText: 'JD',
    },
    {
      contactId: '2',
      fullName: 'Jane Smith',
      fullNameInverted: 'Smith, Jane',
      primaryEmail: 'jane.smith@example.com',
      avatarText: 'JS',
    }
  ]

  const ROLE_MOCK = 'Manager'

  const getWrapper = (members = MEMBERS_MOCK) =>{
    return mount(PersonCard, {
      props: {
        members,
        role: ROLE_MOCK,
      },
    })
  }

  it('renders members with correct information', () => {
    const wrapper = getWrapper()

    const memberItems = wrapper.findAll('[data-test-id="person-card-list"]')
    expect(memberItems.length).toBe(2)

    MEMBERS_MOCK.forEach((member, index) => {
      const memberItem = memberItems[index]
      const avatarFallback = memberItem.find('[data-test-id="person-card-avatar-fallback"]')
      const name = memberItem.find('[data-test-id="person-card-name"]')
      const email = memberItem.find('[data-test-id="person-card-email"]')
      const roleElement = memberItem.find('[data-test-id="person-card-role"]')

      expect(avatarFallback.text()).toBe(member.avatarText)
      expect(name.text()).toBe(member.fullNameInverted)
      expect(email.text()).toBe(member.primaryEmail)
      expect(roleElement.text()).toBe(ROLE_MOCK)
    })
  })

  it('renders one member when only one is available', () => {
    const wrapper = getWrapper([MEMBERS_MOCK[0]])
    const memberItems = wrapper.findAll('[data-test-id="person-card-list"]')

    expect(memberItems.length).toBe(1)
  })
})
