import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusBadgeProps = {
  status: string
}

const styles: Record<string, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  archived: "border-border bg-muted text-muted-foreground",
  revoked: "border-border bg-muted text-muted-foreground",
  test: "border-border bg-muted text-muted-foreground",
  live: "border-emerald-200 bg-emerald-50 text-emerald-700",
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("capitalize", styles[status])}>
      {status}
    </Badge>
  )
}
