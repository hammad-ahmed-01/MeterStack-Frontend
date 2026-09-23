export const queryKeys = {
  me: ["me"] as const,
  organization: {
    all: ["organization"] as const,
    current: ["organization", "current"] as const,
    list: ["organization", "list"] as const,
  },
  products: {
    all: ["products"] as const,
    list: ["products", "list"] as const,
    detail: (id: string) => ["products", "detail", id] as const,
    routes: (id: string) => ["products", "routes", id] as const,
  },
  apiKeys: {
    all: ["apiKeys"] as const,
    list: ["apiKeys", "list"] as const,
  },
  subscription: ["subscription"] as const,
}
