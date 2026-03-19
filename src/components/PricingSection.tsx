import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";

const features = [
  "Up to 500 Custom Customers",
  "Advanced Design Features",
  "Version control",
  "Priority support",
  "Usage analytics"
];

const frequencyOptions = [6, 12];

const pricePerMonth: Record<number, number> = {
  6: 19.99,
  12: 15.99,
};

export function PricingSection() {
  const [months, setMonths] = useState(6);

  const monthlyPrice = pricePerMonth[months];
  const totalPrice = (monthlyPrice * months).toFixed(2);
  const sliderIndex = frequencyOptions.indexOf(months);

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
              <div className="mb-1 flex items-end justify-center gap-1">
                <span className="text-3xl font-bold">${monthlyPrice}</span>
                <span className="text-muted-foreground mb-0.5">/month</span>
              </div>
              <CardDescription className="mt-1">Best for growing organizations</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Frequency Slider */}
              <div className="mb-8 px-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Billing frequency</span>
                  <span className="text-sm font-medium">
                    {months === 1 ? "Monthly" : `Every ${months} months`}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={1}
                    value={sliderIndex}
                    onChange={(e) => setMonths(frequencyOptions[Number(e.target.value)])}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #e87400 ${(sliderIndex / 1) * 100}%, #e5e7eb ${(sliderIndex / 1) * 100}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  {["6mo", "12mo"].map((label, i) => (
                    <span
                      key={label}
                      className={`text-xs cursor-pointer ${i === sliderIndex ? "text-primary font-medium" : "text-muted-foreground"}`}
                      onClick={() => setMonths(frequencyOptions[i])}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

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

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #e87400;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #e87400;
        }
        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #e87400;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #e87400;
        }
      `}</style>
    </section>
  );
}