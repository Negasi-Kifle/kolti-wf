import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default async function BudgetsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: budgets } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/insights"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Budgets</h1>
          </div>
          <Link
            href="/budgets/add"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <div className="space-y-4 p-6">
        {budgets && budgets.length > 0 ? (
          budgets.map((budget) => {
            const progress = (Number(budget.spent_amount) / Number(budget.budget_amount)) * 100
            const isOverBudget = progress > 100

            return (
              <Link
                key={budget.id}
                href={`/budgets/${budget.id}`}
                className="block rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-xl">
                        {budget.category === "groceries"
                          ? "🛒"
                          : budget.category === "transport"
                            ? "🚗"
                            : budget.category === "bills"
                              ? "📄"
                              : "💰"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{budget.category}</p>
                      <p className="text-sm text-gray-500">
                        ETB {Number(budget.spent_amount).toLocaleString()} /{" "}
                        {Number(budget.budget_amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm font-medium ${isOverBudget ? "text-red-600" : "text-teal-600"}`}>
                    {progress.toFixed(0)}%
                  </p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all ${isOverBudget ? "bg-red-500" : "bg-teal-500"}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </Link>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No Budgets Yet</h3>
            <p className="mb-6 text-sm text-gray-500">Create your first budget to start tracking your spending</p>
            <Link
              href="/budgets/add"
              className="rounded-full bg-teal-500 px-6 py-3 text-sm font-medium text-white hover:bg-teal-600"
            >
              Create Budget
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
