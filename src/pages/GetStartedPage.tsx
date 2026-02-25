import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Check } from "lucide-react";

const perks = [
  "Up to 500 Custom Customers",
  "Advanced Design Features",
  "Priority Support",
  "Usage Analytics",
];

export function GetStartedPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sign up logic would go here
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
                <Label htmlFor="name">Full Name</Label>
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

              <Button
                type="submit"
                className="w-full text-white hover:opacity-90 mt-2"
                style={{ backgroundColor: "#e87400" }}
              >
                Request a Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}