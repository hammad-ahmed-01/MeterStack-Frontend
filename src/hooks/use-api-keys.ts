"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { apiKeysApi } from "@/lib/api/api-keys"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"
import type { ApiKeyEnvironment } from "@/types"

export function useApiKeys() {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.apiKeys.list,
    queryFn: () => apiKeysApi.list(),
    enabled: isAuthenticated && !isLoading,
  })
}

export function useCreateApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { name: string; environment: ApiKeyEnvironment }) =>
      apiKeysApi.create(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.apiKeys.all })
    },
  })
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiKeysApi.revoke(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.apiKeys.all })
    },
  })
}
