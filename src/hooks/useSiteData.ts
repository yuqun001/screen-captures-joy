import { useCallback, useMemo } from "react";

import heroBg from "@/assets/hero-bg.jpg";
import caseRetail from "@/assets/case-retail.jpg";
import caseMedia from "@/assets/case-media.jpg";
import caseManufacturing from "@/assets/case-manufacturing.jpg";
import wechatQr from "@/assets/wechat-qr.jpg";

/**
 * Central mock data layer.
 * Swap the `data` object below for API responses (shapes are backend-ready).
 */

export type ProductCategory = "compute" | "database" | "storage" | "network";

export interface SiteSettings {
  brand: string;
  brand_en: string;
  logo_url: string;
  hero_bg_url: string;
  partner_label: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_highlight: string;
  hero_subtitle: string;
  primary_cta: string;
  secondary_cta: string;
  stats: { value: string; label: string }[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  title: string;
  subtitle: string;
  description: string;
  icon_url: string | null;
  image_url: string | null;
  features: string[];
  tags: string[];
}

export interface AiCard {
  id: string;
  name: string;
  family: string;
  description: string;
  icon_url: string | null;
  image_url: string | null;
  metrics: { label: string; value: string }[];
}

export interface GpuCard {
  id: string;
  scenario: string;
  description: string;
  icon_url: string | null;
  image_url: string | null;
  capabilities: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  photo_url: string;
  industry: string[];
  date: string;
  achievements: string[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
  wechat_qr: string;
}

export interface LeadPayload {
  name: string;
  contact: string;
  company?: string;
  requirements?: string;
}

const CATEGORY_LABELS: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "compute", label: "Compute" },
  { id: "database", label: "Database" },
  { id: "storage", label: "Storage" },
  { id: "network", label: "Network" },
];

const settings: SiteSettings = {
  brand: "Nimbus Gold",
  brand_en: "Nimbus Gold Cloud",
  logo_url: null as unknown as string,
  hero_bg_url: heroBg,
  partner_label: "Alibaba Cloud Official Gold Partner",
  hero_eyebrow: "Migration · Infrastructure · AI Compute",
  hero_title: "Enterprise Cloud",
  hero_highlight: "First Choice",
  hero_subtitle:
    "We architect, migrate and operate mission-critical workloads on Alibaba Cloud — from elastic compute and managed databases to Qwen-powered AI platforms and dedicated GPU clusters.",
  primary_cta: "Talk to a Cloud Architect",
  secondary_cta: "Explore Cloud Products",
  stats: [
    { value: "2500+", label: "Enterprise clients" },
    { value: "Gold", label: "Official partner tier" },
    { value: "28", label: "Global regions deployed" },
    { value: "99.995%", label: "Availability delivered" },
  ],
};

const nav: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Cloud Products", href: "#products" },
  { label: "AI Solutions", href: "#ai" },
  { label: "Case Studies", href: "#cases" },
  { label: "Contact Us", href: "#contact" },
];

const products: Product[] = [
  {
    id: "ecs",
    category: "compute",
    title: "Elastic Compute Service",
    subtitle: "ECS",
    description:
      "Production-grade virtual machines with instant scaling, live migration and per-workload instance families.",
    icon_url: null,
    image_url: null,
    features: ["8th-gen instance families", "Auto scaling groups", "Live migration, zero downtime"],
    tags: ["Hot"],
  },
  {
    id: "k8s",
    category: "compute",
    title: "Container Service for Kubernetes",
    subtitle: "ACK",
    description:
      "Managed Kubernetes with hardened control planes, service mesh and GPU-aware scheduling built in.",
    icon_url: null,
    image_url: null,
    features: ["Managed control plane", "Serverless node pools", "GPU scheduling"],
    tags: ["Popular"],
  },
  {
    id: "serverless",
    category: "compute",
    title: "Function Compute",
    subtitle: "FC",
    description:
      "Event-driven serverless runtime for bursty traffic, media pipelines and inference gateways.",
    icon_url: null,
    image_url: null,
    features: ["Millisecond billing", "Native event sources", "Cold-start optimization"],
    tags: ["New"],
  },
  {
    id: "rds",
    category: "database",
    title: "ApsaraDB RDS",
    subtitle: "MySQL · PostgreSQL",
    description:
      "Fully managed relational databases with automated failover, PITR backups and read-replica fan-out.",
    icon_url: null,
    image_url: null,
    features: ["Cross-zone HA", "Point-in-time recovery", "Read replicas"],
    tags: ["Hot"],
  },
  {
    id: "polardb",
    category: "database",
    title: "PolarDB Cloud-Native",
    subtitle: "Distributed SQL",
    description:
      "Compute-storage separated database scaling to 100 TB with second-level elastic read capacity.",
    icon_url: null,
    image_url: null,
    features: ["100 TB single cluster", "Second-level scaling", "MySQL compatible"],
    tags: ["Flagship"],
  },
  {
    id: "redis",
    category: "database",
    title: "Tair In-Memory",
    subtitle: "Redis compatible",
    description:
      "Ultra-low latency caching and session store with persistent memory and cluster sharding.",
    icon_url: null,
    image_url: null,
    features: ["Sub-millisecond reads", "Persistent memory tier", "Proxy-based sharding"],
    tags: [],
  },
  {
    id: "oss",
    category: "storage",
    title: "Object Storage Service",
    subtitle: "OSS",
    description:
      "Exabyte-scale object storage with lifecycle tiering, versioning and edge acceleration.",
    icon_url: null,
    image_url: null,
    features: ["11 nines durability", "Lifecycle tiering", "Transfer acceleration"],
    tags: ["Hot"],
  },
  {
    id: "nas",
    category: "storage",
    title: "Apsara File Storage",
    subtitle: "NAS · CPFS",
    description:
      "Shared POSIX file systems, including parallel CPFS volumes for training-scale throughput.",
    icon_url: null,
    image_url: null,
    features: ["Elastic capacity", "CPFS for AI training", "NFS & SMB protocols"],
    tags: [],
  },
  {
    id: "backup",
    category: "storage",
    title: "Hybrid Backup Recovery",
    subtitle: "HBR",
    description:
      "Unified backup for on-premises and cloud workloads with immutable, ransomware-resistant vaults.",
    icon_url: null,
    image_url: null,
    features: ["Immutable vaults", "Agentless VM backup", "Cross-region replicas"],
    tags: ["New"],
  },
  {
    id: "slb",
    category: "network",
    title: "Server Load Balancer",
    subtitle: "ALB · NLB",
    description:
      "Layer 4/7 load balancing with millions of concurrent connections and native TLS offload.",
    icon_url: null,
    image_url: null,
    features: ["L4 & L7 routing", "TLS offload", "Health-aware failover"],
    tags: [],
  },
  {
    id: "cen",
    category: "network",
    title: "Cloud Enterprise Network",
    subtitle: "CEN · Express Connect",
    description:
      "Private global backbone linking data centers, branches and VPCs with deterministic latency.",
    icon_url: null,
    image_url: null,
    features: ["Global private backbone", "Hybrid VPN & leased line", "Intelligent routing"],
    tags: ["Hot"],
  },
  {
    id: "waf",
    category: "network",
    title: "Anti-DDoS & WAF",
    subtitle: "Edge Security",
    description:
      "Terabit-scale scrubbing with managed WAF rulesets, bot management and API protection.",
    icon_url: null,
    image_url: null,
    features: ["Tbps scrubbing", "Managed WAF rules", "Bot & API defense"],
    tags: ["Secure"],
  },
];

const aiCards: AiCard[] = [
  {
    id: "qwen",
    name: "Qwen",
    family: "Large Language Model",
    description:
      "Deploy the Qwen family for multilingual assistants, document intelligence and agentic workflows — private VPC endpoints, fine-tuning included.",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "Context", value: "1M tokens" },
      { label: "Modalities", value: "Text · Vision · Audio" },
    ],
  },
  {
    id: "dashvector",
    name: "DashVector",
    family: "Vector Database",
    description:
      "Managed vector retrieval for RAG at enterprise scale, with hybrid search and millisecond recall over billions of embeddings.",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "Scale", value: "Billions of vectors" },
      { label: "Recall", value: "< 10 ms p99" },
    ],
  },
  {
    id: "pai",
    name: "PAI",
    family: "AI Platform",
    description:
      "End-to-end training and serving platform: distributed training, experiment tracking, model registry and elastic inference.",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "Training", value: "Thousand-card jobs" },
      { label: "Serving", value: "Elastic autoscale" },
    ],
  },
  {
    id: "bailian",
    name: "Model Studio",
    family: "Agent & RAG Suite",
    description:
      "Assemble production agents on top of your own knowledge base with guardrails, evaluation and observability.",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "Connectors", value: "60+ data sources" },
      { label: "Governance", value: "Audit & guardrails" },
    ],
  },
];

const gpuCards: GpuCard[] = [
  {
    id: "digital-human",
    scenario: "AI Digital Human",
    description:
      "Real-time avatar rendering and lip-sync pipelines for livestream commerce, service desks and brand ambassadors.",
    icon_url: null,
    image_url: null,
    capabilities: ["Real-time inference", "Voice cloning", "Multi-stream rendering"],
  },
  {
    id: "animation",
    scenario: "AI Animation",
    description:
      "Style-consistent frame generation and interpolation for studios producing episodic animated content.",
    icon_url: null,
    image_url: null,
    capabilities: ["Style locking", "Frame interpolation", "Render farm bursting"],
  },
  {
    id: "short-drama",
    scenario: "AI Short Drama",
    description:
      "Script-to-storyboard-to-shot pipelines with batch video generation and automated post-production.",
    icon_url: null,
    image_url: null,
    capabilities: ["Batch video gen", "Auto subtitling", "Multi-language dubbing"],
  },
  {
    id: "training",
    scenario: "Model Training Clusters",
    description:
      "Dedicated GPU pods with RDMA interconnect and parallel file storage for pre-training and fine-tuning.",
    icon_url: null,
    image_url: null,
    capabilities: ["RDMA fabric", "CPFS storage", "Checkpoint resilience"],
  },
];

const cases: CaseStudy[] = [
  {
    id: "retail",
    title: "Cross-border retail platform re-architected for peak season",
    description:
      "Migrated a monolithic commerce stack to ACK with PolarDB and OSS, absorbing 40x traffic spikes during global sale events.",
    photo_url: caseRetail,
    industry: ["Retail", "Cross-border"],
    date: "2026-03",
    achievements: ["40x peak traffic absorbed", "Latency −62%", "Zero downtime cutover"],
  },
  {
    id: "media",
    title: "Studio launches AI short-drama pipeline on dedicated GPUs",
    description:
      "Built a GPU cluster and Qwen-based script pipeline that took a media group from concept to 120 published episodes.",
    photo_url: caseMedia,
    industry: ["Media", "AIGC"],
    date: "2026-01",
    achievements: ["120 episodes shipped", "Production cost −55%", "9-day delivery cycle"],
  },
  {
    id: "manufacturing",
    title: "Smart factory unifies 14 plants on one cloud control plane",
    description:
      "Hybrid CEN backbone plus IoT ingestion and RDS analytics gave a manufacturer real-time visibility across every line.",
    photo_url: caseManufacturing,
    industry: ["Manufacturing", "IoT"],
    date: "2025-11",
    achievements: ["14 plants connected", "Defect detection +31%", "Unplanned stops −44%"],
  },
];

const contactInfo: ContactInfo = {
  address: "Tower B, 128 Yunqi Road, Xihu District, Hangzhou, China",
  phone: "+86 400 820 6688",
  email: "cloud@nimbusgold.com",
  hours: "Architects on call, 7×24",
  wechat_qr: wechatQr,
};

export function useSiteData() {
  const submitLead = useCallback(async (payload: LeadPayload) => {
    // Mock async POST — replace with fetch("/api/leads", { method: "POST", ... })
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.info("[mock POST /api/leads]", payload);
    return { ok: true as const, id: `lead_${Date.now()}` };
  }, []);

  return useMemo(
    () => ({
      settings,
      nav,
      categories: CATEGORY_LABELS,
      products,
      aiCards,
      gpuCards,
      cases,
      contactInfo,
      submitLead,
    }),
    [submitLead],
  );
}
