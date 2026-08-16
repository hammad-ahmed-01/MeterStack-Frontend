"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { organizationsApi } from "@/lib/api/organizations"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"
import type { Organization } from "@/types"

export function useCurrentOrganization() {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.organization.current,
    queryFn: () => organizationsApi.getCurrent(),
    enabled: isAuthenticated && !isLoading,
  })
}

export function useCreateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { name: string; slug: string }) =>
      organizationsApi.create(input),
    onSuccess: (organization) => {
      queryClient.setQueryData(queryKeys.organization.current, organization)
      void queryClient.invalidateQueries({ queryKey: queryKeys.organization.all })
    },
  })
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      ...input
    }: {
      id: string
      name: string
      slug: string
    }) => organizationsApi.update(id, input),
    onSuccess: (organization: Organization) => {
      queryClient.setQueryData(queryKeys.organization.current, organization)
      void queryClient.invalidateQueries({ queryKey: queryKeys.organization.all })
    },
  })
}
