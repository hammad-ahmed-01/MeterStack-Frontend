import { site } from "@/config/site"

export const marketingNav = [
  { href: "#what-is", label: "What is MeterStack?" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#architecture", label: "Architecture" },
] as const

export const currentCapabilities = [
  {
    title: "Authentication",
    description: "Email and password accounts through Supabase. Sessions stay in cookies.",
  },
  {
    title: "Organizations",
    description: "A tenant for products, keys, and billing. v0.1 assumes one org per user.",
  },
  {
    title: "API products",
    description: "Named services you intend to manage. Records only — no routing yet.",
  },
  {
    title: "API key management",
    description: "Issue test or live keys, copy the secret once, then revoke when needed.",
  },
  {
    title: "Subscription foundation",
    description: "Free and Pro plans with a Stripe checkout shell. Not usage-based billing.",
  },
] as const

export const plannedCapabilities = [
  {
    title: "API gateway",
    description: "Authenticate traffic, route requests, and enforce quotas.",
  },
  {
    title: "Usage metering",
    description: "Record, aggregate, and count usage events asynchronously.",
  },
  {
    title: "Metered billing",
    description: "Price models and Stripe usage records on top of real traffic.",
  },
] as const

export const directionStages = [
  {
    title: "SaaS Foundation",
    status: "Current",
    summary:
      "The control plane as it exists today: accounts, orgs, products, keys, and a Stripe subscription shell.",
    items: [
      "Authentication",
      "Organizations",
      "API products",
      "API keys",
      "Stripe subscription foundation",
    ],
  },
  {
    title: "API Gateway",
    status: "Planned",
    summary:
      "Sit in front of customer APIs: authenticate keys, route requests, and enforce limits. Not implemented.",
    items: [
      "API key authentication",
      "Request routing",
      "Quotas",
      "Rate limiting",
      "Request tracking",
    ],
  },
  {
    title: "Usage Metering",
    status: "Planned",
    summary:
      "Turn request traffic into durable usage events so limits and billing can be based on real consumption.",
    items: [
      "Usage events",
      "Aggregation",
      "Asynchronous processing",
      "Usage counters",
    ],
  },
  {
    title: "Usage-Based Billing",
    status: "Planned",
    summary:
      "Monetize APIs from metered usage rather than a flat subscription. Depends on metering existing first.",
    items: [
      "Metered billing",
      "Pricing models",
      "Stripe usage billing",
      "Billing reconciliation",
    ],
  },
  {
    title: "Webhooks",
    status: "Planned",
    summary:
      "Deliver signed events to customer endpoints with retries and delivery history.",
    items: [
      "Customer webhook endpoints",
      "Signed delivery",
      "Retry policies",
      "Delivery logs",
    ],
  },
  {
    title: "Analytics & Observability",
    status: "Exploration",
    summary:
      "A possible later step: understand latency, errors, and usage once traffic is flowing through MeterStack.",
    items: [
      "Latency metrics",
      "Error rates",
      "Usage analytics",
      "OpenTelemetry",
      "Distributed tracing",
    ],
  },
  {
    title: "Distributed Infrastructure",
    status: "Exploration",
    summary:
      "Longer-term study of the systems that become necessary if a single-region app is no longer enough.",
    items: [
      "Redis",
      "Queues",
      "Event-driven architecture",
      "Kafka or NATS",
      "ClickHouse",
      "Microservices",
      "Infrastructure as Code",
      "Multi-region architecture",
    ],
  },
] as const

export const philosophyExamples = [
  {
    trigger: "Synchronous work becomes expensive",
    response: "introduce queues",
  },
  {
    trigger: "Repeated quota checks become costly",
    response: "introduce Redis",
  },
  {
    trigger: "Transactional Postgres becomes unsuitable for large analytics workloads",
    response: "introduce an analytical datastore",
  },
  {
    trigger: "Service boundaries become meaningful",
    response: "introduce distributed services",
  },
] as const

export const architecturePrimary = [
  { label: "Browser", detail: "Control plane UI" },
  { label: "Next.js", detail: "This frontend" },
  { label: "Express API", detail: "Application API" },
  { label: "Supabase / PostgreSQL", detail: "Auth + data" },
] as const

export const architectureBilling = [
  { label: "Express API", detail: "Application API" },
  { label: "Stripe", detail: "Subscription foundation" },
] as const

export const roadmapItems = [
  {
    version: "V0.1",
    title: "SaaS Foundation",
    status: "Current",
  },
  {
    version: "V0.2",
    title: "API Gateway",
    status: "Next",
  },
  {
    version: "V0.3",
    title: "Usage Infrastructure",
    status: "Planned",
  },
  {
    version: "V0.4",
    title: "Metered Billing",
    status: "Planned",
  },
  {
    version: "V0.5",
    title: "Webhook Platform",
    status: "Planned",
  },
  {
    version: "V0.6",
    title: "Analytics & Observability",
    status: "Planned",
  },
  {
    version: "Future",
    title: "Distributed Infrastructure & AI Gateway",
    status: "Exploration",
  },
] as const

export const footerLinks = [
  { href: site.githubUrl, label: "GitHub", external: true },
  { href: "/login", label: "Login", external: false },
  { href: "/register", label: "Register", external: false },
] as const
