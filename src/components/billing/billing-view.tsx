"use client"

import { toast } from "sonner"

import { PlanCards } from "@/components/billing/plan-cards"
import { ErrorState } from "@/components/shared/error-state"
import { PageHeader } from "@/components/shared/page-header"
import { CardsSkeleton } from "@/components/shared/skeletons"
import { Spinner } from "@/components/shared/spinner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useBillingPortal, useCheckoutSession, useSubscription } from "@/hooks/use-billing"
import { ApiError, getErrorMessage } from "@/lib/api/errors"

export function BillingView() {
  const { data, isLoading, isError, error, refetch } = useSubscription()
  const checkout = useCheckoutSession()
  const portal = useBillingPortal()
  const plan = data?.plan ?? "free"

  async function startCheckout() {
    try {
      const session = await checkout.mutateAsync("pro")
      window.location.assign(session.url)
    } catch (checkoutError) {
      if (checkoutError instanceof ApiError && checkoutError.status === 404) {
        toast.info("Billing is not connected yet.", {
          description: "Stripe checkout will be available once the backend endpoint is enabled.",
        })
        return
      }
      toast.error(getErrorMessage(checkoutError))
    }
  }

  async function openPortal() {
    try {
      const session = await portal.mutateAsync()
      window.location.assign(session.url)
    } catch (portalError) {
      if (portalError instanceof ApiError && portalError.status === 404) {
        toast.info("Customer portal is not connected yet.", {
          description: "This will open Stripe once the backend endpoint is enabled.",
        })
        return
      }
      toast.error(getErrorMessage(portalError))
    }
  }

  return (
    <div>
      <PageHeader
        title="Billing"
        description="Manage your MeterStack subscription."
        actions={
          plan === "pro" ? (
            <Button variant="outline" onClick={openPortal} disabled={portal.isPending}>
              {portal.isPending ? <Spinner data-icon="inline-start" /> : null}
              Open customer portal
            </Button>
          ) : null
        }
      />
      {isLoading ? (
        <CardsSkeleton count={2} />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your organization is on the {plan} plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold capitalize">{plan}</p>
            </CardContent>
          </Card>
          <PlanCards
            currentPlan={plan}
            onUpgrade={startCheckout}
            upgrading={checkout.isPending}
          />
        </div>
      )}
    </div>
  )
}
