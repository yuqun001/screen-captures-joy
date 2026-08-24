import { createFileRoute } from "@tanstack/react-router";

import { useSiteData } from "@/hooks/useSiteData";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { ProductsSection } from "@/components/site/ProductsSection";
import { AiSection } from "@/components/site/AiSection";
import { CasesSection } from "@/components/site/CasesSection";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "Nimbus Gold Cloud | Enterprise Cloud & AI on Alibaba Cloud";
const description =
  "Alibaba Cloud Gold Partner delivering enterprise cloud migration, managed infrastructure, Qwen AI platforms and dedicated GPU compute for 2500+ clients.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { settings, nav, categories, products, aiCards, gpuCards, cases, contactInfo, submitLead } =
    useSiteData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader settings={settings} nav={nav} />
      <main>
        <HeroSection settings={settings} />
        <ProductsSection products={products} categories={categories} />
        <AiSection aiCards={aiCards} gpuCards={gpuCards} />
        <CasesSection cases={cases} />
        <ContactSection contactInfo={contactInfo} submitLead={submitLead} />
      </main>
      <SiteFooter settings={settings} nav={nav} contactInfo={contactInfo} />
    </div>
  );
}
