-- Create transactions table
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references public.linked_accounts(id) on delete set null,
  transaction_type text not null check (transaction_type in ('debit', 'credit', 'transfer')),
  amount numeric(15, 2) not null,
  currency text default 'ETB',
  category text,
  description text,
  recipient_name text,
  recipient_account text,
  status text default 'completed' check (status in ('pending', 'completed', 'failed')),
  transaction_date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.transactions enable row level security;

-- RLS Policies for transactions
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Create indexes for faster queries
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_account_id_idx on public.transactions(account_id);
create index if not exists transactions_date_idx on public.transactions(transaction_date desc);
create index if not exists transactions_category_idx on public.transactions(category);
