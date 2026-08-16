import type { Session, User } from "@supabase/supabase-js"

import { createClient } from "@/lib/supabase/client"

export type PasswordSignInInput = {
  email: string
  password: string
}

export type PasswordSignUpInput = {
  email: string
  password: string
  fullName: string
}

function getAuthRedirectUrl() {
  if (typeof window === "undefined") {
    return undefined
  }

  return `${window.location.origin}/auth/callback`
}

export async function signInWithPassword({ email, password }: PasswordSignInInput) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signUpWithPassword({
  email,
  password,
  fullName,
}: PasswordSignUpInput) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: getAuthRedirectUrl(),
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function getSession(): Promise<Session | null> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return data.session
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return null
  }

  return data.user
}

export async function getAccessToken(): Promise<string | null> {
  const session = await getSession()
  return session?.access_token ?? null
}

export async function updateUserFullName(fullName: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  })

  if (error) {
    throw error
  }

  return data.user
}

export function getUserFullName(user: User | null): string {
  if (!user) {
    return ""
  }

  const metadataName = user.user_metadata.full_name
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName
  }

  return user.email?.split("@")[0] ?? "User"
}

/*
  Future auth methods can be added here without changing call sites:

  export async function signInWithMagicLink(email: string) {
    const supabase = createClient()
    return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: getAuthRedirectUrl() } })
  }

  export async function signInWithOAuth(provider: Provider) {
    const supabase = createClient()
    return supabase.auth.signInWithOAuth({ provider, options: { redirectTo: getAuthRedirectUrl() } })
  }

  export async function enrollMfa() {
    const supabase = createClient()
    return supabase.auth.mfa.enroll({ factorType: "totp" })
  }
*/
