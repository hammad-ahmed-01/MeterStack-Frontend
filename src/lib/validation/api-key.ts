import { z } from "zod"

export const apiKeySchema = z.object({
  name: z
    .string()
    .min(2, "Key name must be at least 2 characters")
    .max(80, "Key name is too long"),
  environment: z.enum(["test", "live"], {
    required_error: "Select an environment",
  }),
})

export type ApiKeyValues = z.infer<typeof apiKeySchema>
