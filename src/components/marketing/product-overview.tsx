import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  currentCapabilities,
  plannedCapabilities,
} from "@/config/marketing"

import { MarketingSection, SectionHeading } from "./section"

export function ProductOverview() {
  return (
    <MarketingSection id="what-is">
      <SectionHeading
        title="What is MeterStack?"
        description="An evolving platform intended to help developers manage and eventually monetize APIs. The current base is a control-plane SaaS — not a production API gateway."
      />

      <div className="mt-12">
        <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Available now
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {currentCapabilities.map((item) => (
            <Card key={item.title} size="sm">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Planned — not built yet
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {plannedCapabilities.map((item) => (
            <Card key={item.title} size="sm" className="bg-muted/40">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MarketingSection>
  )
}
