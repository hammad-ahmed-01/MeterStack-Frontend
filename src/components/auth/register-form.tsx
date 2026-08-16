"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isSupabaseConfigured } from "@/config/env"
import { signUpWithPassword } from "@/lib/supabase/auth"
import { registerSchema, type RegisterValues } from "@/lib/validation/auth"

function mapAuthError(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("already registered") || lower.includes("already exists")) {
    return "An account with this email already exists."
  }
  if (lower.includes("password")) {
    return "Password does not meet the security requirements."
  }
  return "Unable to create your account. Please try again."
}

export function RegisterForm() {
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const configured = isSupabaseConfigured()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterValues) {
    setFormError(null)

    try {
      const data = await signUpWithPassword({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      })

      if (!data.session) {
        setNeedsConfirmation(true)
        return
      }

      router.replace("/onboarding")
      router.refresh()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create your account."
      setFormError(mapAuthError(message))
    }
  }

  if (needsConfirmation) {
    return (
      <Alert>
        <AlertDescription>
          Check your email to confirm your account, then{" "}
          <Link href="/login" className="font-medium text-foreground underline">
            sign in
          </Link>
          .
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      {!configured ? (
        <Alert variant="destructive">
          <AlertDescription>
            Supabase is not configured. Copy `.env.example` to `.env.local` and add
            your project credentials.
          </AlertDescription>
        </Alert>
      ) : null}
      {formError ? (
        <Alert variant="destructive">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
      <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={Boolean(errors.fullName)}
          {...register("fullName")}
        />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>
      <Field label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </Field>
      <Field
        label="Confirm password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting || !configured}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Create account
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-foreground hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
