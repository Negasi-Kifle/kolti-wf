-- Create linked_accounts table for bank accounts and wallets
create table if not exists public.linked_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_name text not null,
  account_number text not null,
  account_type text not null check (account_type in ('bank', 'mobile_money', 'wallet')),
  provider_name text not null,
  provider_logo text,
  balance numeric(15, 2) default 0,
  currency text default 'ETB',
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.linked_accounts enable row level security;

-- RLS Policies for linked_accounts
create policy "Users can view own accounts"
  on public.linked_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own accounts"
  on public.linked_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own accounts"
  on public.linked_accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete own accounts"
  on public.linked_accounts for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists linked_accounts_user_id_idx on public.linked_accounts(user_id);
