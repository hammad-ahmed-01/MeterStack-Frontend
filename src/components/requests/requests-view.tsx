"use client"

import { Activity } from "lucide-react"
import { useState } from "react"

import { RequestStatusCode } from "@/components/requests/request-status-code"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { PageHeader } from "@/components/shared/page-header"
import { TableSkeleton } from "@/components/shared/skeletons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRequestLogs } from "@/hooks/use-request-logs"
import { useProducts } from "@/hooks/use-products"
import { formatDateTime } from "@/lib/utils"
import type { RequestStatusClass } from "@/types"

const statusFilters: { value: "all" | RequestStatusClass; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "2xx", label: "Success" },
  { value: "4xx", label: "Client error" },
  { value: "5xx", label: "Server error" },
]

export function RequestsView() {
  const products = useProducts()
  const [productFilter, setProductFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState<"all" | RequestStatusClass>("all")
  const logs = useRequestLogs({
    productId: productFilter === "all" ? undefined : productFilter,
    statusClass: statusFilter === "all" ? undefined : statusFilter,
  })
  const rows = logs.data ?? []

  return (
    <div>
      <PageHeader
        title="Requests"
        description="Calls recorded for your products."
      />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="w-full sm:w-64" aria-label="Product">
            <SelectValue placeholder="All products" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">All products</SelectItem>
            {(products.data ?? []).map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as "all" | RequestStatusClass)}
        >
          <SelectTrigger className="w-full sm:w-48" aria-label="Status">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent position="popper">
            {statusFilters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {logs.isLoading ? (
        <TableSkeleton columns={7} />
      ) : logs.isError ? (
        <ErrorState error={logs.error} onRetry={() => void logs.refetch()} />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No requests yet"
          description="Requests show up here once a call is recorded for a product."
        />
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Key</TableHead>
                <TableHead className="text-right">Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTime(log.createdAt)}
                  </TableCell>
                  <TableCell>{log.productName || "—"}</TableCell>
                  <TableCell className="font-mono text-xs">{log.method}</TableCell>
                  <TableCell className="max-w-xs truncate font-mono text-sm">{log.path}</TableCell>
                  <TableCell>
                    <RequestStatusCode code={log.statusCode} />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.keyPrefix || "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{log.latencyMs} ms</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
