"use client"

import type { Transaction } from "@/lib/types"
import { TrendingUp } from "lucide-react"

interface SpendingTrendProps {
  transactions: Transaction[]
}

export function SpendingTrend({ transactions }: SpendingTrendProps) {
  // Group transactions by day
  const dailySpending = transactions.reduce(
    (acc, transaction) => {
      const day = new Date(transaction.transaction_date).toLocaleDateString("en-US", { weekday: "short" })
      acc[day] = (acc[day] || 0) + Number(transaction.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const values = days.map((day) => dailySpending[day] || 0)
  const maxValue = Math.max(...values, 1)

  const totalThisWeek = values.reduce((sum, val) => sum + val, 0)
  const avgDaily = totalThisWeek / 7

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Spending Trend</h3>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-900">ETB {totalThisWeek.toLocaleString()}</p>
          </div>
          <p className="text-sm text-green-600">This Week +5% from last week</p>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
          <TrendingUp className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Chart */}
      <div className="relative h-32">
        <svg viewBox="0 0 350 128" className="h-full w-full" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="350" y2="0" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="32" x2="350" y2="32" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="64" x2="350" y2="64" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="96" x2="350" y2="96" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1="128" x2="350" y2="128" stroke="#e5e7eb" strokeWidth="1" />

          {/* Line chart */}
          <polyline
            points={values
              .map((value, index) => {
                const x = (index / (values.length - 1)) * 350
                const y = 128 - (value / maxValue) * 128
                return `${x},${y}`
              })
              .join(" ")}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Area fill */}
          <polygon
            points={`0,128 ${values
              .map((value, index) => {
                const x = (index / (values.length - 1)) * 350
                const y = 128 - (value / maxValue) * 128
                return `${x},${y}`
              })
              .join(" ")} 350,128`}
            fill="url(#gradient)"
            opacity="0.2"
          />

          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        {days.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <button className="w-full rounded-lg bg-teal-500 py-3 text-sm font-medium text-white hover:bg-teal-600">
          View All Transactions
        </button>
      </div>
    </div>
  )
}
