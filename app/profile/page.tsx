import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, Shield, Globe, LinkIcon, HelpCircle, MessageSquare, Info } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <Link href="/home" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Profile Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-teal-100">
            <svg className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{profile?.full_name || "User"}</h1>
          <p className="text-sm text-gray-500">{profile?.phone_number || user.email}</p>
        </div>

        {/* User Information */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">User Information</h2>
            <div className="space-y-3">
              <Link href="/profile/email" className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/profile/fayda" className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                    <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">{profile?.fayda_id || "Not verified"}</span>
                </div>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Settings</h2>
            <div className="space-y-1">
              <Link href="/settings/notifications" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">Notifications</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/settings/security" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">Security</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/settings/language" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">Language</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/settings/accounts" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <LinkIcon className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">Linked Accounts</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">Support</h2>
            <div className="space-y-1">
              <Link href="/support/help" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">Help Center</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/support/feedback" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">Send Feedback</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link href="/about" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Info className="h-5 w-5 text-gray-600" />
                </div>
                <span className="flex-1 text-sm text-gray-700">About Kolti</span>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <form action="/auth/logout" method="post">
          <Button
            type="submit"
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
