import { HeroSection } from "../components/HeroSection";
import { PricingSection } from "../components/PricingSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <div
        className="w-full h-[600px] md:h-[800px] lg:h-[1000px]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1242 1171' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.8025e-15 58.55 -62.1 3.5852e-15 621 585.5)'><stop stop-color='rgba(210,126,52,1)' offset='0.16346'/><stop stop-color='rgba(218,142,78,1)' offset='0.33654'/><stop stop-color='rgba(226,158,105,1)' offset='0.50962'/><stop stop-color='rgba(231,190,163,1)' offset='0.75481'/><stop stop-color='rgba(237,222,222,1)' offset='1'/></radialGradient></defs></svg>")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <PricingSection />
    </>
  );
}
