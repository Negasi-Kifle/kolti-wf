"use client"

import { AlertTriangle } from "lucide-react"

export function BudgetAlert() {
  return (
    <div className="rounded-xl bg-red-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-red-900">Budget Alert</h4>
          <p className="mt-1 text-sm text-red-700">
            You've spent more on 'Dining Out' this month. Consider setting a budget.
          </p>
        </div>
        <button className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200">
          Adjust Budget
        </button>
      </div>
    </div>
  )
}
