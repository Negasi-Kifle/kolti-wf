"use client"

import { Bell } from "lucide-react"
import Link from "next/link"

interface HomeHeaderProps {
  userName: string
}

export function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <header className="bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Link href="/profile" className="flex items-center gap-3">
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
            <p className="font-semibold text-gray-900">{userName}</p>
          </div>
        </Link>

        <Link
          href="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Link>
      </div>
    </header>
  )
}
