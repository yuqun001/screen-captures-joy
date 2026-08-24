import { Bot, Clapperboard, Cpu, Film, Layers, Sparkles, Zap } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import type { AiCard, GpuCard } from "@/hooks/useSiteData";

const GPU_ICONS = [Bot, Film, Clapperboard, Cpu] as const;

interface Props {
  aiCards: AiCard[];
  gpuCards: GpuCard[];
}

export function AiSection({ aiCards, gpuCards }: Props) {
  return (
    <section id="ai" className="relative isolate overflow-hidden border-t border-border py-24 lg:py-32">
      <div className="grid-backdrop absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="section-shell">
        <SectionHeading
          align="center"
          eyebrow="AI 与 GPU 解决方案"
          title="前沿大模型平台，配套专属 GPU 算力"
          description="从在您专有网络内部署通义千问，到面向视频生成的 RDMA 互联 GPU 资源池，我们承担全栈 AI 落地。"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {aiCards.map((card) => (
            <article
              key={card.id}
              className="surface-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-signal opacity-70" />
              <div className="flex items-center gap-3">
                {card.icon_url ? (
                  <img src={card.icon_url} alt="" loading="lazy" className="h-10 w-10 rounded-lg" />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-border-strong bg-accent text-secondary">
                    <Sparkles className="h-5 w-5" />
                  </span>
                )}
                <div>
                  <h3 className="font-display text-lg font-semibold">{card.name}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {card.family}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <dl className="mt-5 space-y-2 border-t border-border pt-4">
                {card.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">{metric.label}</dt>
                    <dd className="font-mono text-foreground">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-border bg-surface p-6 backdrop-blur-md lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-secondary">
                <Zap className="h-4 w-4" /> GPU 算力
              </p>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
                按场景调优的 GPU 集群，数天内即可交付
              </h3>
            </div>
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">预约 GPU 资源</a>
            </Button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {gpuCards.map((card, i) => {
              const Icon = GPU_ICONS[i % GPU_ICONS.length]!;
              return (
                <article
                  key={card.id}
                  style={{ animationDelay: `${i * 120}ms` }}
                  className="group animate-rise-in relative isolate overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-glow"
                >
                  {/* 动态光斑与网格背景 */}
                  <div className="animate-float-soft absolute -right-12 -top-12 -z-10 h-32 w-32 rounded-full bg-primary/12 blur-3xl" />
                  <div className="animate-float-soft absolute -bottom-14 -left-10 -z-10 h-28 w-28 rounded-full bg-secondary/10 blur-3xl [animation-delay:1.8s]" />
                  <div className="grid-backdrop absolute inset-0 -z-10 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-25" />
                  {/* 扫描光线 */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-16 bg-gradient-to-b from-secondary/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-scan-line group-hover:opacity-100" />
                  {/* 顶部流光 */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
                    <div className="animate-shimmer-x h-px w-1/2 bg-gradient-signal" />
                  </div>

                  {card.image_url ? (
                    <img
                      src={card.image_url}
                      alt={card.scenario}
                      loading="lazy"
                      className="mb-4 h-32 w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : null}

                  <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    <span className="animate-pulse-ring absolute inset-0 rounded-xl border border-primary/60" />
                    <span className="animate-orbit-spin absolute -inset-2 rounded-full border border-dashed border-secondary/30" />
                    <Icon className="relative h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold">{card.scenario}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {card.capabilities.map((cap, capIndex) => (
                      <li
                        key={cap}
                        style={{ transitionDelay: `${capIndex * 70}ms` }}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[0.72rem] text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-secondary/50 group-hover:text-foreground"
                      >
                        <Layers className="h-3 w-3 text-secondary" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
