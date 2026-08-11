import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['student', 'faculty', 'industry', 'admin']),
  departmentId: z.string().optional(),
})

export const createInternshipSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  requiredSkills: z.array(z.string()).min(1, 'At least one skill is required'),
  stipend: z.number().nonnegative('Stipend cannot be negative'),
  deadline: z.string().min(1, 'Deadline date is required'),
})

export const workLogSchema = z.object({
  internshipId: z.string().min(1, 'Internship ID is required'),
  logDate: z.string().min(1, 'Log date is required'),
  hoursWorked: z.number().min(0.5, 'Hours worked must be at least 0.5').max(24, 'Hours cannot exceed 24'),
  description: z.string().min(10, 'Work log description must be at least 10 characters'),
  taskTags: z.array(z.string()).default([]),
})

export const taskSchema = z.object({
  title: z.string().min(3, 'Task title must be at least 3 characters'),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  description: z.string().optional(),
  deliverables: z.array(z.object({ id: z.string(), text: z.string() })).min(1, 'At least one deliverable item required'),
  tags: z.array(z.string()).default([]),
})

export const evaluationSchema = z.object({
  technicalSkills: z.number().min(1).max(5),
  communication: z.number().min(1).max(5),
  initiative: z.number().min(1).max(5),
  qualityOfWork: z.number().min(1).max(5),
  professionalism: z.number().min(1).max(5),
  overallComment: z.string().min(5, 'Evaluation comment must be at least 5 characters'),
})

export const aiRequestSchema = z.object({
  prompt: z.string().min(2, 'Prompt text is required'),
  context: z
    .object({
      studentName: z.string().optional(),
      company: z.string().optional(),
      role: z.string().optional(),
      score: z.number().optional(),
    })
    .optional(),
})

export function validatePayload<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return {
    success: false,
    errors: result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
  }
}
