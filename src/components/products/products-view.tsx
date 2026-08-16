"use client"

import { Package, Plus } from "lucide-react"
import { useState } from "react"

import { CreateProductDialog } from "@/components/products/create-product-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { PageHeader } from "@/components/shared/page-header"
import { TableSkeleton } from "@/components/shared/skeletons"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useProducts } from "@/hooks/use-products"
import { formatDate } from "@/lib/utils"

export function ProductsView() {
  const { data, isLoading, isError, error, refetch } = useProducts()
  const [open, setOpen] = useState(false)
  const products = data ?? []

  return (
    <div>
      <PageHeader
        title="Products"
        description="API products your organization manages through MeterStack."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus data-icon="inline-start" />
            Create product
          </Button>
        }
      />
      {isLoading ? (
        <TableSkeleton columns={4} />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No API products yet"
          description="Create your first product to start managing APIs with MeterStack."
          actionLabel="Create product"
          onAction={() => setOpen(true)}
        />
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="max-w-sm truncate text-muted-foreground">
                    {product.description || "—"}
                  </TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <CreateProductDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
