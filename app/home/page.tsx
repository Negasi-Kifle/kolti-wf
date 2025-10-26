import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { HomeHeader } from "@/components/home/home-header"
import { BalanceCard } from "@/components/home/balance-card"
import { QuickActions } from "@/components/home/quick-actions"
import { LinkedAccountsList } from "@/components/home/linked-accounts-list"
import { RecentTransactionsList } from "@/components/home/recent-transactions-list"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  let user = null
  let profile = null
  let accounts: any[] = []
  let transactions: any[] = []

  try {
    const supabase = await createClient()

    const { data: userData } = await supabase.auth.getUser()
    user = userData.user

    if (!user) {
      redirect("/auth/login")
    }

    // Fetch user profile
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    profile = profileData

    // Fetch linked accounts
    const { data: accountsData } = await supabase
      .from("linked_accounts")
      .select("*")
      .eq("user_id", user.id)
      .order("is_primary", { ascending: false })
    accounts = accountsData || []

    // Fetch recent transactions
    const { data: transactionsData } = await supabase
      .from("transactions")
      .select("*, linked_accounts(account_name, provider_name)")
      .eq("user_id", user.id)
      .order("transaction_date", { ascending: false })
      .limit(5)
    transactions = transactionsData || []
  } catch (error) {
    console.error("[v0] Error loading home page data:", error)
    // If Supabase is not configured, redirect to landing page
    redirect("/")
  }

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0)

  // Check if user has no data (new user)
  const hasNoData = accounts.length === 0

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <HomeHeader userName={profile?.full_name || "User"} />

      <div className="space-y-6 p-6">
        {hasNoData && (
          <div className="rounded-xl bg-teal-50 p-4">
            <p className="mb-2 text-sm font-medium text-teal-900">Welcome to Kolti!</p>
            <p className="mb-3 text-xs text-teal-700">Get started by adding sample data to explore the app features.</p>
            <form action="/api/seed-data" method="POST">
              <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700">
                Load Sample Data
              </Button>
            </form>
          </div>
        )}

        <BalanceCard balance={totalBalance} />

        <QuickActions />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Linked Accounts</h2>
            <Link href="/accounts/add" className="text-sm font-medium text-teal-600">
              + Add Account
            </Link>
          </div>
          <LinkedAccountsList accounts={accounts} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <a href="/history" className="text-sm text-teal-600">
              View All
            </a>
          </div>
          <RecentTransactionsList transactions={transactions} />
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
