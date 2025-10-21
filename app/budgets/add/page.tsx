"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function AddBudgetPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error } = await supabase.from("budgets").insert({
        user_id: user.id,
        category,
        budget_amount: Number.parseFloat(amount),
        spent_amount: 0,
        period: "monthly",
      })

      if (error) throw error

      router.push("/budgets")
    } catch (error) {
      console.error("Error creating budget:", error)
      alert("Failed to create budget. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/budgets" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Create Budget</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="">Select a category</option>
            <option value="groceries">Groceries</option>
            <option value="transport">Transport</option>
            <option value="bills">Bills</option>
            <option value="dining">Dining Out</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Monthly Budget Amount (ETB)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-teal-500 py-4 text-center font-medium text-white hover:bg-teal-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Budget"}
        </button>
      </form>
    </div>
  )
}
