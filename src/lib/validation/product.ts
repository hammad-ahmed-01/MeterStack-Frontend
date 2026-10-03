import { z } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(120, "Product name is too long"),
  description: z.string().max(2000, "Description is too long"),
})

export type ProductValues = z.infer<typeof productSchema>

export const rateLimitWindows = [
  { value: "60", label: "Per minute" },
  { value: "3600", label: "Per hour" },
  { value: "86400", label: "Per day" },
] as const

export const productRateLimitSchema = z
  .object({
    rateLimit: z.string().trim(),
    windowSeconds: z.enum(["60", "3600", "86400"]),
  })
  .superRefine((value, ctx) => {
    if (value.rateLimit === "") {
      return
    }

    if (!/^\d+$/.test(value.rateLimit)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rateLimit"],
        message: "Enter a whole number",
      })
      return
    }

    const limit = Number(value.rateLimit)

    if (limit < 1 || limit > 1_000_000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["rateLimit"],
        message: "Enter a limit between 1 and 1,000,000",
      })
    }
  })

export type ProductRateLimitValues = z.infer<typeof productRateLimitSchema>
