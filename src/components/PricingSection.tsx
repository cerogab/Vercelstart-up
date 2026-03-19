import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";

const features = [
  "Up to 500 Custom Customers",
  "Advanced Design Features",
  "Version control",
  "Priority support",
  "Usage analytics"
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
            Simple, pricing.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that fits your team size and needs. Start free and scale as you grow.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="relative border-primary shadow-lg shadow-primary/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl mb-2">Starter PRO</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}