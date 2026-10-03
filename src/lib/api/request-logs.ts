import { api, asRecord, pickString, unwrapList } from "@/lib/api/client"
import type { RequestLog, RequestStatusClass } from "@/types"

export type RequestLogQuery = {
  productId?: string
  statusClass?: RequestStatusClass
  limit?: number
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

function normalizeRequestLog(value: unknown): RequestLog {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    productId: pickString(record, "productId", "product_id") ?? null,
    productName: pickString(record, "productName", "product_name") ?? null,
    method: pickString(record, "method") ?? "",
    path: pickString(record, "path") ?? "",
    statusCode: pickNumber(record, "statusCode", "status_code") ?? 0,
    keyPrefix: pickString(record, "keyPrefix", "key_prefix") ?? null,
    latencyMs: pickNumber(record, "latencyMs", "latency_ms") ?? 0,
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
  }
}

export const requestLogsApi = {
  async list(query: RequestLogQuery = {}): Promise<RequestLog[]> {
    const params: Record<string, string | number> = {}

    if (query.productId) {
      params.productId = query.productId
    }

    if (query.statusClass) {
      params.statusClass = query.statusClass
    }

    if (query.limit) {
      params.limit = query.limit
    }

    const response = await api.get<unknown>("/requests", { params })
    return unwrapList(response.data).map(normalizeRequestLog)
  },
}
