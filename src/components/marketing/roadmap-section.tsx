import { Badge } from "@/components/ui/badge"
import { roadmapItems } from "@/config/marketing"
import { cn } from "@/lib/utils"

import { MarketingSection, SectionHeading } from "./section"

const statusStyles: Record<string, string> = {
  Current:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-400",
  Next: "border-foreground/20 bg-foreground text-background",
  Planned: "border-border bg-muted text-muted-foreground",
  Exploration: "border-border bg-background text-muted-foreground",
}

export function RoadmapSection() {
  return (
    <MarketingSection id="roadmap">
      <SectionHeading
        title="Roadmap"
        description="An evolving public sequence, not a delivery calendar. There are no dates — stages move when the previous one creates a real requirement."
      />

      <ul className="mt-12 divide-y rounded-xl border">
        {roadmapItems.map((item) => (
          <li
            key={item.version}
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
          >
            <div className="flex min-w-0 items-baseline gap-3">
              <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">
                {item.version}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <Badge
              variant="outline"
              className={cn("capitalize", statusStyles[item.status])}
            >
              {item.status}
            </Badge>
          </li>
        ))}
      </ul>
    </MarketingSection>
  )
}
