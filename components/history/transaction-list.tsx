"use client"

import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Car, Zap, Coffee, User } from "lucide-react"
import type { Transaction } from "@/lib/types"

interface TransactionListProps {
  transactions: (Transaction & {
    linked_accounts?: {
      account_name: string
      provider_name: string
      provider_logo: string | null
    } | null
  })[]
}

const categoryIcons: Record<string, any> = {
  groceries: ShoppingCart,
  transport: Car,
  bills: Zap,
  dining: Coffee,
  default: User,
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900">No transactions yet</p>
        <p className="mt-1 text-xs text-gray-500">Your transaction history will appear here</p>
      </div>
    )
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.transaction_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, typeof transactions>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500">
            {date === new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
              ? "Today"
              : date}
          </h3>

          <div className="space-y-2">
            {dateTransactions.map((transaction) => {
              const CategoryIcon = categoryIcons[transaction.category || "default"] || categoryIcons.default

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        transaction.transaction_type === "credit" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {transaction.category ? (
                        <CategoryIcon
                          className={`h-6 w-6 ${
                            transaction.transaction_type === "credit" ? "text-green-600" : "text-red-600"
                          }`}
                        />
                      ) : transaction.transaction_type === "credit" ? (
                        <ArrowDownLeft className="h-6 w-6 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description || transaction.recipient_name || "Transaction"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.transaction_date).toLocaleTimeString("en-US", {
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
                    {transaction.linked_accounts && (
                      <p className="text-xs text-gray-500">{transaction.linked_accounts.provider_name}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
