/**
 * Webhook helper — resolve an incoming Stripe event's price_id
 * and upsert the subscription in Supabase.
 *
 * Designed for a Vercel serverless function / Edge Function that
 * receives `customer.subscription.created | updated | deleted`.
 *
 * Usage (pseudo):
 *   import { handleSubscriptionEvent } from "@/lib/stripe-webhook";
 *   const result = await handleSubscriptionEvent(event, supabase);
 */

import { resolvePlan, knownPriceIds, type PricePlan } from "./stripe-prices";

// ── Types ────────────────────────────────────────────────────────────────────

export interface StripeSubscriptionPayload {
  id: string;                  // sub_xxx
  customer: string;            // cus_xxx
  status: string;              // active | past_due | canceled | …
  items: {
    data: { price: { id: string } }[];
  };
  current_period_end: number;  // unix epoch
  cancel_at_period_end: boolean;
}

export interface WebhookResult {
  ok: boolean;
  plan: PricePlan | null;
  subscriptionId: string;
  error?: string;
}

// ── Handler ──────────────────────────────────────────────────────────────────

/**
 * Process a Stripe subscription webhook event.
 *
 * @param subscription  The `event.data.object` from Stripe
 * @param supabase      An initialised Supabase client (service role)
 */
export async function handleSubscriptionEvent(
  subscription: StripeSubscriptionPayload,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
): Promise<WebhookResult> {
  const priceId = subscription.items?.data?.[0]?.price?.id ?? "";
  const plan = resolvePlan(priceId);

  if (!plan && priceId) {
    const known = knownPriceIds();
    console.warn(
      `[stripe-webhook] Unrecognised price_id "${priceId}". Known: ${known.join(", ")}`,
    );
  }

  // Upsert into stripe_subscriptions (schema from stripe-schema.sql)
  const { error } = await supabase.from("stripe_subscriptions").upsert(
    {
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      status: subscription.status,
      price_id: priceId,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (error) {
    console.error("[stripe-webhook] Supabase upsert failed:", error);
    return { ok: false, plan, subscriptionId: subscription.id, error: error.message };
  }

  return { ok: true, plan, subscriptionId: subscription.id };
}
