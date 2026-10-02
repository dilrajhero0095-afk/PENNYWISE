import { createClient } from '@supabase/supabase-js'

// Accept the common names for Supabase settings, including the ones set by the Netlify Supabase extension.
const env = import.meta.env
const url = (env.VITE_SUPABASE_URL || env.VITE_SUPABASE_DATABASE_URL || env.SUPABASE_URL || env.SUPABASE_DATABASE_URL) as string | undefined
const publishableKey = (env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY) as string | undefined

export const supabaseConfigured = Boolean(url && publishableKey)
export const supabaseMissing = [!url && 'VITE_SUPABASE_URL', !publishableKey && 'VITE_SUPABASE_PUBLISHABLE_KEY'].filter(Boolean) as string[]
export const supabase = supabaseConfigured && url && publishableKey ? createClient(url, publishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null
