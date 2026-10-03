import { api, asRecord, pickString, unwrapData, unwrapList } from "@/lib/api/client"
import type { Product, ProductStatus } from "@/types"

function normalizeBaseUrl(record: Record<string, unknown>): string | null {
  return pickString(record, "baseUrl", "base_url") ?? null
}

function pickNumber(record: Record<string, unknown>, ...keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key]

    if (typeof value === "number" && Number.isFinite(value)) {
      return value
    }
  }

  return null
}

function normalizeStatus(value: string | undefined): ProductStatus {
  return value === "archived" ? "archived" : "active"
}

function normalizeProduct(value: unknown): Product {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    name: pickString(record, "name") ?? "",
    description: pickString(record, "description") ?? "",
    baseUrl: normalizeBaseUrl(record),
    rateLimit: pickNumber(record, "rateLimit", "rate_limit"),
    rateLimitWindowSeconds: pickNumber(
      record,
      "rateLimitWindowSeconds",
      "rate_limit_window_seconds",
    ),
    status: normalizeStatus(pickString(record, "status")),
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
  }
}

export const productsApi = {
  async list(): Promise<Product[]> {
    const response = await api.get<unknown>("/products")
    return unwrapList(response.data).map(normalizeProduct)
  },

  async get(id: string): Promise<Product> {
    const response = await api.get<unknown>(`/products/${id}`)
    return normalizeProduct(unwrapData(response.data))
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
      baseUrl?: string | null
      rateLimit?: number | null
      rateLimitWindowSeconds?: number | null
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
