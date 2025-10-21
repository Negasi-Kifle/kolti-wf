"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const ETHIOPIAN_BANKS = [
  "Commercial Bank of Ethiopia",
  "Awash Bank",
  "Dashen Bank",
  "Bank of Abyssinia",
  "Wegagen Bank",
  "United Bank",
  "Nib International Bank",
  "Cooperative Bank of Oromia",
  "Lion International Bank",
  "Oromia International Bank",
  "Zemen Bank",
  "Bunna International Bank",
  "Berhan International Bank",
  "Abay Bank",
  "Addis International Bank",
  "Debub Global Bank",
  "Enat Bank",
  "Shabelle Bank",
  "Telebirr",
  "M-Pesa",
  "HelloCash",
  "Amole",
]

export default function EditAccountPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountType, setAccountType] = useState<"bank" | "wallet">("bank")
  const [providerName, setProviderName] = useState("")

  useEffect(() => {
    loadAccount()
  }, [params.id])

  const loadAccount = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("linked_accounts").select("*").eq("id", params.id).single()

      if (error) throw error

      setAccountName(data.account_name)
      setAccountNumber(data.account_number)
      setAccountType(data.account_type)
      setProviderName(data.provider_name)
    } catch (error) {
      console.error("Error loading account:", error)
      setError("Failed to load account details")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!accountName || !accountNumber || !providerName) {
      setError("Please fill in all required fields")
      return
    }

    // Store update details in sessionStorage for verification
    sessionStorage.setItem(
      "pendingAccountUpdate",
      JSON.stringify({
        id: params.id,
        accountName,
        accountNumber,
        accountType,
        providerName,
      }),
    )

    // Navigate to verification page
    router.push(`/accounts/${params.id}/verify`)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this account?")) {
      return
    }

    setIsDeleting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("linked_accounts").delete().eq("id", params.id)

      if (error) throw error

      router.push("/home")
    } catch (error) {
      console.error("Error deleting account:", error)
      setError("Failed to delete account")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <Link href="/home" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Edit Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={accountType} onValueChange={(value: "bank" | "wallet") => setAccountType(value)}>
                    <SelectTrigger id="accountType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Account</SelectItem>
                      <SelectItem value="wallet">Mobile Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="providerName">{accountType === "bank" ? "Bank Name" : "Wallet Provider"}</Label>
                  <Select value={providerName} onValueChange={setProviderName}>
                    <SelectTrigger id="providerName">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {ETHIOPIAN_BANKS.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    type="text"
                    placeholder="e.g., My Savings Account"
                    required
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">{accountType === "bank" ? "Account Number" : "Phone Number"}</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder={accountType === "bank" ? "e.g., 1234567890" : "e.g., +251912345678"}
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Proceed"}
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  className="w-full"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? "Removing..." : "Remove Account"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
