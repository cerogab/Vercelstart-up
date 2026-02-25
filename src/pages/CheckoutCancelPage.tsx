import { Link } from "react-router";

export function CheckoutCancelPage() {
  return (
    <div className="container mx-auto max-w-lg py-24 text-center">
      <div className="mb-6 text-5xl">😕</div>
      <h1 className="text-3xl font-bold mb-4">Checkout Cancelled</h1>
      <p className="text-muted-foreground mb-8">
        No worries — you weren't charged. You can try again whenever you're
        ready.
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Back to Pricing
      </Link>
    </div>
  );
}
