export function getInitials(name: string | null | undefined): string {
  if (!name?.trim()) {
    return "U"
  }

  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "U"
}
