"use client"

import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { GettingStarted } from "@/components/dashboard/getting-started"
import { CardsSkeleton } from "@/components/shared/skeletons"
import { useApiKeys } from "@/hooks/use-api-keys"
import { useSubscription } from "@/hooks/use-billing"
import { useProducts } from "@/hooks/use-products"

export function DashboardView() {
  const products = useProducts()
  const apiKeys = useApiKeys()
  const subscription = useSubscription()
  const isLoading = products.isLoading || apiKeys.isLoading || subscription.isLoading

  const productCount =
    products.data?.filter((product) => product.status === "active").length ?? 0
  const activeKeyCount =
    apiKeys.data?.filter((key) => key.status === "active").length ?? 0
  const planName = subscription.data?.plan === "pro" ? "Pro" : "Free"

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
      ) : (
        <DashboardStats
          productCount={productCount}
          activeKeyCount={activeKeyCount}
          planName={planName}
        />
      )}
      <GettingStarted />
    </div>
  )
}
