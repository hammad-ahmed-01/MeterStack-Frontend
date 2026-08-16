import { z } from "zod"

export const accountSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long"),
  email: z.string().email(),
})

export type AccountValues = z.infer<typeof accountSchema>
