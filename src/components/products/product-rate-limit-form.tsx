"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUpdateProduct } from "@/hooks/use-products"
import { getErrorMessage } from "@/lib/api/errors"
import {
  productRateLimitSchema,
  rateLimitWindows,
  type ProductRateLimitValues,
} from "@/lib/validation/product"
import type { Product } from "@/types"

type ProductRateLimitFormProps = {
  product: Product
}

function windowValue(seconds: number | null): ProductRateLimitValues["windowSeconds"] {
  const match = rateLimitWindows.find((window) => window.value === String(seconds))
  return match?.value ?? "60"
}

export function ProductRateLimitForm({ product }: ProductRateLimitFormProps) {
  const updateProduct = useUpdateProduct()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductRateLimitValues>({
    resolver: zodResolver(productRateLimitSchema),
    defaultValues: {
      rateLimit: product.rateLimit?.toString() ?? "",
      windowSeconds: windowValue(product.rateLimitWindowSeconds),
    },
  })

  useEffect(() => {
    reset({
      rateLimit: product.rateLimit?.toString() ?? "",
      windowSeconds: windowValue(product.rateLimitWindowSeconds),
    })
  }, [product.rateLimit, product.rateLimitWindowSeconds, reset])

  async function onSubmit(values: ProductRateLimitValues) {
    const trimmed = values.rateLimit.trim()
    const isCleared = trimmed === ""

    try {
      await updateProduct.mutateAsync({
        id: product.id,
        rateLimit: isCleared ? null : Number(trimmed),
        rateLimitWindowSeconds: isCleared ? null : Number(values.windowSeconds),
      })
      toast.success(isCleared ? "Rate limit removed" : "Rate limit saved")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate limit</CardTitle>
        <CardDescription>
          How many requests this product allows in one window. Saved here for the gateway to
          read later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid max-w-lg gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            label="Requests"
            htmlFor="rateLimit"
            error={errors.rateLimit?.message}
            hint="Leave this empty to remove the limit."
          >
            <Input
              id="rateLimit"
              inputMode="numeric"
              placeholder="1000"
              aria-invalid={Boolean(errors.rateLimit)}
              {...register("rateLimit")}
            />
          </Field>
          <Field label="Window" htmlFor="windowSeconds" error={errors.windowSeconds?.message}>
            <Controller
              control={control}
              name="windowSeconds"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="windowSeconds" className="w-full">
                    <SelectValue placeholder="Window" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {rateLimitWindows.map((window) => (
                      <SelectItem key={window.value} value={window.value}>
                        {window.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <div>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
              Save rate limit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
