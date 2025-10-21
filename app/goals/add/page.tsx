"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function AddGoalPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [goalName, setGoalName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")

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

      const { error } = await supabase.from("goals").insert({
        user_id: user.id,
        goal_name: goalName,
        target_amount: Number.parseFloat(targetAmount),
        current_amount: Number.parseFloat(currentAmount) || 0,
      })

      if (error) throw error

      router.push("/goals")
    } catch (error) {
      console.error("Error creating goal:", error)
      alert("Failed to create goal. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/goals" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Create Goal</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Goal Name</label>
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g., Emergency Fund, New Car"
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Target Amount (ETB)</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="0.00"
            required
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Current Amount (ETB)</label>
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <p className="mt-1 text-xs text-gray-500">Optional: Enter how much you've already saved</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-teal-500 py-4 text-center font-medium text-white hover:bg-teal-600 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Goal"}
        </button>
      </form>
    </div>
  )
}
