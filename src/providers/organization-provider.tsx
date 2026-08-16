"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { useCurrentOrganization } from "@/hooks/use-organization"
import type { Organization } from "@/types"

type OrganizationContextValue = {
  organization: Organization | null
  organizations: Organization[]
  activeOrganizationId: string | null
  isLoading: boolean
  isError: boolean
  hasOrganization: boolean
  setActiveOrganizationId: (id: string) => void
}

const OrganizationContext = createContext<OrganizationContextValue | undefined>(
  undefined,
)

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useCurrentOrganization()
  const [activeOrganizationId, setActiveOrganizationIdState] = useState<
    string | null
  >(null)
  const organization = data ?? null

  const setActiveOrganizationId = useCallback((id: string) => {
    setActiveOrganizationIdState(id)
  }, [])

  const value = useMemo<OrganizationContextValue>(() => {
    const organizations = organization ? [organization] : []

    return {
      organization,
      organizations,
      activeOrganizationId: activeOrganizationId ?? organization?.id ?? null,
      isLoading,
      isError,
      hasOrganization: Boolean(organization),
      setActiveOrganizationId,
    }
  }, [
    organization,
    activeOrganizationId,
    isLoading,
    isError,
    setActiveOrganizationId,
  ])

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)

  if (!context) {
    throw new Error("useOrganization must be used within OrganizationProvider")
  }

  return context
}
