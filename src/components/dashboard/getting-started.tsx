"use client"

import { ArrowRight, KeyRound, Package, Plug } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    title: "Create your first API product",
    href: "/products",
    icon: Package,
  },
  {
    title: "Generate an API key",
    href: "/api-keys",
    icon: KeyRound,
  },
  {
    title: "Configure your application",
    href: "/settings",
    icon: Plug,
  },
]

export function GettingStarted() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {steps.map((step, index) => (
          <Link
            key={step.href}
            href={step.href}
            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-6 items-center justify-center rounded-md bg-muted text-xs font-medium">
                {index + 1}
              </span>
              <step.icon className="size-4 text-muted-foreground" />
              {step.title}
            </span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
