"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { productRoutesApi, type ProductRouteInput } from "@/lib/api/product-routes"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"
import type { ProductRouteStatus } from "@/types"

export function useProductRoutes(productId: string) {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.products.routes(productId),
    queryFn: () => productRoutesApi.list(productId),
    enabled: isAuthenticated && !isLoading && Boolean(productId),
  })
}

export function useCreateProductRoute(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: ProductRouteInput) => productRoutesApi.create(productId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.routes(productId) })
    },
  })
}

export function useUpdateProductRoute(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      routeId,
      ...input
    }: {
      routeId: string
      method?: ProductRouteInput["method"]
      path?: string
      description?: string
      status?: ProductRouteStatus
    }) => productRoutesApi.update(productId, routeId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.routes(productId) })
    },
  })
}

export function useDisableProductRoute(productId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (routeId: string) => productRoutesApi.disable(productId, routeId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.routes(productId) })
    },
  })
}
