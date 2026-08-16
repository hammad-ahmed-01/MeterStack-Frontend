"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { productsApi } from "@/lib/api/products"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"

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
