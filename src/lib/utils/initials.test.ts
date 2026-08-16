import { describe, expect, it } from "vitest"

import { getInitials } from "./initials"

describe("getInitials", () => {
  it("uses the first letter of up to two words", () => {
    expect(getInitials("Hammad Ahmed")).toBe("HA")
  })

  it("falls back when the name is empty", () => {
    expect(getInitials("")).toBe("U")
    expect(getInitials(null)).toBe("U")
  })
})
