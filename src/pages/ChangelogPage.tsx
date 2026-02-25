const entries = [
  {
    version: "v1.3.0",
    date: "February 2026",
    tag: "New",
    tagColor: "#e87400",
    changes: [
      "Added 12-month billing option with discounted pricing",
      "Improved mobile dashboard performance by 40%",
      "New customer segmentation filters",
    ],
  },
  {
    version: "v1.2.1",
    date: "January 2026",
    tag: "Fix",
    tagColor: "#3b82f6",
    changes: [
      "Fixed message delivery delays in certain regions",
      "Resolved UI glitch on pricing slider",
      "Minor copy and accessibility improvements",
    ],
  },
  {
    version: "v1.2.0",
    date: "December 2025",
    tag: "New",
    tagColor: "#e87400",
    changes: [
      "Launched Starter PRO plan",
      "Advanced design features for message templates",
      "Priority support channel for all paid users",
    ],
  },
  {
    version: "v1.1.0",
    date: "November 2025",
    tag: "New",
    tagColor: "#e87400",
    changes: [
      "Usage analytics dashboard",
      "Automated campaign scheduling",
      "Email notification preferences",
    ],
  },
];

export function ChangelogPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl tracking-tight mb-4">Changelog</h1>
          <p className="text-lg text-muted-foreground">
            Stay up to date with the latest improvements to Bram App.
          </p>
        </div>

        <div className="space-y-12">
          {entries.map((entry) => (
            <div key={entry.version} className="relative pl-6 border-l-2 border-border">
              <div
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background"
                style={{ backgroundColor: entry.tagColor }}
              />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-muted-foreground">{entry.date}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: entry.tagColor }}
                >
                  {entry.tag}
                </span>
              </div>
              <h3 className="mb-3">{entry.version}</h3>
              <ul className="space-y-2">
                {entry.changes.map((change) => (
                  <li key={change} className="text-sm text-muted-foreground flex gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
