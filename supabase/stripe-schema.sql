-- Stripe subscriptions backend schema for:
-- - subscriptions (no trials)
-- - "pay first, accounts later"
-- - access by email OR phone (identifier only) OR token
--
-- Recommended: run in Supabase SQL editor.
-- Note: This does not implement SMS/OTP verification (by request).

begin;

-- Optional: keep everything in public; or create a dedicated schema.
-- create schema if not exists billing;

-- 1) Customers (maps Stripe customer to email/phone)
create table if not exists public.stripe_customers (
  id uuid primary key default gen_random_uuid(),
  stripe_customer_id text not null unique,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Basic indexes for lookups
create index if not exists stripe_customers_email_idx on public.stripe_customers (lower(email));
create index if not exists stripe_customers_phone_idx on public.stripe_customers (phone);

-- 2) Subscriptions (authoritative state from webhooks)
create table if not exists public.stripe_subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_subscription_id text not null unique,
  stripe_customer_id text not null,
  status text not null,
  price_id text,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint stripe_subscriptions_customer_fk
    foreign key (stripe_customer_id)
    references public.stripe_customers (stripe_customer_id)
    on update cascade
    on delete cascade
);

create index if not exists stripe_subscriptions_customer_idx on public.stripe_subscriptions (stripe_customer_id);
create index if not exists stripe_subscriptions_status_idx on public.stripe_subscriptions (status);
create index if not exists stripe_subscriptions_period_end_idx on public.stripe_subscriptions (current_period_end);

-- 3) Access tokens (unguesable token for "no account" access)
create table if not exists public.access_tokens (
  token text primary key,
  stripe_customer_id text not null,
  email text,
  phone text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  constraint access_tokens_customer_fk
    foreign key (stripe_customer_id)
    references public.stripe_customers (stripe_customer_id)
    on update cascade
    on delete cascade
);

create index if not exists access_tokens_customer_idx on public.access_tokens (stripe_customer_id);
create index if not exists access_tokens_email_idx on public.access_tokens (lower(email));
create index if not exists access_tokens_phone_idx on public.access_tokens (phone);
create index if not exists access_tokens_active_idx on public.access_tokens (active);

-- 4) A convenience VIEW: latest subscription per customer
-- This helps your API answer "is active?" quickly.
create or replace view public.customer_latest_subscription as
select distinct on (s.stripe_customer_id)
  s.stripe_customer_id,
  s.stripe_subscription_id,
  s.status,
  s.price_id,
  s.current_period_end,
  s.cancel_at_period_end,
  s.updated_at
from public.stripe_subscriptions s
order by s.stripe_customer_id, s.updated_at desc nulls last;

-- 5) Optional: normalize email lookups with a view
create or replace view public.customer_lookup as
select
  c.stripe_customer_id,
  c.email,
  lower(c.email) as email_lc,
  c.phone
from public.stripe_customers c;

-- 6) updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at_stripe_customers on public.stripe_customers;
create trigger set_updated_at_stripe_customers
before update on public.stripe_customers
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_stripe_subscriptions on public.stripe_subscriptions;
create trigger set_updated_at_stripe_subscriptions
before update on public.stripe_subscriptions
for each row execute function public.set_updated_at();

-- 7) RLS: lock down tables (recommended since no auth; access via server using service role)
alter table public.stripe_customers enable row level security;
alter table public.stripe_subscriptions enable row level security;
alter table public.access_tokens enable row level security;

-- Remove any overly-permissive defaults by ensuring no public policies exist.
-- (Supabase starts with none; add explicitly if you later want client reads.)

commit;
