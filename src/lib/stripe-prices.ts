/**
 * Stripe recurring price configuration.
 *
 * After creating the prices in Stripe (Dashboard or API), paste the
 * real `price_xxx` IDs into the env vars below.
 *
 * Stripe price definitions (for reference / seed script):
 *   price_6mo  → interval: "month", interval_count: 6
 *   price_12mo → interval: "month", interval_count: 12   (i.e. annual)
 */

// ---------------------------------------------------------------------------
// Price IDs — set via env vars so they stay out of source control
// ---------------------------------------------------------------------------
export const PRICE_IDS = {
  /** 6-month recurring */
  PRICE_6MO: import.meta.env.VITE_STRIPE_PRICE_6MO ?? "",
  /** 12-month (annual) recurring */
  PRICE_12MO: import.meta.env.VITE_STRIPE_PRICE_12MO ?? "",
} as const;

export type PricePlan = "6mo" | "12mo";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map a Stripe price_id coming from a webhook / checkout to a plan name. */
export function resolvePlan(priceId: string): PricePlan | null {
  switch (priceId) {
    case PRICE_IDS.PRICE_6MO:
      return "6mo";
    case PRICE_IDS.PRICE_12MO:
      return "12mo";
    default:
      return null;
  }
}

/** Return the Stripe price_id for a given plan slug. */
export function priceIdForPlan(plan: PricePlan): string {
  switch (plan) {
    case "6mo":
      return PRICE_IDS.PRICE_6MO;
    case "12mo":
      return PRICE_IDS.PRICE_12MO;
  }
}

/** Human-readable label for UI / logs. */
export function planLabel(plan: PricePlan): string {
  switch (plan) {
    case "6mo":
      return "6-Month Plan";
    case "12mo":
      return "12-Month Plan";
  }
}

/** All recognised price IDs (useful for webhook validation). */
export function knownPriceIds(): string[] {
  return Object.values(PRICE_IDS).filter(Boolean);
}
