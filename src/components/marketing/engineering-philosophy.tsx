import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { philosophyExamples } from "@/config/marketing"

import { MarketingSection, SectionHeading } from "./section"

export function EngineeringPhilosophy() {
  return (
    <MarketingSection>
      <SectionHeading
        title="Built to evolve"
        description="Do not introduce infrastructure just because it sounds impressive. Add a technology when the current architecture develops a real limitation."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {philosophyExamples.map((example) => (
          <Card key={example.trigger} size="sm">
            <CardContent className="flex flex-col gap-3 pt-1">
              <p className="text-sm font-medium">{example.trigger}</p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="mt-0.5 size-4 shrink-0" />
                <span>{example.response}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MarketingSection>
  )
}
