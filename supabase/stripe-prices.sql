-- Stripe price definitions (run AFTER stripe-schema.sql)
-- Replace the placeholder price IDs with the real ones from Stripe Dashboard.
--
-- price_6mo  → month × 6
-- price_12mo → month × 12 (annual)

begin;

-- Helper table to keep a local copy of recognised prices
create table if not exists public.stripe_prices (
  price_id text primary key,
  plan_slug text not null unique,        -- '6mo' | '12mo'
  display_name text not null,
  interval text not null,                -- 'month' | 'year'
  interval_count int not null default 1,
  unit_amount int,                       -- price in cents (e.g. 4999 = $49.99)
  currency text not null default 'usd',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Seed the two recurring prices
-- ⚠️  Replace 'price_PLACEHOLDER_6MO' / 'price_PLACEHOLDER_12MO'
--    with real Stripe price IDs after creating them.
insert into public.stripe_prices (price_id, plan_slug, display_name, interval, interval_count, unit_amount)
values
  ('price_PLACEHOLDER_6MO',  '6mo',  '6-Month Plan',  'month', 6,  null),
  ('price_PLACEHOLDER_12MO', '12mo', '12-Month Plan', 'month', 12, null)
on conflict (price_id) do nothing;

-- RLS (same pattern as other tables — server-only via service role)
alter table public.stripe_prices enable row level security;

commit;
