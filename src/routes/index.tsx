import { createFileRoute } from "@tanstack/react-router";

import { useSiteData } from "@/hooks/useSiteData";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { ProductsSection } from "@/components/site/ProductsSection";
import { AiSection } from "@/components/site/AiSection";
import { CasesSection } from "@/components/site/CasesSection";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "金云智算 | 阿里云金牌伙伴·企业上云与 AI 算力服务";
const description =
  "阿里云官方金牌合作伙伴，为 2500+ 企业客户提供上云迁移、云基础设施托管运维、通义千问 AI 平台与专属 GPU 算力服务。";

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
