import { api, asRecord, pickString, unwrapData } from "@/lib/api/client"
import { ApiError } from "@/lib/api/errors"
import type {
  BillingPortalSession,
  CheckoutSession,
  PlanId,
  Subscription,
  SubscriptionStatus,
} from "@/types"

function normalizePlan(value: string | undefined): PlanId {
  return value === "pro" ? "pro" : "free"
}

function normalizeStatus(value: string | undefined): SubscriptionStatus {
  switch (value) {
    case "active":
    case "canceled":
    case "past_due":
    case "trialing":
    case "none":
      return value
    default:
      return "active"
  }
}

function normalizeSubscription(value: unknown): Subscription {
  const record = asRecord(value)

  return {
    plan: normalizePlan(pickString(record, "plan", "planId", "plan_id")),
    status: normalizeStatus(pickString(record, "status")),
    currentPeriodEnd:
      pickString(record, "currentPeriodEnd", "current_period_end") ?? null,
  }
}

function normalizeUrl(value: unknown): string {
  const record = asRecord(value)
  const url = pickString(record, "url")

  if (!url) {
    throw new ApiError("The billing session URL was missing.", 500, "MISSING_URL")
  }

  return url
}

export const billingApi = {
  async getSubscription(): Promise<Subscription> {
    try {
      const response = await api.get<unknown>("/billing/subscription")
      return normalizeSubscription(unwrapData(response.data))
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return { plan: "free", status: "active", currentPeriodEnd: null }
      }
      throw error
    }
  },

  async createCheckoutSession(planId: PlanId = "pro"): Promise<CheckoutSession> {
    const response = await api.post<unknown>("/billing/checkout", { planId, plan: planId })
    return { url: normalizeUrl(unwrapData(response.data)) }
  },

  async createPortalSession(): Promise<BillingPortalSession> {
    const response = await api.post<unknown>("/billing/portal")
    return { url: normalizeUrl(unwrapData(response.data)) }
  },
}
