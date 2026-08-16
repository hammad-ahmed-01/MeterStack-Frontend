"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { isSupabaseConfigured } from "@/config/env"
import { signInWithPassword } from "@/lib/supabase/auth"
import { loginSchema, type LoginValues } from "@/lib/validation/auth"

function mapAuthError(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return "Invalid email or password."
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in."
  }
  return "Unable to sign in. Please try again."
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formError, setFormError] = useState<string | null>(
    searchParams.get("error") === "auth"
      ? "Authentication failed. Please sign in again."
      : null,
  )
  const configured = isSupabaseConfigured()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginValues) {
    setFormError(null)

    try {
      await signInWithPassword(values)
      const next = searchParams.get("next")
      router.replace(next && next.startsWith("/") ? next : "/dashboard")
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in."
      setFormError(mapAuthError(message))
    }
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
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting || !configured}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Sign in
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-foreground hover:underline">
          Create one
        </Link>
      </p>
    </form>
  )
}
