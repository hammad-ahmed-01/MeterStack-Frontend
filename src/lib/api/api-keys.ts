import { api, asRecord, pickString, unwrapData, unwrapList } from "@/lib/api/client"
import { ApiError } from "@/lib/api/errors"
import type { ApiKey, ApiKeyEnvironment, ApiKeyStatus, CreatedApiKey } from "@/types"

function normalizeEnvironment(value: string | undefined): ApiKeyEnvironment {
  return value === "live" ? "live" : "test"
}

function normalizeStatus(value: string | undefined): ApiKeyStatus {
  return value === "revoked" ? "revoked" : "active"
}

function normalizeApiKey(value: unknown): ApiKey {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    name: pickString(record, "name") ?? "",
    keyPrefix:
      pickString(record, "keyPrefix", "key_prefix", "prefix") ?? "ms_****",
    environment: normalizeEnvironment(pickString(record, "environment")),
    status: normalizeStatus(pickString(record, "status")),
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
    lastUsedAt: pickString(record, "lastUsedAt", "last_used_at") ?? null,
  }
}

function normalizeCreatedApiKey(value: unknown): CreatedApiKey {
  const record = asRecord(value)
  const secret = pickString(record, "secret", "secretKey", "secret_key", "key")

  if (!secret) {
    throw new ApiError(
      "The API key was created, but the secret was not returned.",
      500,
      "MISSING_SECRET",
    )
  }

  return {
    ...normalizeApiKey(value),
    secret,
  }
}

export const apiKeysApi = {
  async list(): Promise<ApiKey[]> {
    const response = await api.get<unknown>("/api-keys")
    return unwrapList(response.data).map(normalizeApiKey)
  },

  async create(input: {
    name: string
    environment: ApiKeyEnvironment
  }): Promise<CreatedApiKey> {
    const response = await api.post<unknown>("/api-keys", input)
    return normalizeCreatedApiKey(unwrapData(response.data))
  },

  async revoke(id: string): Promise<void> {
    await api.delete(`/api-keys/${id}`)
  },
}
