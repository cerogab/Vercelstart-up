import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  "Up to 500 Custom Customers",
  "Advanced Design Features",
  "Version control",
  "Priority support",
  "Usage analytics"
];

const screenshots = [
  {
    title: "Home Page",
    description: "Monitor all your key metrics at a glance",
    image: "/home-page.jpg",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    title: "Settings",
    description: "Customize your workspace and preferences",
    image: "/settings.png",
    gradient: "from-[#f29b0f]/20 to-[#f29b0f]/5",
  },
  {
    title: "Calendar",
    description: "Stay organized with your schedule",
    image: "/cal.png",
    gradient: "from-primary/15 to-[#f29b0f]/10",
  },
];

export function PricingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 10500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goPrev = () => goTo((activeIndex - 1 + screenshots.length) % screenshots.length);
  const goNext = () => goTo((activeIndex + 1) % screenshots.length);

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
            Preview
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

        {/* Screenshot Slider */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {screenshots.map((shot, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className={`rounded-2xl bg-gradient-to-br ${shot.gradient} border p-6 md:p-10`}>
                    <div className="aspect-[16/9] rounded-lg overflow-hidden border shadow-sm">
                      <img
                        src={shot.image}
                        alt={shot.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4 text-center">{shot.title}</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">{shot.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/90 border shadow-md p-2 hover:bg-background transition-colors"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/90 border shadow-md p-2 hover:bg-background transition-colors"
              aria-label="Next screenshot"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30"
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}