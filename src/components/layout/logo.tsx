import { Layers } from "lucide-react"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  markClassName?: string
}

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-md bg-foreground text-background",
          markClassName,
        )}
      >
        <Layers className="size-4" />
      </span>
      <span className="text-sm font-semibold tracking-tight">MeterStack</span>
    </div>
  )
}
