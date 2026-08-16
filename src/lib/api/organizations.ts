import { api, asRecord, pickString, unwrapData, unwrapList } from "@/lib/api/client"
import { ApiError } from "@/lib/api/errors"
import type { Organization } from "@/types"

function normalizeOrganization(value: unknown): Organization {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    name: pickString(record, "name") ?? "",
    slug: pickString(record, "slug") ?? "",
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
  }
}

export const organizationsApi = {
  async getCurrent(): Promise<Organization | null> {
    try {
      const response = await api.get<unknown>("/organizations/current")
      return normalizeOrganization(unwrapData(response.data))
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null
      }
      throw error
    }
  },

  async list(): Promise<Organization[]> {
    const response = await api.get<unknown>("/organizations")
    return unwrapList(response.data).map(normalizeOrganization)
  },

  async create(input: { name: string; slug: string }): Promise<Organization> {
    const response = await api.post<unknown>("/organizations", input)
    return normalizeOrganization(unwrapData(response.data))
  },

  async update(
    id: string,
    input: { name: string; slug: string },
  ): Promise<Organization> {
    const response = await api.patch<unknown>(`/organizations/${id}`, input)
    return normalizeOrganization(unwrapData(response.data))
  },
}
