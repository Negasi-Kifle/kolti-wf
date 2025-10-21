"use client"

import { ChevronDown } from "lucide-react"

interface SpendingSnapshotProps {
  totalSpent: number
  spendingByCategory: Record<string, number>
}

const categoryColors: Record<string, string> = {
  groceries: "#14b8a6",
  transport: "#8b5cf6",
  bills: "#ef4444",
  dining: "#f59e0b",
  shopping: "#3b82f6",
  other: "#6b7280",
}

const categoryLabels: Record<string, string> = {
  groceries: "Groceries",
  transport: "Transport",
  bills: "Bills",
  dining: "Dining Out",
  shopping: "Shopping",
  other: "Other",
}

export function SpendingSnapshot({ totalSpent, spendingByCategory }: SpendingSnapshotProps) {
  const categories = Object.entries(spendingByCategory)
  const total = categories.reduce((sum, [, amount]) => sum + amount, 0)

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
        <button className="flex items-center gap-1 text-sm text-gray-600">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Donut Chart */}
      <div className="relative mx-auto mb-6 h-48 w-48">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 transform">
          {categories.map(([category, amount], index) => {
            const percentage = (amount / total) * 100
            const previousPercentages = categories
              .slice(0, index)
              .reduce((sum, [, amt]) => sum + (amt / total) * 100, 0)

            return (
              <circle
                key={category}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={categoryColors[category] || categoryColors.other}
                strokeWidth="20"
                strokeDasharray={`${percentage * 2.51} ${251 - percentage * 2.51}`}
                strokeDashoffset={-previousPercentages * 2.51}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-gray-900">ETB {totalSpent.toLocaleString()}</p>
          <p className="text-xs text-green-600">This month +12%</p>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {categories.map(([category, amount]) => {
          const percentage = ((amount / total) * 100).toFixed(1)
          return (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: categoryColors[category] || categoryColors.other }}
                />
                <span className="text-sm text-gray-700">{categoryLabels[category] || category}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{percentage}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
