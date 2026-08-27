import { describe, expect, it } from "vitest"

import { organizationNameSchema, organizationSchema } from "./organization"

describe("organizationNameSchema", () => {
  it("accepts a valid name", () => {
    const result = organizationNameSchema.safeParse({ name: "Acme Labs" })
    expect(result.success).toBe(true)
  })

  it("rejects a short name", () => {
    const result = organizationNameSchema.safeParse({ name: "A" })
    expect(result.success).toBe(false)
  })
})

describe("organizationSchema", () => {
  it("accepts a valid name and slug", () => {
    const result = organizationSchema.safeParse({
      name: "Acme Labs",
      slug: "acme-labs",
    })

    expect(result.success).toBe(true)
  })

  it("rejects uppercase slugs", () => {
    const result = organizationSchema.safeParse({
      name: "Acme Labs",
      slug: "Acme-Labs",
    })

    expect(result.success).toBe(false)
  })
})
