"use client"

import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

import { RequireAuth } from "@/components/layout/require-auth"
import { FullPageSpinner } from "@/components/shared/spinner"
import { useOrganization } from "@/providers/organization-provider"

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <RedirectIfOrganized>{children}</RedirectIfOrganized>
    </RequireAuth>
  )
}

function RedirectIfOrganized({ children }: { children: ReactNode }) {
  const { hasOrganization, isLoading } = useOrganization()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && hasOrganization) {
      router.replace("/dashboard")
    }
  }, [hasOrganization, isLoading, router])

  if (isLoading || hasOrganization) {
    return <FullPageSpinner />
  }

  return <>{children}</>
}
