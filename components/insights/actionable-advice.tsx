"use client"

import { PiggyBank, TrendingUp, GraduationCap, FileText } from "lucide-react"
import Link from "next/link"

export function ActionableAdvice() {
  const insights = [
    {
      id: 1,
      type: "savings",
      icon: PiggyBank,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Savings Recommendation",
      description: "You are close to your 'Emergency Fund' goal. Consider setting up a recurring transfer.",
      actionText: "See Details",
      actionUrl: "/goals",
    },
    {
      id: 2,
      type: "market_trend",
      icon: TrendingUp,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      title: "Market Trend: Inflation Watch",
      description: "The Birr has weakened against the dollar. Here's what that means for you.",
      actionText: "Learn More",
      actionUrl: "/insights/market",
    },
    {
      id: 3,
      type: "educational",
      icon: GraduationCap,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Educational Content",
      description: "Learn more about budgeting basics and understanding inflation in Ethiopia.",
      actionText: "Start Learning",
      actionUrl: "/learn",
    },
    {
      id: 4,
      type: "bill_reminder",
      icon: FileText,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Upcoming Bill",
      description: "Ethio Telecom bill due on Oct 25th.",
      actionText: "Pay Now",
      actionUrl: "/bills",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Actionable Advice</h2>

      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon

          return (
            <div key={insight.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${insight.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${insight.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{insight.description}</p>
                  <Link
                    href={insight.actionUrl}
                    className="mt-2 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    {insight.actionText} →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
