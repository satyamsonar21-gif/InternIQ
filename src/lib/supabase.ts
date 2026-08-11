import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!rawUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables. Operating in local mode.')
}

const supabaseUrl = (rawUrl || 'https://placeholder.supabase.co').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
const validKey = supabaseAnonKey || 'placeholder-key'

export const supabase = createClient(supabaseUrl, validKey)
