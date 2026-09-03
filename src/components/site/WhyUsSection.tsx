import { BadgeCheck, Headphones, PencilRuler, Tag } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import type { Advantage } from "@/hooks/useSiteData";

const ICONS = {
  discount: Tag,
  certified: BadgeCheck,
  support: Headphones,
  custom: PencilRuler,
} as const;

interface Props {
  advantages: Advantage[];
  brand: string;
}

export function WhyUsSection({ advantages, brand }: Props) {
  const title = `为什么选择${brand}`;

  return (
    <section id="why" className="border-t border-border bg-surface/50 py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          align="center"
          title={title}
          highlight={brand}
          description="阿里云合作伙伴，专业的云计算服务提供商"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.id}
                className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
