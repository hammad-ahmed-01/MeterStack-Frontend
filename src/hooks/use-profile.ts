"use client"

import { useQuery } from "@tanstack/react-query"

import { authApi } from "@/lib/api/auth"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"

export function useProfile() {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => authApi.getMe(),
    enabled: isAuthenticated && !isLoading,
  })
}
