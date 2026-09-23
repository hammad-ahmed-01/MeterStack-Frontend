"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  useCreateProductRoute,
  useUpdateProductRoute,
} from "@/hooks/use-product-routes"
import { getErrorMessage } from "@/lib/api/errors"
import {
  httpMethods,
  productRouteSchema,
  type ProductRouteValues,
} from "@/lib/validation/product-route"
import type { ProductRoute } from "@/types"

type ProductRouteFormDialogProps = {
  productId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  route?: ProductRoute | null
}

export function ProductRouteFormDialog({
  productId,
  open,
  onOpenChange,
  route,
}: ProductRouteFormDialogProps) {
  const isEditing = Boolean(route)
  const createRoute = useCreateProductRoute(productId)
  const updateRoute = useUpdateProductRoute(productId)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductRouteValues>({
    resolver: zodResolver(productRouteSchema),
    defaultValues: { method: "GET", path: "", description: "" },
  })

  useEffect(() => {
    if (!open) {
      return
    }

    reset({
      method: route?.method ?? "GET",
      path: route?.path ?? "",
      description: route?.description ?? "",
    })
  }, [open, route, reset])

  async function onSubmit(values: ProductRouteValues) {
    const input = {
      method: values.method,
      path: values.path.trim(),
      description: values.description.trim(),
    }

    try {
      if (route) {
        await updateRoute.mutateAsync({ routeId: route.id, ...input })
        toast.success("Route updated")
      } else {
        await createRoute.mutateAsync(input)
        toast.success("Route added")
      }

      onOpenChange(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          reset({ method: "GET", path: "", description: "" })
        }
        onOpenChange(nextOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit route" : "Add route"}</DialogTitle>
          <DialogDescription>
            A method and path on this product. The path is appended to the base URL.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Method" htmlFor="method" error={errors.method?.message}>
            <Controller
              control={control}
              name="method"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="method" className="w-full">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {httpMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Path" htmlFor="path" error={errors.path?.message}>
            <Input
              id="path"
              placeholder="/images/:id"
              aria-invalid={Boolean(errors.path)}
              {...register("path")}
            />
          </Field>
          <Field
            label="Description"
            htmlFor="route-description"
            error={errors.description?.message}
          >
            <Textarea
              id="route-description"
              placeholder="Optional"
              aria-invalid={Boolean(errors.description)}
              {...register("description")}
            />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
              {isEditing ? "Save changes" : "Add route"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
