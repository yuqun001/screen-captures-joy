import { Cloud } from "lucide-react";

import type { ContactInfo, NavItem, SiteSettings } from "@/hooks/useSiteData";

interface Props {
  settings: SiteSettings;
  nav: NavItem[];
  contactInfo: ContactInfo;
}

export function SiteFooter({ settings, nav, contactInfo }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="section-shell grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Cloud className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-semibold">{settings.brand_en}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {settings.partner_label}. Cloud migration, managed infrastructure, AI platforms and GPU
            compute for enterprises across Asia-Pacific.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>{contactInfo.address}</li>
            <li>{contactInfo.phone}</li>
            <li>{contactInfo.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.brand_en}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>ICP License: 浙B2-20260088</span>
            <span>ISO 27001 · ISO 20000 certified</span>
            <span>Privacy · Terms</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
