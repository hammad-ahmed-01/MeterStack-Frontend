"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateOrganization } from "@/hooks/use-organization"
import { getErrorMessage } from "@/lib/api/errors"
import {
  organizationNameSchema,
  type OrganizationNameValues,
} from "@/lib/validation/organization"

export function CreateOrganizationForm() {
  const router = useRouter()
  const createOrganization = useCreateOrganization()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationNameValues>({
    resolver: zodResolver(organizationNameSchema),
    defaultValues: { name: "" },
  })

  async function onSubmit(values: OrganizationNameValues) {
    try {
      await createOrganization.mutateAsync({ name: values.name })
      toast.success("Organization created")
      router.replace("/dashboard")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="Organization name"
        htmlFor="name"
        error={errors.name?.message}
        hint="A slug is assigned automatically, for example Acme Labs becomes acme-labs."
      >
        <Input
          id="name"
          placeholder="Acme Labs"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Create organization
      </Button>
    </form>
  )
}
