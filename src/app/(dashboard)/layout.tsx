import type { ReactNode } from "react"

import { AppShell } from "@/components/layout/app-shell"
import { RequireAuth } from "@/components/layout/require-auth"
import { RequireOrganization } from "@/components/layout/require-organization"

export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <RequireOrganization>
        <AppShell>{children}</AppShell>
      </RequireOrganization>
    </RequireAuth>
  )
}
