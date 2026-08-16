import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { site } from "@/config/site"

import { MarketingSection, SectionHeading } from "./section"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

export function BuiltInPublic() {
  return (
    <MarketingSection>
      <SectionHeading
        title="Learning high-scale engineering in public"
        description="MeterStack is a long-running portfolio and engineering project intended to document architectural decisions, experiments, failures, performance improvements, and the evolution from a simple SaaS foundation toward scalable developer infrastructure."
      />

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild size="lg">
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
            Follow the project on GitHub
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </Button>
        <a
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <GitHubIcon className="size-4" />
          Built in public by @{site.githubHandle}
        </a>
      </div>
    </MarketingSection>
  )
}
