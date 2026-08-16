import type { Metadata } from "next"
import { Suspense } from "react"

import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"
import { Spinner } from "@/components/shared/spinner"

export const metadata: Metadata = {
  title: "Sign in",
}

export default function LoginPage() {
  return (
    <AuthCard title="Sign in" description="Welcome back to MeterStack.">
      <Suspense
        fallback={
          <div className="flex justify-center py-6">
            <Spinner className="text-muted-foreground" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthCard>
  )
}
