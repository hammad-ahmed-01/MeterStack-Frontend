import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type MarketingSectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function MarketingSection({
  id,
  className,
  children,
}: MarketingSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t py-20 sm:py-28", className)}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-pretty text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
