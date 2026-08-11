import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  registerSchema,
  createInternshipSchema,
  workLogSchema,
  validatePayload,
} from './validation'

describe('Zod Payload Validation Schemas', () => {
  it('validates correct login credentials', () => {
    const payload = { email: 'student@interniq.io', password: 'password123' }
    const result = validatePayload(loginSchema, payload)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email addresses in login', () => {
    const payload = { email: 'invalid-email', password: '123' }
    const result = validatePayload(loginSchema, payload)
    expect(result.success).toBe(false)
  })

  it('validates register payload', () => {
    const payload = {
      fullName: 'Arjun Mehta',
      email: 'arjun@example.com',
      password: 'securePassword123',
      role: 'student',
    }
    const result = validatePayload(registerSchema, payload)
    expect(result.success).toBe(true)
  })

  it('validates internship creation schema', () => {
    const payload = {
      title: 'Frontend Developer Intern',
      companyName: 'TechVista',
      requiredSkills: ['React', 'TypeScript'],
      stipend: 15000,
      deadline: '2026-09-01',
    }
    const result = validatePayload(createInternshipSchema, payload)
    expect(result.success).toBe(true)
  })

  it('rejects work logs with invalid hours worked', () => {
    const payload = {
      internshipId: 'intern-1',
      logDate: '2026-08-11',
      hoursWorked: 30, // Exceeds max 24
      description: 'Worked on React UI components',
    }
    const result = validatePayload(workLogSchema, payload)
    expect(result.success).toBe(false)
  })
})
