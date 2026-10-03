import { describe, expect, it } from "vitest"

import { productRateLimitSchema } from "./product"

describe("productRateLimitSchema", () => {
  it("accepts an empty limit and a whole number with a window", () => {
    expect(
      productRateLimitSchema.safeParse({ rateLimit: "", windowSeconds: "60" }).success,
    ).toBe(true)
    expect(
      productRateLimitSchema.safeParse({ rateLimit: "1000", windowSeconds: "3600" }).success,
    ).toBe(true)
  })

  it("rejects a fraction and a limit above one million", () => {
    expect(
      productRateLimitSchema.safeParse({ rateLimit: "1.5", windowSeconds: "60" }).success,
    ).toBe(false)
    expect(
      productRateLimitSchema.safeParse({ rateLimit: "1000001", windowSeconds: "60" }).success,
    ).toBe(false)
  })
})
