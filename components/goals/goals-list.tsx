"use client"

import type { Goal } from "@/lib/types"
import { Target, PiggyBank, Car } from "lucide-react"

interface GoalsListProps {
  goals: Goal[]
}

const goalIcons: Record<string, any> = {
  emergency: Target,
  savings: PiggyBank,
  car: Car,
}

export function GoalsList({ goals }: GoalsListProps) {
  if (goals.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Target className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-900">No goals yet</p>
        <p className="mt-1 text-xs text-gray-500">Create your first financial goal to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const Icon = goalIcons[goal.icon || ""] || Target
        const percentage = (goal.current_amount / goal.target_amount) * 100

        return (
          <div key={goal.id} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{goal.title}</p>
                  <p className="text-sm text-gray-500">
                    {goal.currency} {goal.current_amount.toLocaleString()} / {goal.target_amount.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {goal.currency} {goal.current_amount.toLocaleString()} / {goal.target_amount.toLocaleString()}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            <p className="text-xs text-gray-500">{percentage.toFixed(0)}% complete</p>
          </div>
        )
      })}
    </div>
  )
}
