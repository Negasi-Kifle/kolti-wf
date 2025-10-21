"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyAccountUpdatePage() {
  const params = useParams()
  const [faydaId, setFaydaId] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [accountDetails, setAccountDetails] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Retrieve pending account update details from sessionStorage
    const pending = sessionStorage.getItem("pendingAccountUpdate")
    if (!pending) {
      router.push(`/accounts/${params.id}`)
      return
    }
    setAccountDetails(JSON.parse(pending))
  }, [router, params.id])

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      // In a real implementation, we would verify the Fayda ID with the account
      // For now, we just update the account in the database
      const { error: updateError } = await supabase
        .from("linked_accounts")
        .update({
          account_name: accountDetails.accountName,
          account_number: accountDetails.accountNumber,
          account_type: accountDetails.accountType,
          provider_name: accountDetails.providerName,
        })
        .eq("id", accountDetails.id)
        .eq("user_id", user.id)

      if (updateError) throw updateError

      // Clear sessionStorage
      sessionStorage.removeItem("pendingAccountUpdate")

      // Navigate to home
      router.push("/home")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!accountDetails) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <Link
          href={`/accounts/${params.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <Card className="mt-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <Lock className="h-8 w-8 text-teal-600" />
            </div>
            <CardTitle>Verify Account Update</CardTitle>
            <CardDescription>Enter your Fayda ID to verify this account update</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-gray-100 p-4">
              <p className="text-sm text-gray-600">Updated Account Details</p>
              <p className="mt-1 font-medium">{accountDetails.providerName}</p>
              <p className="text-sm text-gray-600">{accountDetails.accountNumber}</p>
            </div>

            <form onSubmit={handleFinish}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="faydaId">Fayda ID</Label>
                  <Input
                    id="faydaId"
                    type="text"
                    placeholder="e.g., 123456789012"
                    required
                    value={faydaId}
                    onChange={(e) => setFaydaId(e.target.value)}
                    maxLength={12}
                  />
                  <p className="text-xs text-gray-500">Enter your 12-digit Fayda ID number</p>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Finish"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
