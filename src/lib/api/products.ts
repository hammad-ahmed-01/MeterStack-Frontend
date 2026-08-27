import { api, asRecord, pickString, unwrapData, unwrapList } from "@/lib/api/client"
import type { Product, ProductStatus } from "@/types"

function normalizeStatus(value: string | undefined): ProductStatus {
  return value === "archived" ? "archived" : "active"
}

function normalizeProduct(value: unknown): Product {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    name: pickString(record, "name") ?? "",
    description: pickString(record, "description") ?? "",
    status: normalizeStatus(pickString(record, "status")),
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
  }
}

export const productsApi = {
  async list(): Promise<Product[]> {
    const response = await api.get<unknown>("/products")
    return unwrapList(response.data).map(normalizeProduct)
  },

  async create(input: { name: string; description: string }): Promise<Product> {
    const response = await api.post<unknown>("/products", input)
    return normalizeProduct(unwrapData(response.data))
  },

  async update(
    id: string,
    input: {
      name?: string
      description?: string
      status?: ProductStatus
    },
  ): Promise<Product> {
    const response = await api.patch<unknown>(`/products/${id}`, input)
    return normalizeProduct(unwrapData(response.data))
  },

  async archive(id: string): Promise<Product> {
    const response = await api.delete<unknown>(`/products/${id}`)
    return normalizeProduct(unwrapData(response.data))
  },
}
