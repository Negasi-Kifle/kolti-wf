"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ETHIOPIAN_BANKS = [
  { name: "Commercial Bank of Ethiopia", logo: null },
  { name: "Bank of Abyssinia", logo: null },
  { name: "Dashen Bank", logo: null },
  { name: "Awash Bank", logo: null },
  { name: "United Bank", logo: null },
  { name: "Nib International Bank", logo: null },
  { name: "Wegagen Bank", logo: null },
  { name: "Cooperative Bank of Oromia", logo: null },
  { name: "Lion International Bank", logo: null },
  { name: "Zemen Bank", logo: null },
  { name: "Telebirr", logo: null },
  { name: "M-Pesa", logo: null },
  { name: "CBE Birr", logo: null },
]

export default function AddAccountPage() {
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountType, setAccountType] = useState<"bank" | "mobile_money" | "wallet">("bank")
  const [providerName, setProviderName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Store account details in sessionStorage to pass to verification page
    sessionStorage.setItem(
      "pendingAccount",
      JSON.stringify({
        accountName,
        accountNumber,
        accountType,
        providerName,
      }),
    )

    router.push("/accounts/verify")
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
            <CardTitle>Link New Account</CardTitle>
            <CardDescription>Add a bank account or mobile wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProceed}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={accountType} onValueChange={(value: any) => setAccountType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Account</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="providerName">Provider</Label>
                  <Select value={providerName} onValueChange={setProviderName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {ETHIOPIAN_BANKS.map((bank) => (
                        <SelectItem key={bank.name} value={bank.name}>
                          {bank.name}
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
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="Enter account number"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                  Proceed
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
