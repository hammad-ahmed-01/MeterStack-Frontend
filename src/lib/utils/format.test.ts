import { describe, expect, it } from "vitest"

import { formatDate, formatDateTime } from "./format"

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

describe("formatDateTime", () => {
  it("formats a valid timestamp and rejects an invalid one", () => {
    expect(formatDateTime("2026-06-15T15:04:00.000Z")).not.toBe("—")
    expect(formatDateTime("not-a-date")).toBe("—")
  })
})
