import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Check } from "lucide-react";
import { supabase } from "../lib/supabase";

const perks = [
  "Up to 500 Custom Customers",
  "Advanced Design Features",
  "Priority Support",
  "Usage Analytics",
];

export function GetStartedPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("contacts")
        .insert({ email, first_name: name });

      if (insertError) throw insertError;

      navigate("/thank-you");
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        (err as { code: string }).code === "23505"
      ) {
        setError("This email is already registered.");
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-xl font-semibold">Bram App</span>
            <h1 className="text-4xl tracking-tight mt-4 mb-3">Request A Download</h1>
            <p className="text-muted-foreground mb-8">
              Bram securely keeps track of limitless marketing, built solely for small businesses.
            </p>
            <ul className="space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm">
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full text-white flex-shrink-0"
                    style={{ backgroundColor: "#e87400" }}
                  >
                    <Check className="w-3 h-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="rounded-2xl border bg-card p-8">
            <h2 className="text-2xl tracking-tight mb-6">Create your account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full text-white hover:opacity-90 mt-2"
                style={{ backgroundColor: "#e87400" }}
                disabled={isLoading}
              >
                {isLoading ? "Submitting…" : "Request a Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}