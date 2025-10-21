import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BillsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 flex items-center gap-4 bg-white p-4 shadow-sm">
        <Link href="/home">
          <ArrowLeft className="h-6 w-6 text-gray-900" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Pay Bill</h1>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
            <svg className="h-12 w-12 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Coming Soon</h2>
          <p className="mb-6 text-gray-600">
            Bill payment feature is currently under development and will be available soon.
          </p>
          <Link href="/home" className="inline-block rounded-lg bg-teal-600 px-6 py-3 text-white hover:bg-teal-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
