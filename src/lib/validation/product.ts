import { z } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(80, "Product name is too long"),
  description: z.string().max(500, "Description is too long"),
})

export type ProductValues = z.infer<typeof productSchema>
