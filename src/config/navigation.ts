import {
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export const mainNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/billing", label: "Billing", icon: CreditCard },
]

export const organizationNav: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
]

export const protectedPaths = [
  "/dashboard",
  "/products",
  "/api-keys",
  "/billing",
  "/settings",
  "/onboarding",
] as const

export const authPaths = ["/login", "/register"] as const
