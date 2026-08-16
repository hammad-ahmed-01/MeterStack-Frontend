"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCreateOrganization } from "@/hooks/use-organization"
import { getErrorMessage } from "@/lib/api/errors"
import { slugify } from "@/lib/utils"
import {
  organizationSchema,
  type OrganizationValues,
} from "@/lib/validation/organization"

export function CreateOrganizationForm() {
  const router = useRouter()
  const createOrganization = useCreateOrganization()
  const [slugLocked, setSlugLocked] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: { name: "", slug: "" },
  })

  const nameField = register("name")
  const slugField = register("slug")

  async function onSubmit(values: OrganizationValues) {
    try {
      await createOrganization.mutateAsync(values)
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
      >
        <Input
          id="name"
          placeholder="Acme Labs"
          aria-invalid={Boolean(errors.name)}
          {...nameField}
          onChange={(event) => {
            void nameField.onChange(event)
            if (!slugLocked) {
              setValue("slug", slugify(event.target.value), {
                shouldValidate: false,
              })
            }
          }}
        />
      </Field>
      <Field
        label="Organization slug"
        htmlFor="slug"
        error={errors.slug?.message}
        hint="Used in URLs. Lowercase letters, numbers, and hyphens."
      >
        <Input
          id="slug"
          placeholder="acme-labs"
          aria-invalid={Boolean(errors.slug)}
          {...slugField}
          onChange={(event) => {
            setSlugLocked(true)
            void slugField.onChange(event)
          }}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Create organization
      </Button>
    </form>
  )
}
