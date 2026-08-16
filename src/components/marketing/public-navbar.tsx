"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { marketingNav } from "@/config/marketing"
import { site } from "@/config/site"

type PublicNavbarProps = {
  isAuthenticated?: boolean
}

export function PublicNavbar({ isAuthenticated = false }: PublicNavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="MeterStack home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {marketingNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <AuthActions isAuthenticated={isAuthenticated} />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-80 p-0">
          <SheetHeader className="border-b pr-12">
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4">
            {marketingNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-2 border-t p-4">
            <AuthActions
              isAuthenticated={isAuthenticated}
              stacked
              onNavigate={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function AuthActions({
  isAuthenticated,
  stacked = false,
  onNavigate,
}: {
  isAuthenticated: boolean
  stacked?: boolean
  onNavigate?: () => void
}) {
  if (isAuthenticated) {
    return (
      <Button asChild className={stacked ? "w-full" : undefined}>
        <Link href="/dashboard" onClick={onNavigate}>
          Dashboard
        </Link>
      </Button>
    )
  }

  return (
    <>
      <Button
        asChild
        variant="ghost"
        className={stacked ? "w-full" : undefined}
      >
        <Link href="/login" onClick={onNavigate}>
          Sign In
        </Link>
      </Button>
      <Button asChild className={stacked ? "w-full" : undefined}>
        <Link href="/register" onClick={onNavigate}>
          Get Started
        </Link>
      </Button>
    </>
  )
}
