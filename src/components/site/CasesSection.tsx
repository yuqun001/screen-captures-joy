import { ArrowUpRight, CalendarDays, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import type { CaseStudy } from "@/hooks/useSiteData";

export function CasesSection({ cases }: { cases: CaseStudy[] }) {
  return (
    <section id="cases" className="border-t border-border py-24 lg:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Case Studies"
          title="Outcomes our clients can put in a board deck"
          description="A selection of enterprise migrations and AI build-outs delivered with our Alibaba Cloud Gold Partner team."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.id}
              className="surface-panel group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.photo_url}
                  alt={item.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {item.industry.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-strong bg-background/70 px-2.5 py-0.5 text-[0.72rem] text-foreground backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {item.date}
                </span>
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {item.achievements.map((chip) => (
                    <li
                      key={chip}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary/12 px-2.5 py-1 text-[0.72rem] font-medium text-secondary"
                    >
                      <TrendingUp className="h-3 w-3" />
                      {chip}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read the full story
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
