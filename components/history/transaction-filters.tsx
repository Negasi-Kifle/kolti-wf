"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { LinkedAccount } from "@/lib/types"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface TransactionFiltersProps {
  accounts: LinkedAccount[]
  onFilterChange?: (filters: { dateRange: string; category: string; account: string }) => void
}

export function TransactionFilters({ accounts, onFilterChange }: TransactionFiltersProps) {
  const [dateRange, setDateRange] = useState("all")
  const [category, setCategory] = useState("all")
  const [accountFilter, setAccountFilter] = useState("all")

  const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    onFilterChange?.({ dateRange: value, category, account: accountFilter })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onFilterChange?.({ dateRange, category: value, account: accountFilter })
  }

  const handleAccountChange = (value: string) => {
    setAccountFilter(value)
    onFilterChange?.({ dateRange, category, account: value })
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {/* Date Range Filter */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {dateRange === "all"
              ? "Date Range"
              : dateRange === "today"
                ? "Today"
                : dateRange === "week"
                  ? "This Week"
                  : dateRange === "month"
                    ? "This Month"
                    : "This Year"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select Date Range</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {[
              { value: "all", label: "All Time" },
              { value: "today", label: "Today" },
              { value: "week", label: "This Week" },
              { value: "month", label: "This Month" },
              { value: "year", label: "This Year" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleDateRangeChange(option.value)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  dateRange === option.value ? "bg-teal-50 text-teal-700 font-medium" : "hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Category Filter */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {category === "all" ? "Category" : category.charAt(0).toUpperCase() + category.slice(1)}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select Category</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {[
              { value: "all", label: "All Categories" },
              { value: "groceries", label: "Groceries" },
              { value: "transport", label: "Transport" },
              { value: "bills", label: "Bills" },
              { value: "dining", label: "Dining Out" },
              { value: "shopping", label: "Shopping" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleCategoryChange(option.value)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  category === option.value ? "bg-teal-50 text-teal-700 font-medium" : "hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Account Filter */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {accountFilter === "all"
              ? "Account"
              : accounts.find((a) => a.id === accountFilter)?.account_name || "Account"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select Account</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            <button
              onClick={() => handleAccountChange("all")}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                accountFilter === "all" ? "bg-teal-50 text-teal-700 font-medium" : "hover:bg-gray-50"
              }`}
            >
              All Accounts
            </button>
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleAccountChange(account.id)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  accountFilter === account.id ? "bg-teal-50 text-teal-700 font-medium" : "hover:bg-gray-50"
                }`}
              >
                {account.account_name}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
