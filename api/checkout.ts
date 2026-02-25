/**
 * Vercel Serverless Function — POST /api/checkout
 *
 * Creates a Stripe Checkout Session in subscription mode.
 *
 * Required env vars (set in Vercel dashboard, NOT prefixed with VITE_):
 *   STRIPE_SECRET_KEY
 *   STRIPE_PRICE_ID_6MO     – price_xxx for the 6-month plan
 *   STRIPE_PRICE_ID_12MO    – price_xxx for the 12-month plan
 *   APP_URL                  – e.g. https://bram-app.vercel.app
 *
 * Request body (JSON):
 *   { "plan": "6mo" | "12mo", "email"?: "user@example.com" }
 *
 * Response:
 *   { "url": "https://checkout.stripe.com/..." }
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

const VALID_PLANS = ["6mo", "12mo"] as const;
type Plan = (typeof VALID_PLANS)[number];

function priceIdForPlan(plan: Plan): string | undefined {
  return plan === "6mo"
    ? process.env.STRIPE_PRICE_ID_6MO
    : process.env.STRIPE_PRICE_ID_12MO;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── Validate method ─────────────────────────────────────────────────────
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Validate env ────────────────────────────────────────────────────────
  if (!STRIPE_SECRET_KEY) {
    console.error("[checkout] STRIPE_SECRET_KEY is not set");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  // ── Parse JSON body ─────────────────────────────────────────────────────
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  const { plan, email } = body;

  // ── Assert plan ─────────────────────────────────────────────────────────
  if (!plan || !VALID_PLANS.includes(plan)) {
    return res.status(400).json({
      error: `Invalid plan. Expected "6mo" or "12mo", got "${plan}"`,
    });
  }

  const priceId = priceIdForPlan(plan as Plan);
  if (!priceId) {
    console.error(`[checkout] Missing env var for plan "${plan}"`);
    return res.status(500).json({ error: "Server misconfigured — price not set" });
  }

  // ── Create Checkout Session ─────────────────────────────────────────────
  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/checkout/cancel`,
      phone_number_collection: { enabled: true },
      customer_email: email ?? undefined,
      allow_promotion_codes: true,
      metadata: { plan },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
