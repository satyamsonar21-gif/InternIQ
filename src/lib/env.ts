import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL must be a valid HTTP/HTTPS URL').optional().default('https://placeholder.supabase.co'),
  VITE_SUPABASE_ANON_KEY: z.string().min(10, 'VITE_SUPABASE_ANON_KEY must be a valid key string').optional().default('placeholder-key'),
  VITE_GEMINI_API_KEY: z.string().optional(),
})

export type EnvConfig = z.infer<typeof envSchema>

export function validateEnv(): EnvConfig {
  const parsed = envSchema.safeParse({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  })

  if (!parsed.success) {
    console.warn('⚠️ Environment variable validation warnings:', parsed.error.format())
    return {
      VITE_SUPABASE_URL: 'https://placeholder.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'placeholder-key',
    }
  }

  return parsed.data
}

export const env = validateEnv()
