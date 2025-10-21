"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { LinkedAccount } from "@/lib/types"

interface LinkedAccountsListProps {
  accounts: LinkedAccount[]
}

export function LinkedAccountsList({ accounts }: LinkedAccountsListProps) {
  if (accounts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500">No linked accounts yet</p>
        <p className="mt-1 text-xs text-gray-400">Add your first account to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <Link
          key={account.id}
          href={`/accounts/${account.id}`}
          className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              {account.provider_logo ? (
                <img
                  src={account.provider_logo || "/placeholder.svg"}
                  alt={account.provider_name}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{account.account_name}</p>
              <p className="text-sm text-gray-500">
                {account.provider_name} - ****{account.account_number.slice(-4)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {account.currency} {Number(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </Link>
      ))}
    </div>
  )
}
