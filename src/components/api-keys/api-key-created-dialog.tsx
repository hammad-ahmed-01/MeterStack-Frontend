"use client"

import { CopyButton } from "@/components/shared/copy-button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ApiKeyCreatedDialogProps = {
  secret: string | null
  onClose: () => void
}

export function ApiKeyCreatedDialog({ secret, onClose }: ApiKeyCreatedDialogProps) {
  return (
    <Dialog
      open={Boolean(secret)}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Your API key has been created.</DialogTitle>
          <DialogDescription>
            Copy this key now. You will not be able to view it again.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border bg-muted/40 px-3 py-2 font-mono text-sm break-all">
          {secret}
        </div>
        <Alert>
          <AlertDescription>
            Store this secret in your application environment. MeterStack only
            keeps the key prefix after this dialog is closed.
          </AlertDescription>
        </Alert>
        <DialogFooter>
          {secret ? <CopyButton value={secret} label="Copy key" /> : null}
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
