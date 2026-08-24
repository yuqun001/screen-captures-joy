import { useCallback, useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/hooks/useSiteData";

const AUTOPLAY_MS = 6000;

export function HeroSection({ settings }: { settings: SiteSettings }) {
  const banners =
    settings.banners.length > 0
      ? settings.banners
      : [{ id: "fallback", image_url: settings.hero_bg_url, alt: "" }];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => setActive(((index % banners.length) + banners.length) % banners.length),
    [banners.length],
  );

  useEffect(() => {
    if (paused || banners.length < 2) return;
    const timer = window.setInterval(
      () => setActive((prev) => (prev + 1) % banners.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, banners.length]);

  const current = banners[active]!;
  const eyebrow = current.eyebrow ?? settings.hero_eyebrow;
  const title = current.title ?? settings.hero_title;
  const highlight = current.highlight ?? settings.hero_highlight;
  const subtitle = current.subtitle ?? settings.hero_subtitle;

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((banner, index) => (
        <img
          key={banner.id}
          src={banner.image_url}
          alt={banner.alt}
          aria-hidden={index !== active}
          width={1920}
          height={1088}
          loading={index === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 -z-20 h-full w-full object-cover object-right transition-[opacity,transform] duration-[1400ms] ease-out ${
            index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--background)_0%,color-mix(in_oklab,var(--background)_88%,transparent)_42%,transparent_72%)]" />
      <div className="grid-backdrop absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(70%_60%_at_20%_20%,black,transparent)]" />


      <div className="section-shell">
        <div className="flex flex-col items-start gap-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/70 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur-md">
            <BadgeCheck className="h-4 w-4 text-primary" />
            {settings.partner_label}
          </span>

          <div key={current.id} className="max-w-3xl animate-rise-in">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-secondary">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {title} <span className="text-gradient-primary">{highlight}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {subtitle}
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

          {banners.length > 1 ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="上一张 banner"
                  onClick={() => goTo(active - 1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-surface/70 text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="下一张 banner"
                  onClick={() => goTo(active + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-surface/70 text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {banners.map((banner, index) => (
                  <button
                    key={banner.id}
                    type="button"
                    aria-label={`切换到第 ${index + 1} 张 banner`}
                    aria-current={index === active}
                    onClick={() => goTo(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-10 bg-gradient-primary"
                        : "w-4 bg-border-strong hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}

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
