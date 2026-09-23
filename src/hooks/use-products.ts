"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { productsApi } from "@/lib/api/products"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"
import type { ProductStatus } from "@/types"

export function useProduct(id: string) {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.get(id),
    enabled: isAuthenticated && !isLoading && Boolean(id),
  })
}

export function useProducts() {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.products.list,
    queryFn: () => productsApi.list(),
    enabled: isAuthenticated && !isLoading,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: { name: string; description: string }) =>
      productsApi.create(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      ...input
    }: {
      id: string
      name?: string
      description?: string
      status?: ProductStatus
      baseUrl?: string | null
    }) => productsApi.update(id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}

export function useArchiveProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productsApi.archive(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.products.all })
    },
  })
}
