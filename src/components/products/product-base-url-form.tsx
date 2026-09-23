"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Field } from "@/components/shared/field"
import { Spinner } from "@/components/shared/spinner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUpdateProduct } from "@/hooks/use-products"
import { getErrorMessage } from "@/lib/api/errors"
import {
  productBaseUrlSchema,
  type ProductBaseUrlValues,
} from "@/lib/validation/product-route"
import type { Product } from "@/types"

type ProductBaseUrlFormProps = {
  product: Product
}

export function ProductBaseUrlForm({ product }: ProductBaseUrlFormProps) {
  const updateProduct = useUpdateProduct()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductBaseUrlValues>({
    resolver: zodResolver(productBaseUrlSchema),
    defaultValues: { baseUrl: product.baseUrl ?? "" },
  })

  useEffect(() => {
    reset({ baseUrl: product.baseUrl ?? "" })
  }, [product.baseUrl, reset])

  async function onSubmit(values: ProductBaseUrlValues) {
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        baseUrl: values.baseUrl.trim(),
      })
      toast.success(values.baseUrl.trim() ? "Base URL saved" : "Base URL cleared")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upstream</CardTitle>
        <CardDescription>The base URL routes on this product are appended to.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid max-w-lg gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Base URL"
            htmlFor="baseUrl"
            error={errors.baseUrl?.message}
            hint="Example: https://api.acme.dev"
          >
            <Input
              id="baseUrl"
              placeholder="https://api.acme.dev"
              aria-invalid={Boolean(errors.baseUrl)}
              {...register("baseUrl")}
            />
          </Field>
          <div>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
              Save base URL
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
