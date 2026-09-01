"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authApi } from "@/lib/api/auth"
import { getErrorMessage } from "@/lib/api/errors"
import { getUserFullName, updateUserFullName } from "@/lib/supabase/auth"
import { accountSchema, type AccountValues } from "@/lib/validation/settings"
import { useAuth } from "@/providers/auth-provider"

export function AccountSettings() {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullName: getUserFullName(user),
      email: user?.email ?? "",
    },
  })

  async function onSubmit(values: AccountValues) {
    try {
      await authApi.updateMe({ fullName: values.fullName })
      await updateUserFullName(values.fullName)
      toast.success("Account updated")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Your personal profile for this MeterStack account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid max-w-lg gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
            <Input
              id="fullName"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
          </Field>
          <Field
            label="Email"
            htmlFor="email"
            hint="Email is managed by authentication and cannot be changed here."
          >
            <Input id="email" type="email" readOnly disabled {...register("email")} />
          </Field>
          <div>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
              Save changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
