import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      data-icon="inline-start"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  )
}
