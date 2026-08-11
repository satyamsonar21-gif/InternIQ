import { describe, it, expect } from 'vitest'
import { askGemini36Flash } from './gemini'

describe('Gemini AI Assistant Integration', () => {
  it('returns valid AI response (or offline fallback intelligence) for prompt queries', async () => {
    const response = await askGemini36Flash('What is my placement readiness score?')
    expect(response).toBeDefined()
    expect(response.text).toBeTypeOf('string')
    expect(response.text.length).toBeGreaterThan(10)
    expect(response.modelUsed).toBeDefined()
  })
})
