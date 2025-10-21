"use client"

import { Send, ArrowDownLeft, QrCode, FileText } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Link href="/transfer" className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
          <Send className="h-6 w-6 text-teal-600" />
        </div>
        <span className="text-xs text-gray-700">Send</span>
      </Link>

      <Link href="/request" className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <ArrowDownLeft className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-xs text-gray-700">Request</span>
      </Link>

      <Link href="/scan" className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
          <QrCode className="h-6 w-6 text-purple-600" />
        </div>
        <span className="text-xs text-gray-700">Scan</span>
      </Link>

      <Link href="/bills" className="flex flex-col items-center gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
          <FileText className="h-6 w-6 text-orange-600" />
        </div>
        <span className="text-xs text-gray-700">Pay Bill</span>
      </Link>
    </div>
  )
}
