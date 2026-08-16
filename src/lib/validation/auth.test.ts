import { describe, expect, it } from "vitest"

import { loginSchema, registerSchema } from "./auth"

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "dev@example.com",
      password: "secret",
    })

    expect(result.success).toBe(true)
  })

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "secret",
    })

    expect(result.success).toBe(false)
  })
})

describe("registerSchema", () => {
  it("requires matching passwords", () => {
    const result = registerSchema.safeParse({
      fullName: "Hammad Ahmed",
      email: "dev@example.com",
      password: "longenough",
      confirmPassword: "different",
    })

    expect(result.success).toBe(false)
  })
})
