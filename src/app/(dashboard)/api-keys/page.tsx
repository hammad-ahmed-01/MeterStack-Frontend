import type { Metadata } from "next"

import { ApiKeysView } from "@/components/api-keys/api-keys-view"

export const metadata: Metadata = {
  title: "API Keys",
}

export default function ApiKeysPage() {
  return <ApiKeysView />
}
