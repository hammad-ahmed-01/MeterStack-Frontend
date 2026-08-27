"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
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
import { useUpdateOrganization } from "@/hooks/use-organization"
import { getErrorMessage } from "@/lib/api/errors"
import {
  organizationNameSchema,
  type OrganizationNameValues,
} from "@/lib/validation/organization"
import { useOrganization } from "@/providers/organization-provider"

export function OrganizationSettings() {
  const { organization } = useOrganization()
  const updateOrganization = useUpdateOrganization()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<OrganizationNameValues>({
    resolver: zodResolver(organizationNameSchema),
    defaultValues: {
      name: organization?.name ?? "",
    },
  })

  useEffect(() => {
    if (organization) {
      reset({ name: organization.name })
    }
  }, [organization, reset])

  async function onSubmit(values: OrganizationNameValues) {
    try {
      await updateOrganization.mutateAsync({ name: values.name })
      toast.success("Organization updated")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
        <CardDescription>Update how this organization appears in MeterStack.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid max-w-lg gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Organization name" htmlFor="name" error={errors.name?.message}>
            <Input id="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
          </Field>
          <Field
            label="Organization slug"
            htmlFor="slug"
            hint="Assigned when the organization is created and cannot be changed."
          >
            <Input id="slug" value={organization?.slug ?? ""} readOnly disabled />
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
