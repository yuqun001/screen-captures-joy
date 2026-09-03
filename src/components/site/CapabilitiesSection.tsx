import { BrainCircuit, Compass, ShieldCheck, Wrench } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import type { Capability } from "@/hooks/useSiteData";

const ICONS = {
  consult: Compass,
  security: ShieldCheck,
  ai: BrainCircuit,
  ops: Wrench,
} as const;

export function CapabilitiesSection({ capabilities }: { capabilities: Capability[] }) {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          align="center"
          eyebrow="核心能力"
          title="全栈云服务，一站式解决"
          highlight="一站式解决"
          description="从架构咨询到安全合规、数据智能与托管运维，覆盖企业上云的完整生命周期。"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.id}
                className="flex gap-5 rounded-2xl border border-border bg-surface/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
