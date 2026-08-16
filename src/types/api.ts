export type ProductStatus = "active" | "archived"
export type ApiKeyStatus = "active" | "revoked"
export type ApiKeyEnvironment = "test" | "live"
export type PlanId = "free" | "pro"
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "none"

export type Profile = {
  id: string
  email: string
  fullName: string
  createdAt: string
}

export type Organization = {
  id: string
  name: string
  slug: string
  createdAt: string
}

export type Product = {
  id: string
  name: string
  description: string
  status: ProductStatus
  createdAt: string
}

export type ApiKey = {
  id: string
  name: string
  keyPrefix: string
  environment: ApiKeyEnvironment
  status: ApiKeyStatus
  createdAt: string
  lastUsedAt: string | null
}

export type CreatedApiKey = ApiKey & {
  secret: string
}

export type Subscription = {
  plan: PlanId
  status: SubscriptionStatus
  currentPeriodEnd: string | null
}

export type CheckoutSession = {
  url: string
}

export type BillingPortalSession = {
  url: string
}
