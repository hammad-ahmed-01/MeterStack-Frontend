import { describe, expect, it } from "vitest"

import { slugify } from "./slug"

describe("slugify", () => {
  it("lowercases and hyphenates words", () => {
    expect(slugify("Acme Labs")).toBe("acme-labs")
  })

  it("strips quotes and trims hyphens", () => {
    expect(slugify("  O'Donnell's API  ")).toBe("odonnells-api")
  })

  it("caps length at 50 characters", () => {
    expect(slugify("a".repeat(80))).toHaveLength(50)
  })
})
