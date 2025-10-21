import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ArrowLeft, Bell, TrendingUp, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"

export default async function NotificationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch insights/notifications
  const { data: insights } = await supabase
    .from("insights")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const notifications = [
    {
      id: 1,
      type: "transaction",
      icon: Bell,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Payment Received",
      description: "You received ETB 2,500 from Hana Bekele",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      type: "budget",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Budget Alert",
      description: "You've exceeded your Dining Out budget by 20%",
      time: "5 hours ago",
      isRead: false,
    },
    {
      id: 3,
      type: "insight",
      icon: TrendingUp,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Savings Milestone",
      description: "You're 75% towards your Emergency Fund goal!",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: 4,
      type: "info",
      icon: Info,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "New Feature",
      description: "Check out our new spending insights dashboard",
      time: "2 days ago",
      isRead: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <Link href="/home" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500">Stay updated with your financial activity</p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon

            return (
              <div
                key={notification.id}
                className={`rounded-xl bg-white p-4 shadow-sm ${!notification.isRead ? "border-l-4 border-teal-500" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${notification.iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${notification.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      {!notification.isRead && <div className="h-2 w-2 rounded-full bg-teal-500" />}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                    <p className="mt-2 text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {notifications.length === 0 && (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900">No notifications</p>
            <p className="mt-1 text-xs text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}
