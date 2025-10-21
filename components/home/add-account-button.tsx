"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

export function AddAccountButton() {
  return (
    <Link
      href="/accounts/add"
      className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
    >
      <Plus className="h-4 w-4" />
      View All
    </Link>
  )
}
