import { describe, it, expect } from 'vitest'
import { formatDate } from '@/lib/date'
import { parseISO } from 'date-fns'

describe('formatDate', () => {
  it('should format a given date to "yyyy-MM-dd"', () => {
    const date = new Date('2023-07-30T12:00:00Z')
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('2023-07-30')
  })

  it('should handle with different timezones correctly', () => {
    const date = parseISO('2023-07-30T12:00:00+03:00')
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('2023-07-30')
  })

  it('should format the current date correctly', () => {
    const date = new Date()
    const formattedDate = formatDate(date)
    const expectedDate = date.toISOString().split('T')[0]
    expect(formattedDate).toBe(expectedDate)
  })

  it('should handle edge cases', () => {
    const date = new Date('0001-01-01T00:00:00Z')
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('0001-01-01')
  })
})
