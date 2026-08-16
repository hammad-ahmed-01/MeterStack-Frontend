import { AlertCircle } from "lucide-react"
import type { ReactNode } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getErrorMessage } from "@/lib/api/errors"

type ErrorStateProps = {
  error?: unknown
  title?: string
  description?: string
  onRetry?: () => void
  children?: ReactNode
}

export function ErrorState({
  error,
  title = "Unable to load data",
  description,
  onRetry,
  children,
}: ErrorStateProps) {
  const message = description ?? getErrorMessage(error)

  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{message}</p>
        {children}
        {onRetry ? (
          <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  )
}
