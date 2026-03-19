import { HeroSection } from "../components/HeroSection";
import { PricingSection } from "../components/PricingSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="py-16 md:py-24" />
      <PricingSection />
    </>
  );
}
