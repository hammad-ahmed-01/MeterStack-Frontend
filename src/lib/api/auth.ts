import { api, asRecord, pickString, unwrapData } from "@/lib/api/client"
import type { Profile } from "@/types"

function normalizeProfile(value: unknown): Profile {
  const record = asRecord(value)

  return {
    id: pickString(record, "id") ?? "",
    email: pickString(record, "email") ?? "",
    fullName: pickString(record, "fullName", "full_name", "name") ?? "",
    createdAt: pickString(record, "createdAt", "created_at") ?? "",
  }
}

export const authApi = {
  async getMe(): Promise<Profile> {
    const response = await api.get<unknown>("/me")
    return normalizeProfile(unwrapData(response.data))
  },

  async updateMe(input: { fullName: string }): Promise<Profile> {
    const response = await api.patch<unknown>("/me", {
      fullName: input.fullName,
      full_name: input.fullName,
    })
    return normalizeProfile(unwrapData(response.data))
  },
}
