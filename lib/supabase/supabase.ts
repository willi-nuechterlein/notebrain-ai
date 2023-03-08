import { createClient } from '@supabase/supabase-js'
import { Session } from 'next-auth'

const supabaseClient = (session?: Session | null) => {
  let supabaseAccessToken
  if (session) {
    supabaseAccessToken = session.supabaseAccessToken
  }
  const authHeader = session
    ? [
        {
          global: {
            headers: {
              Authorization: `Bearer ${supabaseAccessToken}`
            }
          }
        }
      ]
    : []
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    ...authHeader
  )
}

export default supabaseClient
