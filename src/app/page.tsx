import type { Metadata } from "next"

import { LandingPage } from "@/components/marketing/landing-page"
import { isSupabaseConfigured } from "@/config/env"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  description:
    "MeterStack is API management and monetization infrastructure for developers, built incrementally in public from a SaaS foundation toward metering, billing, and distributed systems.",
}

export default async function Home() {
  let isAuthenticated = false

  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    isAuthenticated = Boolean(user)
  }

  return <LandingPage isAuthenticated={isAuthenticated} />
}
