import { describe, expect, it } from "vitest"

import { productBaseUrlSchema, productRouteSchema } from "./product-route"

describe("productBaseUrlSchema", () => {
  it("accepts an empty value and an https URL", () => {
    expect(productBaseUrlSchema.safeParse({ baseUrl: "" }).success).toBe(true)
    expect(productBaseUrlSchema.safeParse({ baseUrl: "https://api.acme.dev/v1" }).success).toBe(
      true,
    )
  })

  it("rejects a URL with a query string", () => {
    expect(
      productBaseUrlSchema.safeParse({ baseUrl: "https://api.acme.dev?x=1" }).success,
    ).toBe(false)
  })
})

describe("productRouteSchema", () => {
  it("requires a path that starts with a slash", () => {
    expect(
      productRouteSchema.safeParse({ method: "GET", path: "images", description: "" }).success,
    ).toBe(false)
    expect(
      productRouteSchema.safeParse({
        method: "POST",
        path: "/images/:id",
        description: "",
      }).success,
    ).toBe(true)
  })
})
