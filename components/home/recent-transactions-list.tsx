"use client"

import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import type { Transaction } from "@/lib/types"

interface RecentTransactionsListProps {
  transactions: (Transaction & {
    linked_accounts?: {
      account_name: string
      provider_name: string
    } | null
  })[]
}

export function RecentTransactionsList({ transactions }: RecentTransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500">No transactions yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                transaction.transaction_type === "credit" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {transaction.transaction_type === "credit" ? (
                <ArrowDownLeft className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {transaction.description || transaction.recipient_name || "Transaction"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(transaction.transaction_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p
              className={`font-semibold ${
                transaction.transaction_type === "credit" ? "text-green-600" : "text-red-600"
              }`}
            >
              {transaction.transaction_type === "credit" ? "+" : "-"} {transaction.currency}{" "}
              {Number(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
