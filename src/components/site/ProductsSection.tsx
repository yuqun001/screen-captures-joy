import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Boxes,
  Check,
  Cpu,
  Database,
  HardDrive,
  Network,
  Server,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/hooks/useSiteData";

const CATEGORY_ICON: Record<ProductCategory, typeof Server> = {
  compute: Cpu,
  database: Database,
  storage: HardDrive,
  network: Network,
};

interface Props {
  products: Product[];
  categories: { id: "all" | ProductCategory; label: string }[];
}

export function ProductsSection({ products, categories }: Props) {
  const [active, setActive] = useState<"all" | ProductCategory>("all");

  const visible = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active, products],
  );

  return (
    <section id="products" className="relative border-t border-border py-24 lg:py-32">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="云产品"
            title="为高并发、强合规企业打造的云基础设施"
            description="每一项服务都由我们的认证架构师完成部署、安全加固与全程监控，不必自行摸索。"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all duration-200",
                  active === cat.id
                    ? "border-transparent bg-gradient-primary font-semibold text-primary-foreground shadow-glow"
                    : "border-border bg-surface/50 text-muted-foreground hover:border-border-strong hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => {
            const Icon = CATEGORY_ICON[product.category] ?? Boxes;
            return (
              <article
                key={product.id}
                className="surface-panel group relative flex flex-col gap-5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-glow"
              >
                <div className="flex items-start justify-between gap-3">
                  {product.icon_url ? (
                    <img
                      src={product.icon_url}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 rounded-xl"
                    />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-border-strong bg-accent text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/40 bg-primary/12 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-secondary">
                    {product.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>

                <ul className="mt-auto space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="quiet" size="sm" className="w-full justify-between" asChild>
                  <a href="#contact">
                    查看详情
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
