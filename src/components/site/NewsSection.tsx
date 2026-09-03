import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import type { NewsItem } from "@/hooks/useSiteData";

export function NewsSection({ news }: { news: NewsItem[] }) {
  return (
    <section id="news" className="py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          align="center"
          title="企业动态"
          description="来自一线的交付实践与行业观察，看看我们如何帮助企业在云上跑得更快。"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {news.map((item) => (
            <article
              key={item.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                width={1280}
                height={720}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] lg:h-64"
              />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium text-primary">{item.kicker}</span>
                  <span className="text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  {item.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
