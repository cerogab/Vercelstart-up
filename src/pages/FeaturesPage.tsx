import { Zap, Shield, Smartphone, BarChart3, Users, Repeat2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Messaging",
    description: "Send marketing messages to your entire customer base in seconds with our optimized delivery pipeline.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade encryption ensures your customer data and communications are always protected.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Manage everything directly from your phone. Full-featured mobile app for on-the-go control.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Deep insights into message performance, open rates, and customer engagement over time.",
  },
  {
    icon: Users,
    title: "Customer Segments",
    description: "Group customers into segments and tailor messaging to each audience for maximum impact.",
  },
  {
    icon: Repeat2,
    title: "Automated Campaigns",
    description: "Set up recurring campaigns and let Bram App handle the scheduling and delivery automatically.",
  },
];

export function FeaturesPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl tracking-tight mb-4">Features</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run intelligent, secure marketing — all from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                style={{ backgroundColor: "#e87400" + "20" }}
              >
                <feature.icon className="w-5 h-5" style={{ color: "#e87400" }} />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
