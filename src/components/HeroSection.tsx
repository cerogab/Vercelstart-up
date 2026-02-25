import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Sun } from "./Sun";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Orange glow background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
          secure marketing{" "}
          <span className="bg-gradient-to-r from-primary to-[#f29b0f] bg-clip-text text-transparent">
            intelligently.
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
          customizable messaging directly from your phone.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            Starter PRO
          </Button>
        </div>
        
        {/* Sun */}
        <div className="flex items-center justify-center">
          <Sun />
        </div>
      </div>
    </section>
  );
}