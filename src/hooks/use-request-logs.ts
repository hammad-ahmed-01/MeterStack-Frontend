"use client"

import { useQuery } from "@tanstack/react-query"

import { requestLogsApi, type RequestLogQuery } from "@/lib/api/request-logs"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"

export function useRequestLogs(query: RequestLogQuery = {}) {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.requestLogs.list(query),
    queryFn: () => requestLogsApi.list(query),
    enabled: isAuthenticated && !isLoading,
  })
}
