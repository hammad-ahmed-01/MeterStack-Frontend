import { Badge } from "@/components/ui/badge"
import { directionStages } from "@/config/marketing"
import { cn } from "@/lib/utils"

import { MarketingSection, SectionHeading } from "./section"

const statusStyles: Record<string, string> = {
  Current: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-400",
  Planned: "border-border bg-muted text-muted-foreground",
  Exploration: "border-border bg-background text-muted-foreground",
}

export function DirectionSection() {
  return (
    <MarketingSection>
      <SectionHeading
        title="Where we're going"
        description="The project is intentionally incremental. Each stage below is a learning and engineering direction — only the foundation exists today."
      />

      <ol className="relative mt-12 space-y-0 border-l border-border pl-6 sm:pl-8">
        {directionStages.map((stage, index) => (
          <li key={stage.title} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 -left-[31px] size-3 rounded-full border-2 bg-background sm:-left-[39px]",
                stage.status === "Current"
                  ? "border-foreground"
                  : "border-muted-foreground/40",
              )}
            />
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-medium">{stage.title}</h3>
              <Badge
                variant="outline"
                className={cn("capitalize", statusStyles[stage.status])}
              >
                {stage.status}
              </Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {stage.summary}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stage.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border bg-card px-2 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            {index < directionStages.length - 1 ? (
              <span className="sr-only">then</span>
            ) : null}
          </li>
        ))}
      </ol>
    </MarketingSection>
  )
}
