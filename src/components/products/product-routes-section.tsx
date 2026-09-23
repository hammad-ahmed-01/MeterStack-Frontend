"use client"

import { MoreHorizontal, Plus, Route } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { ProductRouteFormDialog } from "@/components/products/product-route-form-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
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
  useDisableProductRoute,
  useProductRoutes,
  useUpdateProductRoute,
} from "@/hooks/use-product-routes"
import { getErrorMessage } from "@/lib/api/errors"
import type { ProductRoute } from "@/types"

type ProductRoutesSectionProps = {
  productId: string
}

export function ProductRoutesSection({ productId }: ProductRoutesSectionProps) {
  const { data, isLoading, isError, error, refetch } = useProductRoutes(productId)
  const updateRoute = useUpdateProductRoute(productId)
  const disableRoute = useDisableProductRoute(productId)
  const [formOpen, setFormOpen] = useState(false)
  const [editingRoute, setEditingRoute] = useState<ProductRoute | null>(null)
  const [routeToDisable, setRouteToDisable] = useState<ProductRoute | null>(null)
  const routes = data ?? []

  function openCreate() {
    setEditingRoute(null)
    setFormOpen(true)
  }

  function openEdit(route: ProductRoute) {
    setEditingRoute(route)
    setFormOpen(true)
  }

  async function handleDisable() {
    if (!routeToDisable) {
      return
    }

    try {
      await disableRoute.mutateAsync(routeToDisable.id)
      toast.success("Route disabled")
      setRouteToDisable(null)
    } catch (disableError) {
      toast.error(getErrorMessage(disableError))
    }
  }

  async function handleEnable(route: ProductRoute) {
    try {
      await updateRoute.mutateAsync({ routeId: route.id, status: "active" })
      toast.success("Route enabled")
    } catch (enableError) {
      toast.error(getErrorMessage(enableError))
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium">Routes</h2>
          <p className="text-sm text-muted-foreground">
            Paths this product exposes. They are stored here and not served yet.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus data-icon="inline-start" />
          Add route
        </Button>
      </div>
      {isLoading ? (
        <TableSkeleton columns={4} />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : routes.length === 0 ? (
        <EmptyState
          icon={Route}
          title="No routes yet"
          description="Add a method and path, such as GET /images."
          actionLabel="Add route"
          onAction={openCreate}
        />
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-mono text-xs">{route.method}</TableCell>
                  <TableCell className="font-mono text-sm">{route.path}</TableCell>
                  <TableCell className="max-w-sm truncate text-muted-foreground">
                    {route.description || "—"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={route.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label="Route actions">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(route)}>
                          Edit
                        </DropdownMenuItem>
                        {route.status === "disabled" ? (
                          <DropdownMenuItem onClick={() => void handleEnable(route)}>
                            Enable
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setRouteToDisable(route)}
                          >
                            Disable
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
      <ProductRouteFormDialog
        productId={productId}
        open={formOpen}
        route={editingRoute}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) {
            setEditingRoute(null)
          }
        }}
      />
      <AlertDialog
        open={Boolean(routeToDisable)}
        onOpenChange={(open) => {
          if (!open) {
            setRouteToDisable(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable this route?</AlertDialogTitle>
            <AlertDialogDescription>
              {routeToDisable
                ? `${routeToDisable.method} ${routeToDisable.path} will be marked disabled. You can enable it later.`
                : "This route will be marked disabled. You can enable it later."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDisable}>
              Disable
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
