import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[v0] Supabase environment variables not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    )

    // Return a mock client that throws helpful errors
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }),
        signUp: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }),
        signInWithPassword: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }),
        signOut: async () => ({ error: new Error("Supabase not configured") }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error("Supabase not configured") }),
            order: () => ({
              limit: async () => ({ data: [], error: new Error("Supabase not configured") }),
            }),
          }),
          order: () => ({
            limit: async () => ({ data: [], error: new Error("Supabase not configured") }),
          }),
        }),
        insert: () => ({
          select: () => ({
            single: async () => ({ data: null, error: new Error("Supabase not configured") }),
          }),
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: async () => ({ data: null, error: new Error("Supabase not configured") }),
            }),
          }),
        }),
        delete: () => ({
          eq: async () => ({ error: new Error("Supabase not configured") }),
        }),
      }),
    } as any
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
