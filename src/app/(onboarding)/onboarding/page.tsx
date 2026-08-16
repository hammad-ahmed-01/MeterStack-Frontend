import type { Metadata } from "next"

import { AuthCard } from "@/components/auth/auth-card"
import { CreateOrganizationForm } from "@/components/organizations/create-organization-form"

export const metadata: Metadata = {
  title: "Create organization",
}

export default function OnboardingPage() {
  return (
    <AuthCard
      title="Create your organization"
      description="Organizations group products, API keys, and billing."
    >
      <CreateOrganizationForm />
    </AuthCard>
  )
}
