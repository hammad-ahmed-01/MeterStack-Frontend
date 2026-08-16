"use client"

import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

import { ErrorState } from "@/components/shared/error-state"
import { FullPageSpinner } from "@/components/shared/spinner"
import { useOrganization } from "@/providers/organization-provider"

export function RequireOrganization({ children }: { children: ReactNode }) {
  const { hasOrganization, isLoading, isError } = useOrganization()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isError && !hasOrganization) {
      router.replace("/onboarding")
    }
  }, [hasOrganization, isError, isLoading, router])

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-svh max-w-lg items-center px-4">
        <ErrorState
          title="Could not load your organization"
          description="The API is unreachable or returned an unexpected error. Start the Express backend and try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  if (!hasOrganization) {
    return <FullPageSpinner />
  }

  return <>{children}</>
}
