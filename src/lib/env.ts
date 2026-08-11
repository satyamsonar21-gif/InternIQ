import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL must be a valid URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(10, 'VITE_SUPABASE_ANON_KEY must be a valid key string'),
  VITE_GEMINI_API_KEY: z.string().optional(),
  VITE_DEMO_MODE: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
})

export type EnvConfig = z.infer<typeof envSchema>

export function validateEnv(): EnvConfig {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL
  const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  const isProduction = import.meta.env.PROD
  const isPlaceholderUrl = !rawUrl || rawUrl.includes('placeholder.supabase.co')
  const isPlaceholderKey = !rawKey || rawKey === 'placeholder-key'

  if (isProduction && (isPlaceholderUrl || isPlaceholderKey)) {
    throw new Error(
      '🚨 CRITICAL CONFIGURATION ERROR: Missing valid VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables in production build.'
    )
  }

  const parsed = envSchema.safeParse({
    VITE_SUPABASE_URL: rawUrl || 'https://placeholder.supabase.co',
    VITE_SUPABASE_ANON_KEY: rawKey || 'placeholder-key',
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    VITE_DEMO_MODE: import.meta.env.VITE_DEMO_MODE,
  })

  if (!parsed.success) {
    if (isProduction) {
      throw new Error(`Invalid environment configuration: ${parsed.error.message}`)
    }
    console.warn('⚠️ Environment variable validation warnings:', parsed.error.format())
    return {
      VITE_SUPABASE_URL: 'https://placeholder.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'placeholder-key',
      VITE_DEMO_MODE: true,
    }
  }

  return parsed.data
}

export const env = validateEnv()
