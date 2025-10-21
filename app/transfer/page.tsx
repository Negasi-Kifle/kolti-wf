import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TransferForm } from "@/components/transfer/transfer-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function TransferPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch linked accounts
  const { data: accounts } = await supabase
    .from("linked_accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("is_primary", { ascending: false })

  // Fetch recent contacts (people user has sent money to)
  const { data: recentTransactions } = await supabase
    .from("transactions")
    .select("recipient_name, recipient_account")
    .eq("user_id", user.id)
    .eq("transaction_type", "transfer")
    .not("recipient_name", "is", null)
    .order("transaction_date", { ascending: false })
    .limit(10)

  // Get unique contacts
  const uniqueContacts = Array.from(
    new Map(
      recentTransactions?.map((t) => [t.recipient_account, { name: t.recipient_name, account: t.recipient_account }]),
    ).values(),
  ).slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-md">
        <Link href="/home" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-900">Secure Transfer</h1>
        </div>

        <TransferForm accounts={accounts || []} recentContacts={uniqueContacts} userId={user.id} />
      </div>
    </div>
  )
}
