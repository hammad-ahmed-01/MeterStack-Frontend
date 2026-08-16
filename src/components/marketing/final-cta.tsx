import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { site } from "@/config/site"

import { MarketingSection } from "./section"

export function FinalCta() {
  return (
    <MarketingSection className="pb-24 sm:pb-32">
      <div className="rounded-2xl border bg-card px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Follow MeterStack as it evolves.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
          Start with the current SaaS foundation, explore the code, or follow
          future architecture iterations on GitHub.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
              View GitHub
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </MarketingSection>
  )
}
