import { api, asRecord, pickString, unwrapData, unwrapList } from "@/lib/api/client"
import type { HttpMethod, ProductRoute, ProductRouteStatus } from "@/types"

const httpMethods: readonly HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"]

function normalizeMethod(value: string | undefined): HttpMethod {
  if (value && httpMethods.includes(value as HttpMethod)) {
    return value as HttpMethod
  }

  return "GET"
}

function normalizeStatus(value: string | undefined): ProductRouteStatus {
  return value === "disabled" ? "disabled" : "active"
}

function normalizeProductRoute(value: unknown): ProductRoute {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    productId: pickString(record, "productId", "product_id") ?? "",
    method: normalizeMethod(pickString(record, "method")),
    path: pickString(record, "path") ?? "",
    description: pickString(record, "description") ?? "",
    status: normalizeStatus(pickString(record, "status")),
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
  }
}

export type ProductRouteInput = {
  method: HttpMethod
  path: string
  description?: string
}

export const productRoutesApi = {
  async list(productId: string): Promise<ProductRoute[]> {
    const response = await api.get<unknown>(`/products/${productId}/routes`)
    return unwrapList(response.data).map(normalizeProductRoute)
  },

  async create(productId: string, input: ProductRouteInput): Promise<ProductRoute> {
    const response = await api.post<unknown>(`/products/${productId}/routes`, input)
    return normalizeProductRoute(unwrapData(response.data))
  },

  async update(
    productId: string,
    routeId: string,
    input: Partial<ProductRouteInput> & { status?: ProductRouteStatus },
  ): Promise<ProductRoute> {
    const response = await api.patch<unknown>(
      `/products/${productId}/routes/${routeId}`,
      input,
    )
    return normalizeProductRoute(unwrapData(response.data))
  },

  async disable(productId: string, routeId: string): Promise<ProductRoute> {
    const response = await api.delete<unknown>(`/products/${productId}/routes/${routeId}`)
    return normalizeProductRoute(unwrapData(response.data))
  },
}
