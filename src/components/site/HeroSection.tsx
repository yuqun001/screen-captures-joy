import { ArrowRight, BadgeCheck, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { HeroContent, PromoCard, SiteSettings } from "@/hooks/useSiteData";

interface Props {
  settings: SiteSettings;
  hero: HeroContent;
  promo: PromoCard;
}

export function HeroSection({ settings, hero, promo }: Props) {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      <div className="grid-backdrop absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(65%_55%_at_20%_10%,black,transparent)]" />
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "color-mix(in oklab, var(--primary) 14%, transparent)" }}
      />

      <div className="section-shell">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-elevated)]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
            <BadgeCheck className="h-4 w-4" />
          </span>
          {settings.partner_label}
        </span>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise-in">
            <p className="text-sm font-medium tracking-[0.14em] text-primary">{hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              {hero.title_line1}
              <br />
              <span className="text-gradient-primary">{hero.title_line2}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {hero.subtitle}
            </p>

            <dl className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              {hero.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    index === 0 ? "pr-0" : "border-l border-border pl-8 first:border-0 first:pl-0"
                  }
                >
                  <dt className="font-display text-3xl font-bold text-primary">{stat.value}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href="#services">
                  {hero.primary_cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="quiet" size="xl" asChild>
                <a href="#contact">{hero.secondary_cta}</a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-muted-foreground">
              {hero.assurances.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elevated)]">
            <div className="flex items-start justify-between gap-4 bg-gradient-primary px-7 py-6 text-primary-foreground">
              <p className="font-display text-xl font-semibold">{promo.title}</p>
              <span className="shrink-0 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                {promo.badge}
              </span>
            </div>

            <div className="divide-y divide-border">
              {promo.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-4 px-7 py-5 transition-colors hover:bg-accent/60"
                >
                  <div>
                    <p className="text-base font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary/70 line-through">{item.original}</p>
                    <p className="font-display text-xl font-bold text-primary">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-7 pb-7 pt-5">
              <Button variant="hero" size="lg" className="w-full" asChild>
                <a href="#contact">{promo.cta}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
