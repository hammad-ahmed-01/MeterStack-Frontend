"use client"

import Link from "next/link"

import { RequestStatusCode } from "@/components/requests/request-status-code"
import { ErrorState } from "@/components/shared/error-state"
import { TableSkeleton } from "@/components/shared/skeletons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRequestLogs } from "@/hooks/use-request-logs"
import { formatRelativeTime } from "@/lib/utils"

export function RecentRequests() {
  const logs = useRequestLogs({ limit: 5 })
  const rows = logs.data ?? []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent requests</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/requests">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {logs.isLoading ? (
          <TableSkeleton rows={3} columns={4} />
        ) : logs.isError ? (
          <ErrorState error={logs.error} onRetry={() => void logs.refetch()} />
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No requests yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Request</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatRelativeTime(log.createdAt)}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs">{log.method}</span>{" "}
                    <span className="font-mono text-sm">{log.path}</span>
                    {log.productName ? (
                      <p className="text-xs text-muted-foreground">{log.productName}</p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <RequestStatusCode code={log.statusCode} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{log.latencyMs} ms</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
