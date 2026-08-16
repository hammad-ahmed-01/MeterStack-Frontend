"use client"

import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/providers/auth-provider"
import { OrganizationProvider } from "@/providers/organization-provider"
import { QueryProvider } from "@/providers/query-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryProvider>
        <AuthProvider>
          <OrganizationProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-right" />
          </OrganizationProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
