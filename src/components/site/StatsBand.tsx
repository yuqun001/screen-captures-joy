interface Props {
  stats: { value: string; label: string }[];
}

export function StatsBand({ stats }: Props) {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="section-shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
