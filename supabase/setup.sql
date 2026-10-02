-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.
create table if not exists public.transactions (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  type text not null check (type in ('income', 'expense', 'transfer')),
  amount numeric(12, 2) not null,
  date date not null,
  description text not null default '',
  merchant text not null default '',
  category text not null default '',
  account text not null default '',
  payment_method text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists transactions_user_date_idx on public.transactions (user_id, date desc);

-- Row-level security: each signed-in user can only see and change their own rows.
alter table public.transactions enable row level security;

drop policy if exists "Users read own transactions" on public.transactions;
create policy "Users read own transactions" on public.transactions
  for select using (auth.uid() = user_id);

drop policy if exists "Users insert own transactions" on public.transactions;
create policy "Users insert own transactions" on public.transactions
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users update own transactions" on public.transactions;
create policy "Users update own transactions" on public.transactions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users delete own transactions" on public.transactions;
create policy "Users delete own transactions" on public.transactions
  for delete using (auth.uid() = user_id);
