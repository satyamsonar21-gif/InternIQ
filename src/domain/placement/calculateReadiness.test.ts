import { describe, it, expect } from 'vitest'
import { calculateReadinessScore, type StudentMetrics } from './calculateReadiness'

describe('Placement Readiness Deterministic Scoring Engine', () => {
  it('calculates score correctly for a high-performing student', () => {
    const metrics: StudentMetrics = {
      totalWorkLogs: 12,
      verifiedWorkLogs: 10,
      completedMilestones: 4,
      totalMilestones: 4,
      taskQualityAvg: 4.8,
      mentorEvaluationAvg: 4.5,
      verifiedSkillsCount: 5,
    }

    const result = calculateReadinessScore(metrics)
    expect(result.overallScore).toBeGreaterThanOrEqual(80)
    expect(result.conversionLikelihood).toBe('High')
  })

  it('calculates score correctly for a developing student', () => {
    const metrics: StudentMetrics = {
      totalWorkLogs: 4,
      verifiedWorkLogs: 2,
      completedMilestones: 1,
      totalMilestones: 4,
      taskQualityAvg: 2.5,
      mentorEvaluationAvg: 3.0,
      verifiedSkillsCount: 2,
    }

    const result = calculateReadinessScore(metrics)
    expect(result.overallScore).toBeLessThan(60)
    expect(result.conversionLikelihood).toBe('Developing')
  })
})
