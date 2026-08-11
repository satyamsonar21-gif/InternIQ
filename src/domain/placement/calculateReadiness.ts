export interface StudentMetrics {
  totalWorkLogs: number
  verifiedWorkLogs: number
  completedMilestones: number
  totalMilestones: number
  taskQualityAvg: number // 1 to 5 scale
  mentorEvaluationAvg: number // 1 to 5 scale
  verifiedSkillsCount: number
}

export interface ReadinessScoreResult {
  overallScore: number
  workLogScore: number
  milestoneScore: number
  taskScore: number
  mentorScore: number
  skillScore: number
  conversionLikelihood: 'High' | 'Moderate' | 'Developing'
}

export function calculateReadinessScore(metrics: StudentMetrics): ReadinessScoreResult {
  // Work log score (30% weight) - Target: 10 verified logs
  const logRatio = metrics.totalWorkLogs > 0 ? Math.min(metrics.verifiedWorkLogs / Math.max(metrics.totalWorkLogs, 10), 1) : 0
  const workLogScore = Math.round(logRatio * 100)

  // Milestone completion score (20% weight)
  const milestoneRatio = metrics.totalMilestones > 0 ? metrics.completedMilestones / metrics.totalMilestones : 0
  const milestoneScore = Math.round(milestoneRatio * 100)

  // Task quality score (20% weight) - 1 to 5 scale mapped to 0-100
  const taskScore = Math.round(Math.min(Math.max((metrics.taskQualityAvg / 5) * 100, 0), 100))

  // Mentor evaluation score (20% weight) - 1 to 5 scale mapped to 0-100
  const mentorScore = Math.round(Math.min(Math.max((metrics.mentorEvaluationAvg / 5) * 100, 0), 100))

  // Skill assessment score (10% weight) - Target: 5 verified skills
  const skillScore = Math.round(Math.min((metrics.verifiedSkillsCount / 5) * 100, 100))

  const overallScore = Math.round(
    workLogScore * 0.3 +
    milestoneScore * 0.2 +
    taskScore * 0.2 +
    mentorScore * 0.2 +
    skillScore * 0.1
  )

  const conversionLikelihood =
    overallScore >= 80 ? 'High' : overallScore >= 60 ? 'Moderate' : 'Developing'

  return {
    overallScore,
    workLogScore,
    milestoneScore,
    taskScore,
    mentorScore,
    skillScore,
    conversionLikelihood,
  }
}
