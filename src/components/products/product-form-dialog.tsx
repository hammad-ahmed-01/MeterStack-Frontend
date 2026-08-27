"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products"
import { getErrorMessage } from "@/lib/api/errors"
import { productSchema, type ProductValues } from "@/lib/validation/product"
import type { Product } from "@/types"

type ProductFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
}

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
}: ProductFormDialogProps) {
  const isEditing = Boolean(product)
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", description: "" },
  })

  useEffect(() => {
    if (!open) {
      return
    }

    reset({
      name: product?.name ?? "",
      description: product?.description ?? "",
    })
  }, [open, product, reset])

  async function onSubmit(values: ProductValues) {
    try {
      if (product) {
        await updateProduct.mutateAsync({
          id: product.id,
          name: values.name,
          description: values.description.trim(),
        })
        toast.success("Product updated")
      } else {
        await createProduct.mutateAsync({
          name: values.name,
          description: values.description.trim(),
        })
        toast.success("Product created")
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
          reset({ name: "", description: "" })
        }
        onOpenChange(nextOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit API product" : "Create API product"}
          </DialogTitle>
          <DialogDescription>
            Products represent services you want to manage through MeterStack.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field label="Name" htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              placeholder="Image Generation API"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
          </Field>
          <Field
            label="Description"
            htmlFor="description"
            error={errors.description?.message}
          >
            <Textarea
              id="description"
              placeholder="Optional description"
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
              {isEditing ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
