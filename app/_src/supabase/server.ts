import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.SUPABASE_API_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

export const supabaseEnv = {
  devSupabaseTablePostFix: process.env.DEV_SUPABASE_TABLE_POSTFIX ?? '',
}
