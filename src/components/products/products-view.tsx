"use client"

import { MoreHorizontal, Package, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { ProductFormDialog } from "@/components/products/product-form-dialog"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useArchiveProduct,
  useProducts,
  useUpdateProduct,
} from "@/hooks/use-products"
import { getErrorMessage } from "@/lib/api/errors"
import { formatDate } from "@/lib/utils"
import type { Product } from "@/types"

export function ProductsView() {
  const { data, isLoading, isError, error, refetch } = useProducts()
  const archiveProduct = useArchiveProduct()
  const updateProduct = useUpdateProduct()
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productToArchive, setProductToArchive] = useState<Product | null>(null)
  const products = data ?? []

  function openCreate() {
    setEditingProduct(null)
    setFormOpen(true)
  }

  function openEdit(product: Product) {
    setEditingProduct(product)
    setFormOpen(true)
  }

  async function handleArchive() {
    if (!productToArchive) {
      return
    }

    try {
      await archiveProduct.mutateAsync(productToArchive.id)
      toast.success("Product archived")
      setProductToArchive(null)
    } catch (archiveError) {
      toast.error(getErrorMessage(archiveError))
    }
  }

  async function handleRestore(product: Product) {
    try {
      await updateProduct.mutateAsync({ id: product.id, status: "active" })
      toast.success("Product restored")
    } catch (restoreError) {
      toast.error(getErrorMessage(restoreError))
    }
  }

  return (
    <div>
      <PageHeader
        title="Products"
        description="API products your organization manages through MeterStack."
        actions={
          <Button onClick={openCreate}>
            <Plus data-icon="inline-start" />
            Create product
          </Button>
        }
      />
      {isLoading ? (
        <TableSkeleton columns={5} />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : products.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No API products yet"
          description="Create your first product to start managing APIs with MeterStack."
          actionLabel="Create product"
          onAction={openCreate}
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
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label="Product actions">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(product)}>
                          Edit
                        </DropdownMenuItem>
                        {product.status === "archived" ? (
                          <DropdownMenuItem onClick={() => void handleRestore(product)}>
                            Restore
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setProductToArchive(product)}
                          >
                            Archive
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <ProductFormDialog
        open={formOpen}
        product={editingProduct}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) {
            setEditingProduct(null)
          }
        }}
      />
      <AlertDialog
        open={Boolean(productToArchive)}
        onOpenChange={(open) => {
          if (!open) {
            setProductToArchive(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive this product?</AlertDialogTitle>
            <AlertDialogDescription>
              {productToArchive
                ? `${productToArchive.name} will be archived. You can restore it later.`
                : "This product will be archived. You can restore it later."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleArchive}>
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
