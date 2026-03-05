import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
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
  const [thumbX, setThumbX] = useState(0); // 0–1 continuous position for smooth tracking
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);

  const monthlyPrice = pricePerMonth[months];
  const totalPrice = (monthlyPrice * months).toFixed(2);
  const sliderIndex = frequencyOptions.indexOf(months);

  // Smooth lerp animation loop — eases thumb toward target during drag
  const startLerp = useCallback(() => {
    const lerp = () => {
      const diff = targetXRef.current - currentXRef.current;
      // Ease factor: lower = smoother/slower (0.12 gives a soft glide)
      currentXRef.current += diff * 0.12;
      // Stop animating once close enough
      if (Math.abs(diff) > 0.001) {
        setThumbX(currentXRef.current);
        animFrameRef.current = requestAnimationFrame(lerp);
      } else {
        currentXRef.current = targetXRef.current;
        setThumbX(currentXRef.current);
      }
    };
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(lerp);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Compute clamped 0–1 ratio from a clientX position
  const ratioFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  }, []);

  // Snap to nearest option and update state
  const snapToNearest = useCallback((ratio: number) => {
    const idx = Math.round(ratio * (frequencyOptions.length - 1));
    setMonths(frequencyOptions[idx]);
    setThumbX(idx / (frequencyOptions.length - 1));
    currentXRef.current = idx / (frequencyOptions.length - 1);
  }, []);

  // Keep thumbX in sync when not dragging
  useEffect(() => {
    if (!isDragging) {
      const target = sliderIndex / (frequencyOptions.length - 1);
      setThumbX(target);
      currentXRef.current = target;
      targetXRef.current = target;
    }
  }, [sliderIndex, isDragging]);

  // Mouse handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    const ratio = ratioFromClientX(e.clientX);
    targetXRef.current = ratio;
    startLerp();
  }, [ratioFromClientX, startLerp]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const ratio = ratioFromClientX(e.clientX);
    targetXRef.current = ratio;
    startLerp();
  }, [isDragging, ratioFromClientX, startLerp]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    cancelAnimationFrame(animFrameRef.current);
    const ratio = ratioFromClientX(e.clientX);
    snapToNearest(ratio);
  }, [isDragging, ratioFromClientX, snapToNearest]);

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
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              Most Popular
            </Badge>

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
                {/* Custom smooth track */}
                <div
                  ref={trackRef}
                  className="relative h-6 flex items-center select-none touch-none cursor-pointer"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  {/* Rail */}
                  <div className="absolute inset-x-0 h-2 rounded-full bg-gray-200 overflow-hidden">
                    {/* Filled portion */}
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${thumbX * 100}%`,
                        background: "#e87400",
                        transition: isDragging ? "none" : "width 0.6s cubic-bezier(.25,.1,.25,1)",
                      }}
                    />
                  </div>
                  {/* Thumb */}
                  <div
                    className="absolute -translate-x-1/2"
                    style={{
                      left: `${thumbX * 100}%`,
                      transition: isDragging ? "none" : "left 0.6s cubic-bezier(.25,.1,.25,1)",
                    }}
                  >
                    <div className="w-[18px] h-[18px] rounded-full bg-[#e87400] border-2 border-white shadow-[0_0_0_2px_#e87400] hover:scale-110 transition-transform" />
                  </div>
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
    </section>
  );
}