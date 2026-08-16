export type PlanId = "free" | "pro"

export type PlanDefinition = {
  id: PlanId
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  cta: string
}

export const plans: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Get started with a single organization and test keys.",
    features: [
      "1 organization",
      "Unlimited API products",
      "Test API keys",
      "Community support",
    ],
    cta: "Current plan",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For teams ready to ship live APIs and grow usage.",
    features: [
      "Live API keys",
      "Stripe customer portal",
      "Usage analytics (soon)",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
  },
]
