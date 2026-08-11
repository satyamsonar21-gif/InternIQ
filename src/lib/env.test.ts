import { describe, it, expect } from 'vitest'
import { validateEnv } from './env'

describe('Environment Guardrails', () => {
  it('returns valid env config or default placeholders', () => {
    const config = validateEnv()
    expect(config).toBeDefined()
    expect(config.VITE_SUPABASE_URL).toBeDefined()
    expect(config.VITE_SUPABASE_ANON_KEY).toBeDefined()
  })
})
