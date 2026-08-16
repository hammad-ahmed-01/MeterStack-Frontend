import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { site } from "@/config/site"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <p className="mb-6 inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          Built in public · Active development
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          MeterStack is being built incrementally in public to explore how
          modern developer infrastructure evolves from a simple SaaS foundation
          into scalable API management, metering, billing, observability, and
          distributed systems.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
