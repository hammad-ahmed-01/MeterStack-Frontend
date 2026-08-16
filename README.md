# MeterStack

MeterStack is API management and monetization infrastructure for developers. The long-term product covers metering, usage-based billing, webhooks, and observability. This frontend is the first cut of the control plane: accounts, organizations, products, keys, and a billing shell.

The UI lives here. The Express API is a separate repo. Supabase is only used for authentication. Anything that looks like business data (orgs, products, keys, plans) goes through `NEXT_PUBLIC_API_URL` with the current Supabase access token as `Authorization: Bearer <token>`.

## What a user can do

A developer signs up with email and password, then belongs to an organization. If they don't have one yet, they create it with a name and slug (`Acme Labs` / `acme-labs`) before they can use the dashboard.

Inside an organization they can:

- See a simple overview (product count, active keys, current plan)
- Create API products — a named service they want MeterStack to manage later
- Issue API keys for `test` or `live`
- See whether they're on Free or Pro
- Update org name/slug and their own display name

Email is owned by Supabase, so it's read-only in settings.

There is no metering, gateway, or usage billing in this version. Products are just records. Keys authenticate future traffic; they don't enforce anything yet.

## Domain

**Organization** is the tenant. Everything else hangs off it. The app is built so org switching can be added, but v0.1 assumes one org per user. `GET /organizations/current` returning 404 is how we know to show onboarding.

**Product** is a service the org wants to expose/manage (`Image Generation API`). Name, description, status. Endpoints, routing, and pricing are not here yet.

**API key** is a credential for that org. On create, the backend is expected to return the full secret once. The UI shows it in a modal, lets you copy it, then throws it away. After that we only display the prefix. The secret is never written to `localStorage`. Keys can be revoked.

**Billing** is a placeholder around a current plan. Missing subscription data is treated as Free. Checkout and the Stripe customer portal are wired if those backend routes exist; otherwise the buttons just fail softly.

## Auth

Register and login are email/password via Supabase. Sessions are cookies, refreshed in `src/proxy.ts`. Logged-out users can't hit dashboard routes; logged-in users get bounced off `/login` and `/register`.

`/auth/callback` exists so magic links and OAuth can plug in later without changing the rest of the app. MFA is not implemented.

After login the Axios client pulls the access token from the Supabase session. Individual pages don't attach tokens themselves.

## Stack

Next.js App Router, TypeScript, Tailwind, shadcn/ui, TanStack Query, React Hook Form, Zod. Server state lives in Query (`organization`, `products`, `apiKeys`, `subscription`). Forms don't keep a second copy of that data.

The API client in `src/lib/api` unwraps either a raw resource or `{ data: ... }`, and accepts camelCase or snake_case so the backend can settle on one style without blocking the UI.

Env vars are in `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL          # defaults to http://localhost:4000/api/v1
```

`npm run dev` starts the app on port 3000.
