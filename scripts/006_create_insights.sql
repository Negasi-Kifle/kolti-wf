-- Create insights table for personalized recommendations
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  insight_type text not null check (insight_type in ('savings', 'spending', 'budget_alert', 'market_trend', 'educational', 'bill_reminder')),
  title text not null,
  description text not null,
  action_text text,
  action_url text,
  icon text,
  priority text default 'normal' check (priority in ('low', 'normal', 'high')),
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.insights enable row level security;

-- RLS Policies for insights
create policy "Users can view own insights"
  on public.insights for select
  using (auth.uid() = user_id);

create policy "Users can insert own insights"
  on public.insights for insert
  with check (auth.uid() = user_id);

create policy "Users can update own insights"
  on public.insights for update
  using (auth.uid() = user_id);

create policy "Users can delete own insights"
  on public.insights for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists insights_user_id_idx on public.insights(user_id);
create index if not exists insights_type_idx on public.insights(insight_type);
