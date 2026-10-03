import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type RequestStatusCodeProps = {
  code: number
}

export function RequestStatusCode({ code }: RequestStatusCodeProps) {
  return (
    <Badge variant="outline" className={cn("font-mono", statusTone(code))}>
      {code}
    </Badge>
  )
}

function statusTone(code: number): string {
  if (code >= 500) {
    return "border-destructive/30 text-destructive"
  }

  if (code >= 400) {
    return "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-400"
  }

  if (code >= 200 && code < 300) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-400"
  }

  return "text-muted-foreground"
}
