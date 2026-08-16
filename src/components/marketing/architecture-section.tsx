import { Fragment } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"

import { architectureBilling, architecturePrimary } from "@/config/marketing"

import { MarketingSection, SectionHeading } from "./section"

export function ArchitectureSection() {
  return (
    <MarketingSection id="architecture">
      <SectionHeading
        title="Starting simple"
        description="The current system is intentionally small. This architecture is expected to evolve as new requirements justify additional infrastructure."
      />

      <div className="mt-12 space-y-8">
        <ArchitectureFlow
          label="Control plane"
          nodes={[...architecturePrimary]}
        />
        <ArchitectureFlow
          label="Subscriptions"
          nodes={[...architectureBilling]}
        />
      </div>
    </MarketingSection>
  )
}

function ArchitectureFlow({
  label,
  nodes,
}: {
  label: string
  nodes: { label: string; detail: string }[]
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        {nodes.map((node, index) => (
          <Fragment key={`${node.label}-${index}`}>
            {index > 0 ? (
              <div
                className="flex justify-center text-muted-foreground"
                aria-hidden
              >
                <ArrowDown className="size-4 sm:hidden" />
                <ArrowRight className="hidden size-4 shrink-0 sm:block" />
              </div>
            ) : null}
            <div className="min-w-0 flex-1 rounded-xl border bg-card px-4 py-3 text-center">
              <p className="text-sm font-medium">{node.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{node.detail}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
