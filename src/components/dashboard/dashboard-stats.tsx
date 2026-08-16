import { CreditCard, KeyRound, Package } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StatCard = {
  title: string
  value: string
  icon: LucideIcon
}

type DashboardStatsProps = {
  productCount: number
  activeKeyCount: number
  planName: string
}

export function DashboardStats({
  productCount,
  activeKeyCount,
  planName,
}: DashboardStatsProps) {
  const stats: StatCard[] = [
    { title: "API Products", value: String(productCount), icon: Package },
    { title: "Active API Keys", value: String(activeKeyCount), icon: KeyRound },
    { title: "Current Plan", value: planName, icon: CreditCard },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
