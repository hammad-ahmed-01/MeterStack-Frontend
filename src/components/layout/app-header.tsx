"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { UserMenu } from "@/components/layout/user-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { useOrganization } from "@/providers/organization-provider"

export function AppHeader() {
  const { organization } = useOrganization()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {organization?.name ?? "Organization"}
          </p>
          {organization?.slug ? (
            <p className="truncate text-xs text-muted-foreground">
              {organization.slug}
            </p>
          ) : null}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Separator orientation="vertical" className="h-6" />
          <UserMenu compact />
        </div>
      </div>
    </header>
  )
}
