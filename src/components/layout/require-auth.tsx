"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

import { FullPageSpinner } from "@/components/shared/spinner"
import { useAuth } from "@/providers/auth-provider"

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, isConfigured } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && isConfigured && !isAuthenticated) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : ""
      router.replace(`/login${next}`)
    }
  }, [isAuthenticated, isConfigured, isLoading, pathname, router])

  if (!isConfigured || isLoading) {
    return <FullPageSpinner />
  }

  if (!isAuthenticated) {
    return <FullPageSpinner />
  }

  return <>{children}</>
}
