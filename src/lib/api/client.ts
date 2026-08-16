import axios, { type AxiosError } from "axios"

import { env } from "@/config/env"
import { ApiError, parseApiError } from "@/lib/api/errors"
import { getAccessToken } from "@/lib/supabase/auth"

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
})

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    if (!error.response) {
      throw new ApiError(
        "Unable to reach the server. Please try again.",
        0,
        "NETWORK_ERROR",
      )
    }

    throw parseApiError(error.response.data, error.response.status)
  },
)

export function unwrapData<T>(payload: unknown): T {
  if (payload !== null && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data
  }

  return payload as T
}

export function unwrapList<T>(payload: unknown): T[] {
  const value = unwrapData<T[] | { items: T[] }>(payload)

  if (Array.isArray(value)) {
    return value
  }

  if (value && typeof value === "object" && Array.isArray(value.items)) {
    return value.items
  }

  return []
}

export function pickString(
  record: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === "string" && value.length > 0) {
      return value
    }
  }

  return undefined
}

export function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }

  throw new ApiError("The server returned an unexpected response.", 500, "INVALID_RESPONSE")
}
