import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "../components/ui/button";

export function WatchDemoPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl tracking-tight mb-4">Watch Demo</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
          See how Bram App helps you secure and scale your marketing — all from your phone.
        </p>

        {/* Video placeholder */}
        <div className="relative rounded-2xl overflow-hidden border bg-muted aspect-video flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
          <button
            className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full text-white shadow-xl transition-transform hover:scale-105"
            style={{ backgroundColor: "#e87400" }}
            onClick={() => setShowComingSoon(true)}
          >
            <Play className="w-8 h-8 ml-1" fill="white" />
          </button>
          <p className="absolute bottom-6 text-sm text-muted-foreground">Demo video — 2 min</p>
        </div>
        {showComingSoon && (
          <p className="text-sm text-muted-foreground mt-4">Demo video coming soon — stay tuned!</p>
        )}

      </div>
    </section>
  );
}