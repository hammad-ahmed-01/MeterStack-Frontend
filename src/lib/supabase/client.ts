import { createBrowserClient } from "@supabase/ssr"

import { env, isSupabaseConfigured } from "@/config/env"

export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env.local and add your project credentials.",
    )
  }

  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey)
}
