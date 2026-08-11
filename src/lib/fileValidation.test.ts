import { describe, it, expect } from 'vitest'
import { validateFileUpload } from './fileValidation'

describe('File Upload Validation', () => {
  it('approves valid PDF file under 5MB', () => {
    const file = new File(['content'], 'resume.pdf', { type: 'application/pdf' })
    const result = validateFileUpload(file)
    expect(result.valid).toBe(true)
  })

  it('rejects unsupported file formats like .exe or .txt', () => {
    const file = new File(['binary'], 'script.exe', { type: 'application/x-msdownload' })
    const result = validateFileUpload(file)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('Invalid file format')
  })

  it('rejects files larger than 5MB', () => {
    const largeContent = new Uint8Array(6 * 1024 * 1024)
    const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' })
    const result = validateFileUpload(file)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('exceeds maximum 5MB limit')
  })
})
