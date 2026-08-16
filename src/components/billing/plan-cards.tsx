import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { plans, type PlanDefinition } from "@/config/plans"
import type { PlanId } from "@/types"

type PlanCardsProps = {
  currentPlan: PlanId
  onUpgrade: () => void
  upgrading?: boolean
}

export function PlanCards({ currentPlan, onUpgrade, upgrading }: PlanCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          current={plan.id === currentPlan}
          onUpgrade={onUpgrade}
          upgrading={upgrading}
        />
      ))}
    </div>
  )
}

function PlanCard({
  plan,
  current,
  onUpgrade,
  upgrading,
}: {
  plan: PlanDefinition
  current: boolean
  onUpgrade: () => void
  upgrading?: boolean
}) {
  return (
    <Card className={current ? "ring-1 ring-foreground/20" : undefined}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-3xl font-semibold tracking-tight">
          {plan.price}
          {plan.period ? (
            <span className="text-sm font-normal text-muted-foreground">
              {plan.period}
            </span>
          ) : null}
        </p>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-4 text-muted-foreground" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {plan.id === "free" ? (
          <Button variant="outline" disabled>
            {current ? "Current plan" : plan.cta}
          </Button>
        ) : current ? (
          <Button variant="outline" disabled>
            Current plan
          </Button>
        ) : (
          <Button onClick={onUpgrade} disabled={upgrading}>
            {plan.cta}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
