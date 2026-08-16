"use client"

import { KeyRound, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { ApiKeyCreatedDialog } from "@/components/api-keys/api-key-created-dialog"
import { CreateApiKeyDialog } from "@/components/api-keys/create-api-key-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { PageHeader } from "@/components/shared/page-header"
import { TableSkeleton } from "@/components/shared/skeletons"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useApiKeys, useRevokeApiKey } from "@/hooks/use-api-keys"
import { getErrorMessage } from "@/lib/api/errors"
import { formatDate, formatRelativeTime } from "@/lib/utils"
import type { CreatedApiKey } from "@/types"

export function ApiKeysView() {
  const { data, isLoading, isError, error, refetch } = useApiKeys()
  const revokeApiKey = useRevokeApiKey()
  const [createOpen, setCreateOpen] = useState(false)
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [revokeId, setRevokeId] = useState<string | null>(null)
  const keys = data ?? []

  function handleCreated(apiKey: CreatedApiKey) {
    setCreatedSecret(apiKey.secret)
  }

  async function handleRevoke() {
    if (!revokeId) {
      return
    }

    try {
      await revokeApiKey.mutateAsync(revokeId)
      toast.success("API key revoked")
      setRevokeId(null)
    } catch (revokeError) {
      toast.error(getErrorMessage(revokeError))
    }
  }

  return (
    <div>
      <PageHeader
        title="API Keys"
        description="Authenticate requests from your applications."
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus data-icon="inline-start" />
            Create API key
          </Button>
        }
      />
      {isLoading ? (
        <TableSkeleton columns={6} />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : keys.length === 0 ? (
        <EmptyState
          icon={KeyRound}
          title="No API keys yet"
          description="Generate a key to authenticate requests from your application."
          actionLabel="Create API key"
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key Prefix</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell className="font-mono text-xs">{key.keyPrefix}</TableCell>
                  <TableCell>
                    <StatusBadge status={key.environment} />
                  </TableCell>
                  <TableCell>{formatDate(key.createdAt)}</TableCell>
                  <TableCell>{formatRelativeTime(key.lastUsedAt)}</TableCell>
                  <TableCell>
                    <StatusBadge status={key.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {key.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setRevokeId(key.id)}
                      >
                        Revoke
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <CreateApiKeyDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreated}
      />
      <ApiKeyCreatedDialog
        secret={createdSecret}
        onClose={() => setCreatedSecret(null)}
      />
      <AlertDialog open={Boolean(revokeId)} onOpenChange={() => setRevokeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke this API key?</AlertDialogTitle>
            <AlertDialogDescription>
              Requests using this key will stop working immediately. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleRevoke}>
              Revoke key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
