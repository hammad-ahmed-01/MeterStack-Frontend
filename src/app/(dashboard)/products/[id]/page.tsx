import type { Metadata } from "next"

import { ProductDetailView } from "@/components/products/product-detail-view"

export const metadata: Metadata = {
  title: "Product",
}

export default function ProductDetailPage() {
  return <ProductDetailView />
}
