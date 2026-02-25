import { useSearchParams, Link } from "react-router";

export function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="container mx-auto max-w-lg py-24 text-center">
      <div className="mb-6 text-5xl">🎉</div>
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-muted-foreground mb-2">
        Your subscription is now active.
      </p>
      {sessionId && (
        <p className="text-xs text-muted-foreground mb-8 break-all">
          Session: {sessionId}
        </p>
      )}
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
