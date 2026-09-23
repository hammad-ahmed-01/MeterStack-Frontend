import { z } from "zod"

export const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const

export const productBaseUrlSchema = z.object({
  baseUrl: z
    .string()
    .trim()
    .max(2048, "Base URL is too long")
    .refine((value) => value === "" || isHttpUrl(value), "Enter an http or https URL")
    .refine(
      (value) => value === "" || !hasUrlExtras(value),
      "Base URL cannot include credentials, a query, or a hash",
    ),
})

export type ProductBaseUrlValues = z.infer<typeof productBaseUrlSchema>

export const productRouteSchema = z.object({
  method: z.enum(httpMethods),
  path: z
    .string()
    .trim()
    .min(1, "Path is required")
    .max(512, "Path is too long")
    .refine((value) => value.startsWith("/"), "Path must start with /")
    .refine(
      (value) => !/[\s?#]/.test(value),
      "Path cannot include spaces, a query, or a hash",
    )
    .refine((value) => !value.includes("//"), "Path cannot contain empty segments"),
  description: z.string().max(500, "Description is too long"),
})

export type ProductRouteValues = z.infer<typeof productRouteSchema>

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function hasUrlExtras(value: string): boolean {
  try {
    const url = new URL(value)
    return Boolean(url.username || url.password || url.search || url.hash)
  } catch {
    return true
  }
}
