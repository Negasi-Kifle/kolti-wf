"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface BalanceCardProps {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm opacity-90">Total Balance</p>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="rounded-full p-1 hover:bg-white/20"
          aria-label={showBalance ? "Hide balance" : "Show balance"}
        >
          {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <div className="mb-2">
        {showBalance ? (
          <h1 className="text-4xl font-bold">ETB {balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h1>
        ) : (
          <h1 className="text-4xl font-bold">ETB ••••••</h1>
        )}
      </div>

      <p className="text-xs opacity-75">Updated just now</p>
    </div>
  )
}
