import { describe, expect, it } from "vitest"

import { formatDate } from "./format"

describe("formatDate", () => {
  it("formats a valid ISO date", () => {
    const formatted = formatDate("2026-06-15T12:00:00.000Z")
    expect(formatted).toContain("2026")
    expect(formatted).not.toBe("—")
  })

  it("returns an em dash for missing or invalid values", () => {
    expect(formatDate(null)).toBe("—")
    expect(formatDate("not-a-date")).toBe("—")
  })
})
