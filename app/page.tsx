import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LandingPage() {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    console.warn("[v0] Error checking user authentication:", error)
  }

  if (user) {
    redirect("/home")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-white p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-500">
            <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">kolti</h1>
          <p className="text-lg text-gray-600">የኢትዮጵያን ይፋዊ</p>
          <p className="text-base text-gray-500">All your accounts in one place</p>
        </div>

        {/* Features */}
        <div className="space-y-4 py-8">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
              <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">Aggregate all bank accounts & wallets</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
              <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">Track spending & manage budgets</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
              <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">Get personalized financial insights</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-teal-500 py-6 text-lg hover:bg-teal-600">
            <Link href="/auth/sign-up">Create your Kolti Account</Link>
          </Button>
          <Button asChild variant="outline" className="w-full py-6 text-lg bg-transparent">
            <Link href="/auth/login">Already have an account? Log In</Link>
          </Button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500">
          By continuing, you agree to Kolti's{" "}
          <Link href="/terms" className="text-teal-600 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-teal-600 underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
