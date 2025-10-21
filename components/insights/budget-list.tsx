"use client"

import type { Budget } from "@/lib/types"
import { ShoppingCart, Car, Zap } from "lucide-react"

interface BudgetListProps {
  budgets: Budget[]
}

const categoryIcons: Record<string, any> = {
  groceries: ShoppingCart,
  transport: Car,
  bills: Zap,
}

const categoryColors: Record<string, { bg: string; progress: string }> = {
  groceries: { bg: "bg-yellow-100", progress: "bg-yellow-500" },
  transport: { bg: "bg-purple-100", progress: "bg-purple-500" },
  bills: { bg: "bg-red-100", progress: "bg-red-500" },
}

export function BudgetList({ budgets }: BudgetListProps) {
  if (budgets.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-gray-500">No budgets set yet</p>
        <p className="mt-1 text-xs text-gray-400">Create your first budget to track spending</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const Icon = categoryIcons[budget.category] || ShoppingCart
        const colors = categoryColors[budget.category] || { bg: "bg-gray-100", progress: "bg-gray-500" }
        const percentage = (budget.spent / budget.amount) * 100
        const isOverBudget = percentage > 100

        return (
          <div key={budget.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.bg}`}>
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium capitalize text-gray-900">{budget.category}</p>
                  <p className="text-xs text-gray-500">
                    ETB {budget.spent.toLocaleString()} / {budget.amount.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-medium ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                ETB {budget.spent.toLocaleString()} / {budget.amount.toLocaleString()}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full transition-all duration-300 ${isOverBudget ? "bg-red-500" : colors.progress}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
