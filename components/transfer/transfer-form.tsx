"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { LinkedAccount } from "@/lib/types"
import { UserCircle2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface TransferFormProps {
  accounts: LinkedAccount[]
  recentContacts: Array<{ name: string | null; account: string | null }>
  userId: string
}

const ETHIOPIAN_PROVIDERS = [
  "Commercial Bank of Ethiopia",
  "Awash Bank",
  "Dashen Bank",
  "Bank of Abyssinia",
  "Wegagen Bank",
  "United Bank",
  "Nib International Bank",
  "Cooperative Bank of Oromia",
  "Lion International Bank",
  "Oromia Bank",
  "Zemen Bank",
  "Bunna Bank",
  "Berhan Bank",
  "Abay Bank",
  "Addis International Bank",
  "Debub Global Bank",
  "Enat Bank",
  "Goh Betoch Bank",
  "Hijra Bank",
  "Shabelle Bank",
  "Siinqee Bank",
  "Tsedey Bank",
  "Telebirr",
  "M-Pesa",
  "HelloCash",
  "Amole",
]

export function TransferForm({ accounts, recentContacts, userId }: TransferFormProps) {
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [recipientBank, setRecipientBank] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const router = useRouter()

  const selectedAccount = accounts.find((acc) => acc.id === fromAccount)
  const maxAmount = selectedAccount?.balance || 0

  const handleContactSelect = (contact: { name: string | null; account: string | null }) => {
    if (contact.name) setRecipientName(contact.name)
    if (contact.account) setToAccount(contact.account)
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const transferAmount = Number.parseFloat(amount)

      if (transferAmount <= 0) {
        throw new Error("Amount must be greater than 0")
      }

      if (!fromAccount) {
        throw new Error("Please select an account to transfer from")
      }

      if (transferAmount > 10000 && transferAmount > maxAmount) {
        throw new Error("Insufficient balance")
      }

      if (!recipientBank) {
        throw new Error("Please select recipient's bank or wallet")
      }

      setShowConfirmDialog(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    }
  }

  const handleConfirmTransfer = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setConfirmError(null)

    try {
      // Verify password (in production, this would verify against actual user password)
      if (!password || password.length < 6) {
        throw new Error("Please enter a valid password")
      }

      const transferAmount = Number.parseFloat(amount)

      // Create transaction record
      const { error: transactionError } = await supabase.from("transactions").insert({
        user_id: userId,
        account_id: fromAccount,
        transaction_type: "transfer",
        amount: transferAmount,
        currency: "ETB",
        description: note || `Transfer to ${recipientName || toAccount}`,
        recipient_name: recipientName || null,
        recipient_account: toAccount,
        status: "completed",
      })

      if (transactionError) throw transactionError

      // Update account balance
      const { error: updateError } = await supabase
        .from("linked_accounts")
        .update({
          balance: maxAmount - transferAmount,
        })
        .eq("id", fromAccount)

      if (updateError) throw updateError

      router.push("/transfer/success")
    } catch (error: unknown) {
      setConfirmError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleTransfer}>
            <div className="space-y-6">
              {/* From Account */}
              <div className="space-y-2">
                <Label htmlFor="fromAccount">From</Label>
                <Select value={fromAccount} onValueChange={setFromAccount}>
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex items-center justify-between gap-4">
                          <span>
                            {account.provider_name} - ****{account.account_number.slice(-4)}
                          </span>
                          <span className="text-sm text-gray-500">ETB {Number(account.balance).toLocaleString()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientBank">Recipient Bank/Wallet</Label>
                <Select value={recipientBank} onValueChange={setRecipientBank}>
                  <SelectTrigger className="h-14">
                    <SelectValue placeholder="Select bank or wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {ETHIOPIAN_PROVIDERS.map((provider) => (
                      <SelectItem key={provider} value={provider}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* To Account */}
              <div className="space-y-2">
                <Label htmlFor="toAccount">Account Number/Phone</Label>
                <div className="relative">
                  <UserCircle2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="toAccount"
                    type="text"
                    placeholder="Enter phone number or bank account"
                    value={toAccount}
                    onChange={(e) => setToAccount(e.target.value)}
                    className="h-14 pl-10"
                    required
                  />
                </div>
              </div>

              {/* Recent Contacts */}
              {recentContacts.length > 0 && (
                <div className="space-y-2">
                  <Label>Recent Contacts</Label>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {recentContacts.map((contact, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleContactSelect(contact)}
                        className="flex flex-shrink-0 flex-col items-center gap-2"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                          <UserCircle2 className="h-8 w-8 text-gray-600" />
                        </div>
                        <span className="max-w-[60px] truncate text-xs text-gray-700">{contact.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipient Name */}
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name (Optional)</Label>
                <Input
                  id="recipientName"
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="h-14"
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-700">
                    ETB
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-14 pl-16 text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setAmount(maxAmount.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                  >
                    Max
                  </button>
                </div>
                {selectedAccount && (
                  <p className="text-xs text-gray-500">
                    Available: ETB {Number(selectedAccount.balance).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  type="text"
                  placeholder="e.g. For lunch"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="h-14"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="h-14 w-full bg-teal-500 text-lg hover:bg-teal-600">
                Transfer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-teal-600" />
              Confirm Transfer
            </DialogTitle>
            <DialogDescription>
              Enter your password to confirm the transfer of ETB {Number.parseFloat(amount || "0").toLocaleString()} to{" "}
              {recipientName || toAccount}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            {confirmError && <p className="text-sm text-red-500">{confirmError}</p>}
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleConfirmTransfer}
              disabled={isLoading}
              className="h-12 w-full bg-teal-500 hover:bg-teal-600"
            >
              {isLoading ? "Processing..." : "Confirm Transfer"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowConfirmDialog(false)
                setPassword("")
                setConfirmError(null)
              }}
              className="h-12 w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
