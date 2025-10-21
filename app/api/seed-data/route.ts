import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Create sample linked accounts
    const { data: accounts, error: accountsError } = await supabase
      .from("linked_accounts")
      .insert([
        {
          user_id: user.id,
          account_name: "Commercial Bank of Ethiopia - ****1234",
          account_number: "1000123456",
          account_type: "bank",
          provider_name: "Commercial Bank of Ethiopia",
          balance: 15234.5,
          currency: "ETB",
          is_primary: true,
        },
        {
          user_id: user.id,
          account_name: "Dashen Bank - ****2345",
          account_number: "2000234567",
          account_type: "bank",
          provider_name: "Dashen Bank",
          balance: 8500.0,
          currency: "ETB",
          is_primary: false,
        },
        {
          user_id: user.id,
          account_name: "Telebirr",
          account_number: "0912345678",
          account_type: "mobile_money",
          provider_name: "Telebirr",
          balance: 1200.75,
          currency: "ETB",
          is_primary: false,
        },
      ])
      .select()

    if (accountsError) throw accountsError

    const accountId = accounts[0].id

    // Create sample transactions
    const now = new Date()
    const { error: transactionsError } = await supabase.from("transactions").insert([
      {
        user_id: user.id,
        account_id: accountId,
        transaction_type: "debit",
        amount: 250.0,
        currency: "ETB",
        category: "groceries",
        description: "Sheger Supermarket",
        status: "completed",
        transaction_date: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: user.id,
        account_id: accountId,
        transaction_type: "credit",
        amount: 2500.0,
        currency: "ETB",
        description: "Received from Hana Bekele",
        recipient_name: "Hana Bekele",
        status: "completed",
        transaction_date: new Date(now.getTime() - 26 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: user.id,
        account_id: accountId,
        transaction_type: "debit",
        amount: 150.0,
        currency: "ETB",
        category: "dining",
        description: "Kaldi's Coffee",
        status: "completed",
        transaction_date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: user.id,
        account_id: accountId,
        transaction_type: "debit",
        amount: 500.0,
        currency: "ETB",
        category: "bills",
        description: "Ethio Telecom Bill",
        status: "completed",
        transaction_date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: user.id,
        account_id: accountId,
        transaction_type: "debit",
        amount: 1200.0,
        currency: "ETB",
        category: "transport",
        description: "Total Gas Station",
        status: "completed",
        transaction_date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ])

    if (transactionsError) throw transactionsError

    // Create sample budgets
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    const endOfMonth = new Date(startOfMonth)
    endOfMonth.setMonth(endOfMonth.getMonth() + 1)

    const { error: budgetsError } = await supabase.from("budgets").insert([
      {
        user_id: user.id,
        category: "groceries",
        amount: 1000.0,
        spent: 800.0,
        period: "monthly",
        start_date: startOfMonth.toISOString(),
        end_date: endOfMonth.toISOString(),
      },
      {
        user_id: user.id,
        category: "transport",
        amount: 800.0,
        spent: 500.0,
        period: "monthly",
        start_date: startOfMonth.toISOString(),
        end_date: endOfMonth.toISOString(),
      },
      {
        user_id: user.id,
        category: "bills",
        amount: 1200.0,
        spent: 1200.0,
        period: "monthly",
        start_date: startOfMonth.toISOString(),
        end_date: endOfMonth.toISOString(),
      },
    ])

    if (budgetsError) throw budgetsError

    // Create sample goals
    const { error: goalsError } = await supabase.from("goals").insert([
      {
        user_id: user.id,
        title: "Emergency Fund",
        target_amount: 10000.0,
        current_amount: 7500.0,
        currency: "ETB",
        deadline: new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
        icon: "emergency",
        color: "#10b981",
      },
      {
        user_id: user.id,
        title: "New Car",
        target_amount: 50000.0,
        current_amount: 12000.0,
        currency: "ETB",
        deadline: new Date(now.getTime() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
        icon: "car",
        color: "#f59e0b",
      },
    ])

    if (goalsError) throw goalsError

    return NextResponse.json({ success: true, message: "Sample data created successfully" })
  } catch (error) {
    console.error("Error seeding data:", error)
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 })
  }
}
