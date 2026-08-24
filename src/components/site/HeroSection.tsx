import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/hooks/useSiteData";

export function HeroSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      <img
        src={settings.hero_bg_url}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent,var(--background)_78%)]" />
      <div className="grid-backdrop absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />

      <div className="section-shell">
        <div className="flex flex-col items-start gap-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/70 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur-md">
            <BadgeCheck className="h-4 w-4 text-primary" />
            {settings.partner_label}
          </span>

          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-secondary">
              {settings.hero_eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {settings.hero_title}{" "}
              <span className="text-gradient-primary">{settings.hero_highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {settings.hero_subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">
                {settings.primary_cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#products">{settings.secondary_cta}</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" /> 等保合规架构设计
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> 通义千问与 GPU 集群落地
            </span>
          </div>

          <dl className="mt-6 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {settings.stats.map((stat) => (
              <div key={stat.label} className="bg-surface/80 px-6 py-7 backdrop-blur-md">
                <dt className="font-display text-3xl font-semibold text-foreground lg:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
