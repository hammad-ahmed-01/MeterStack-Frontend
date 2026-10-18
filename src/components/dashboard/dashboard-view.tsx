"use client"

import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { GettingStarted } from "@/components/dashboard/getting-started"
import { RecentRequests } from "@/components/dashboard/recent-requests"
import { ErrorState } from "@/components/shared/error-state"
import { CardsSkeleton } from "@/components/shared/skeletons"
import { useApiKeys } from "@/hooks/use-api-keys"
import { useSubscription } from "@/hooks/use-billing"
import { useProducts } from "@/hooks/use-products"

export function DashboardView() {
  const products = useProducts()
  const apiKeys = useApiKeys()
  const subscription = useSubscription()
  const isLoading = products.isLoading || apiKeys.isLoading || subscription.isLoading
  const statsError = products.error ?? apiKeys.error ?? subscription.error

  const productCount =
    products.data?.filter((product) => product.status === "active").length ?? 0
  const activeKeyCount =
    apiKeys.data?.filter((key) => key.status === "active").length ?? 0
  const planName = subscription.data?.plan === "pro" ? "Pro" : "Free"

  function retryStats() {
    if (products.isError) {
      void products.refetch()
    }
    if (apiKeys.isError) {
      void apiKeys.refetch()
    }
    if (subscription.isError) {
      void subscription.refetch()
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to MeterStack</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          API management and monetization infrastructure for developers.
        </p>
      </div>
      {isLoading ? (
        <CardsSkeleton />
      ) : statsError ? (
        <ErrorState error={statsError} onRetry={retryStats} />
      ) : (
        <DashboardStats
          productCount={productCount}
          activeKeyCount={activeKeyCount}
          planName={planName}
        />
      )}
      <RecentRequests />
      <GettingStarted />
    </div>
  )
}
