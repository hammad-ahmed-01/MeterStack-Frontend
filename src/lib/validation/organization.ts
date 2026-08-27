import { z } from "zod"

const organizationNameField = z
  .string()
  .min(2, "Organization name must be at least 2 characters")
  .max(80, "Organization name is too long")

export const organizationNameSchema = z.object({
  name: organizationNameField,
})

export type OrganizationNameValues = z.infer<typeof organizationNameSchema>

export const organizationSchema = organizationNameSchema.extend({
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(50, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and hyphens",
    ),
})

export type OrganizationValues = z.infer<typeof organizationSchema>
