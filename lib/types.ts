export interface Profile {
  id: string
  full_name: string | null
  phone_number: string | null
  fayda_id: string | null
  fayda_verified: boolean
  created_at: string
  updated_at: string
}

export interface LinkedAccount {
  id: string
  user_id: string
  account_name: string
  account_number: string
  account_type: "bank" | "mobile_money" | "wallet"
  provider_name: string
  provider_logo: string | null
  balance: number
  currency: string
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  account_id: string | null
  transaction_type: "debit" | "credit" | "transfer"
  amount: number
  currency: string
  category: string | null
  description: string | null
  recipient_name: string | null
  recipient_account: string | null
  status: "pending" | "completed" | "failed"
  transaction_date: string
  created_at: string
}

export interface Budget {
  id: string
  user_id: string
  category: string
  amount: number
  spent: number
  period: "weekly" | "monthly" | "yearly"
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface Goal {
  id: string
  user_id: string
  title: string
  target_amount: number
  current_amount: number
  currency: string
  deadline: string | null
  icon: string | null
  color: string | null
  created_at: string
  updated_at: string
}

export interface Insight {
  id: string
  user_id: string
  insight_type: "savings" | "spending" | "budget_alert" | "market_trend" | "educational" | "bill_reminder"
  title: string
  description: string
  action_text: string | null
  action_url: string | null
  icon: string | null
  priority: "low" | "normal" | "high"
  is_read: boolean
  created_at: string
}
