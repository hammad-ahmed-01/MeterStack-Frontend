"use client"

import { useMutation, useQuery } from "@tanstack/react-query"

import { billingApi } from "@/lib/api/billing"
import { queryKeys } from "@/lib/query-keys"
import { useAuth } from "@/providers/auth-provider"
import type { PlanId } from "@/types"

export function useSubscription() {
  const { isAuthenticated, isLoading } = useAuth()

  return useQuery({
    queryKey: queryKeys.subscription,
    queryFn: () => billingApi.getSubscription(),
    enabled: isAuthenticated && !isLoading,
  })
}

export function useCheckoutSession() {
  return useMutation({
    mutationFn: (planId: PlanId = "pro") => billingApi.createCheckoutSession(planId),
  })
}

export function useBillingPortal() {
  return useMutation({
    mutationFn: () => billingApi.createPortalSession(),
  })
}
