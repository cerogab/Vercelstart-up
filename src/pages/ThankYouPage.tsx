import { Sun } from "../components/Sun";

export function ThankYouPage() {
  return (
    <section className="py-24 min-h-[70vh] flex items-start justify-center">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="rounded-2xl border bg-card p-10 max-w-md w-full text-center flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Requested your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Check your email — we'll be in touch about requesting our service!
          </p>
          <div className="mt-2 flex flex-col items-center">
            <Sun className="!w-[80px] !h-[80px]" />
            <span
              className="text-sm font-semibold -mt-1"
              style={{ color: "#e87400" }}
            >
              Bram
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
