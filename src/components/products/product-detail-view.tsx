"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { ProductBaseUrlForm } from "@/components/products/product-base-url-form"
import { ProductRoutesSection } from "@/components/products/product-routes-section"
import { ErrorState } from "@/components/shared/error-state"
import { PageHeader } from "@/components/shared/page-header"
import { CardsSkeleton } from "@/components/shared/skeletons"
import { StatusBadge } from "@/components/shared/status-badge"
import { useProduct } from "@/hooks/use-products"

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function ProductDetailView() {
  const params = useParams<{ id: string }>()
  const productId = typeof params.id === "string" ? params.id : ""
  const isValidId = uuidPattern.test(productId)
  const { data, isLoading, isError, error, refetch } = useProduct(isValidId ? productId : "")

  return (
    <div>
      <Link
        href="/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Products
      </Link>
      {!isValidId ? (
        <ErrorState title="Product not found" description="This product link is not valid." />
      ) : isLoading ? (
        <CardsSkeleton count={2} />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : data ? (
        <div className="space-y-8">
          <PageHeader
            title={data.name}
            description={data.description || "No description"}
            actions={<StatusBadge status={data.status} />}
          />
          <ProductBaseUrlForm product={data} />
          <ProductRoutesSection productId={data.id} />
        </div>
      ) : null}
    </div>
  )
}
