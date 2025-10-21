import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BottomNav } from "@/components/layout/bottom-nav"
import { SpendingSnapshot } from "@/components/insights/spending-snapshot"
import { BudgetList } from "@/components/insights/budget-list"
import { SpendingTrend } from "@/components/insights/spending-trend"
import { BudgetAlert } from "@/components/insights/budget-alert"
import { ActionableAdvice } from "@/components/insights/actionable-advice"

export default async function InsightsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch budgets
  const { data: budgets } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch transactions for current month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: monthTransactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .gte("transaction_date", startOfMonth.toISOString())
    .eq("transaction_type", "debit")

  // Calculate spending by category
  const spendingByCategory = monthTransactions?.reduce(
    (acc, transaction) => {
      const category = transaction.category || "other"
      acc[category] = (acc[category] || 0) + Number(transaction.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const totalSpent = Object.values(spendingByCategory || {}).reduce((sum, amount) => sum + amount, 0)

  // Fetch last 7 days transactions for trend
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: weekTransactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .gte("transaction_date", sevenDaysAgo.toISOString())
    .eq("transaction_type", "debit")
    .order("transaction_date", { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
              <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="font-semibold text-gray-900">{profile?.full_name || "Samuel"}</p>
            </div>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>

        {/* Time Period Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="flex-shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200">
            Day
          </button>
          <button className="flex-shrink-0 rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm">
            Week
          </button>
          <button className="flex-shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200">
            Month
          </button>
          <button className="flex-shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border border-gray-200">
            Year
          </button>
        </div>

        {/* Spending Snapshot */}
        <SpendingSnapshot totalSpent={totalSpent} spendingByCategory={spendingByCategory || {}} />

        {/* Budget Alert */}
        <BudgetAlert />

        {/* Budgets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Budgets</h2>
            <a href="/budgets" className="text-sm text-teal-600">
              Set/Edit Budgets
            </a>
          </div>
          <BudgetList budgets={budgets || []} />
        </div>

        {/* Spending Trend */}
        <SpendingTrend transactions={weekTransactions || []} />

        {/* Actionable Advice */}
        <ActionableAdvice />
      </div>

      <BottomNav />
    </div>
  )
}
