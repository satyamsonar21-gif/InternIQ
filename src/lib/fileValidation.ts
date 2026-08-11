export interface FileValidationResult {
  valid: boolean
  error?: string
}

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp']
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export function validateFileUpload(file: File): FileValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected' }
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds maximum 5MB limit' }
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file format. Only PDF, PNG, JPG, and WEBP files are allowed.' }
  }

  return { valid: true }
}
