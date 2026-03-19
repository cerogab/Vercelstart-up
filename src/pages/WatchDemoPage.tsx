import { FlashPlayerCard } from "../components/FlashPlayerCard";

export function WatchDemoPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl tracking-tight mb-4">Watch Demo</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
          See how Bram App helps you secure and scale your marketing — all from your phone.
        </p>

        <FlashPlayerCard />
      </div>
    </section>
  );
}