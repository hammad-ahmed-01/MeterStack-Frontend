import { describe, expect, it } from "vitest"

import { organizationSchema } from "./organization"

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
