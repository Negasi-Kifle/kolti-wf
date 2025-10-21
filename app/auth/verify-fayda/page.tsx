"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function VerifyFaydaPage() {
  const [faydaId, setFaydaId] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      } else {
        router.push("/auth/login")
      }
    }
    checkUser()
  }, [router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // Update profile with Fayda ID
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          fayda_id: faydaId,
          fayda_verified: true,
        })
        .eq("id", userId)

      if (updateError) throw updateError

      router.push("/home")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    router.push("/home")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl">Verify Your Identity with Fayda</CardTitle>
            <CardDescription>የኢትዮጵያን መለያዎን ይፍጠሩ</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-center text-sm text-gray-600">
              For your security, we need to verify your identity with Fayda. This will unlock all features of your Kolti
              account.
            </p>

            {/* Progress Indicator */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="h-2 w-12 rounded-full bg-gray-300"></div>
              <div className="h-2 w-12 rounded-full bg-teal-500"></div>
              <div className="h-2 w-12 rounded-full bg-gray-300"></div>
            </div>

            <form onSubmit={handleVerify}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="faydaId">Enter your Fayda ID</Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <Input
                      id="faydaId"
                      type="text"
                      placeholder="e.g., 123456789012"
                      value={faydaId}
                      onChange={(e) => setFaydaId(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Link href="#" className="block text-center text-sm text-teal-600 underline underline-offset-4">
                  What is Fayda?
                </Link>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-teal-500 py-6 hover:bg-teal-600" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-teal-600"
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  I'll do this later
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
