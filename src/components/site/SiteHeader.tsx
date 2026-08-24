import { useEffect, useState } from "react";
import { Cloud, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem, SiteSettings } from "@/hooks/useSiteData";

interface Props {
  settings: SiteSettings;
  nav: NavItem[];
}

export function SiteHeader({ settings, nav }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="section-shell flex h-18 items-center justify-between gap-6 py-4">
        <a href="#home" className="flex items-center gap-3">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt={settings.brand} className="h-9 w-9 rounded-lg" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Cloud className="h-5 w-5" />
            </span>
          )}
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight">
              {settings.brand}
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
              Cloud Partner
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="hero" size="lg" className="hidden sm:inline-flex" asChild>
            <a href="#contact">Get a Cloud Assessment</a>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-6 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button variant="hero" size="lg" className="mt-4 w-full" asChild>
            <a href="#contact" onClick={() => setOpen(false)}>
              Get a Cloud Assessment
            </a>
          </Button>
        </div>
      ) : null}
    </header>
  );
}
