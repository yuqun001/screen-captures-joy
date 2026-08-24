import { useCallback, useMemo } from "react";

import heroBg from "@/assets/hero-bg.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import caseRetail from "@/assets/case-retail.jpg";
import caseMedia from "@/assets/case-media.jpg";
import caseManufacturing from "@/assets/case-manufacturing.jpg";
import wechatQr from "@/assets/wechat-qr.jpg";

/**
 * 统一的数据层（当前为模拟数据）。
 * 后续可直接把 `data` 替换为接口返回，字段结构与后端保持一致。
 */

export type ProductCategory = "compute" | "database" | "storage" | "network";

/**
 * Banner 轮播项。
 * `image_url` 后续可替换为上传接口返回的图片地址（如 /api/banners）。
 * 文案字段留空时自动回退到 settings 中的默认 Hero 文案。
 */
export interface HeroBanner {
  id: string;
  image_url: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
}

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
  banners: HeroBanner[];
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
  { id: "all", label: "全部" },
  { id: "compute", label: "计算" },
  { id: "database", label: "数据库" },
  { id: "storage", label: "存储" },
  { id: "network", label: "网络与安全" },
];

const settings: SiteSettings = {
  brand: "金云智算",
  brand_en: "金云智算 · 云服务",
  logo_url: null as unknown as string,
  hero_bg_url: heroBg,
  partner_label: "阿里云官方金牌合作伙伴",
  hero_eyebrow: "上云迁移 · 云基础设施 · AI 算力",
  hero_title: "企业上云",
  hero_highlight: "首选伙伴",
  hero_subtitle:
    "我们为核心业务系统提供架构设计、平滑迁移与 7×24 运维——覆盖弹性计算、托管数据库，到通义千问 AI 平台与专属 GPU 集群。",
  primary_cta: "免费咨询云架构师",
  secondary_cta: "浏览云产品",
  stats: [
    { value: "2500+", label: "企业客户" },
    { value: "金牌", label: "官方合作伙伴等级" },
    { value: "28", label: "全球部署地域" },
    { value: "99.995%", label: "可用性保障" },
  ],
  // 轮播 banner：后续接入上传功能时，只需替换这个数组的来源
  banners: [
    {
      id: "banner-1",
      image_url: heroBg,
      alt: "云数据中心与全球网络示意",
    },
    {
      id: "banner-2",
      image_url: banner2,
      alt: "云网络高速链路示意",
      eyebrow: "架构咨询 · 平滑割接 · 成本优化",
      title: "核心系统迁云",
      highlight: "零停机割接",
      subtitle:
        "资深云架构师全程护航，从评估、演练到割接上线，保障业务连续性与成本可控。",
    },
    {
      id: "banner-3",
      image_url: banner3,
      alt: "GPU 集群与 AI 算力示意",
      eyebrow: "通义千问 · PAI · 专属 GPU",
      title: "AI 算力交付",
      highlight: "数天上线",
      subtitle:
        "RDMA 高速互联的专属 GPU 资源池，配套并行文件存储与推理服务，快速跑通业务场景。",
    },
  ],
};

const nav: NavItem[] = [
  { label: "首页", href: "#home" },
  { label: "云产品", href: "#products" },
  { label: "AI 解决方案", href: "#ai" },
  { label: "客户案例", href: "#cases" },
  { label: "联系我们", href: "#contact" },
];

const products: Product[] = [
  {
    id: "ecs",
    category: "compute",
    title: "云服务器 ECS",
    subtitle: "Elastic Compute Service",
    description: "生产级云主机，支持秒级扩容、热迁移与按业务匹配的多种实例规格族。",
    icon_url: null,
    image_url: null,
    features: ["第八代实例规格族", "弹性伸缩伸缩组", "热迁移、业务零中断"],
    tags: ["热门"],
  },
  {
    id: "k8s",
    category: "compute",
    title: "容器服务 ACK",
    subtitle: "Kubernetes 托管版",
    description: "托管 Kubernetes 控制面，内置服务网格与 GPU 感知调度，开箱即用的安全加固。",
    icon_url: null,
    image_url: null,
    features: ["托管控制面", "Serverless 节点池", "GPU 调度能力"],
    tags: ["推荐"],
  },
  {
    id: "serverless",
    category: "compute",
    title: "函数计算 FC",
    subtitle: "Serverless 运行时",
    description: "事件驱动的无服务器算力，适合流量突发、音视频处理与推理网关场景。",
    icon_url: null,
    image_url: null,
    features: ["毫秒级计费", "原生事件源接入", "冷启动优化"],
    tags: ["新品"],
  },
  {
    id: "rds",
    category: "database",
    title: "云数据库 RDS",
    subtitle: "MySQL · PostgreSQL",
    description: "全托管关系型数据库，自动主备切换、任意时间点恢复与只读实例横向扩展。",
    icon_url: null,
    image_url: null,
    features: ["跨可用区高可用", "任意时间点恢复", "只读实例扩展"],
    tags: ["热门"],
  },
  {
    id: "polardb",
    category: "database",
    title: "云原生数据库 PolarDB",
    subtitle: "分布式关系型",
    description: "存算分离架构，单集群可扩展至 100TB，读能力支持秒级弹性伸缩。",
    icon_url: null,
    image_url: null,
    features: ["单集群 100TB", "秒级弹性扩容", "兼容 MySQL 生态"],
    tags: ["旗舰"],
  },
  {
    id: "redis",
    category: "database",
    title: "内存数据库 Tair",
    subtitle: "兼容 Redis",
    description: "超低延迟缓存与会话存储，支持持久内存型与集群分片架构。",
    icon_url: null,
    image_url: null,
    features: ["亚毫秒级读取", "持久内存型", "代理模式分片"],
    tags: [],
  },
  {
    id: "oss",
    category: "storage",
    title: "对象存储 OSS",
    subtitle: "海量非结构化存储",
    description: "EB 级对象存储，支持生命周期分层、版本控制与传输加速。",
    icon_url: null,
    image_url: null,
    features: ["11 个 9 数据可靠性", "生命周期分层", "全球传输加速"],
    tags: ["热门"],
  },
  {
    id: "nas",
    category: "storage",
    title: "文件存储 NAS · CPFS",
    subtitle: "共享文件系统",
    description: "共享 POSIX 文件系统，并提供面向训练场景的高吞吐并行文件存储 CPFS。",
    icon_url: null,
    image_url: null,
    features: ["容量弹性伸缩", "CPFS 支撑 AI 训练", "支持 NFS 与 SMB"],
    tags: [],
  },
  {
    id: "backup",
    category: "storage",
    title: "混合云备份 HBR",
    subtitle: "统一备份与恢复",
    description: "统一备份本地与云上负载，提供防勒索的不可变备份库。",
    icon_url: null,
    image_url: null,
    features: ["不可变备份库", "无代理虚机备份", "跨地域副本"],
    tags: ["新品"],
  },
  {
    id: "slb",
    category: "network",
    title: "负载均衡 ALB · NLB",
    subtitle: "四层 / 七层",
    description: "四层与七层负载均衡，支持百万级并发连接与原生 TLS 卸载。",
    icon_url: null,
    image_url: null,
    features: ["L4 与 L7 路由", "TLS 卸载", "健康检查自动摘除"],
    tags: [],
  },
  {
    id: "cen",
    category: "network",
    title: "云企业网 CEN",
    subtitle: "高速通道 · 专线",
    description: "全球私有骨干网，打通数据中心、分支与 VPC，提供确定性低时延。",
    icon_url: null,
    image_url: null,
    features: ["全球私有骨干网", "VPN 与专线混合组网", "智能路由选路"],
    tags: ["热门"],
  },
  {
    id: "waf",
    category: "network",
    title: "DDoS 高防 & WAF",
    subtitle: "边缘安全防护",
    description: "T 级清洗能力，托管 WAF 规则集、爬虫治理与 API 安全防护。",
    icon_url: null,
    image_url: null,
    features: ["Tbps 级流量清洗", "托管 WAF 规则", "爬虫与 API 防护"],
    tags: ["安全"],
  },
];

const aiCards: AiCard[] = [
  {
    id: "qwen",
    name: "通义千问 Qwen",
    family: "大语言模型",
    description:
      "在专有 VPC 内部署千问系列模型，构建多语言助手、文档智能与智能体工作流，包含微调服务。",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "上下文", value: "100 万 tokens" },
      { label: "模态", value: "文本 · 视觉 · 语音" },
    ],
  },
  {
    id: "dashvector",
    name: "DashVector 向量库",
    family: "向量数据库",
    description: "面向企业级 RAG 的托管向量检索，支持混合检索，百亿级向量毫秒级召回。",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "规模", value: "百亿级向量" },
      { label: "召回", value: "p99 < 10 毫秒" },
    ],
  },
  {
    id: "pai",
    name: "机器学习平台 PAI",
    family: "AI 平台",
    description: "端到端训练与推理平台：分布式训练、实验管理、模型仓库与弹性推理服务。",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "训练", value: "千卡级任务" },
      { label: "推理", value: "弹性自动扩缩" },
    ],
  },
  {
    id: "bailian",
    name: "百炼模型服务",
    family: "智能体与 RAG 套件",
    description: "基于企业自有知识库搭建生产级智能体，内置安全护栏、效果评测与可观测能力。",
    icon_url: null,
    image_url: null,
    metrics: [
      { label: "连接器", value: "60+ 数据源" },
      { label: "治理", value: "审计与护栏" },
    ],
  },
];

const gpuCards: GpuCard[] = [
  {
    id: "digital-human",
    scenario: "AI 数字人",
    description: "实时数字人渲染与口型同步链路，适用于直播电商、客服中心与品牌代言。",
    icon_url: null,
    image_url: null,
    capabilities: ["实时推理", "声音克隆", "多路并发渲染"],
  },
  {
    id: "animation",
    scenario: "AI 动画生成",
    description: "风格一致的关键帧生成与补帧能力，助力动画团队规模化产出剧集内容。",
    icon_url: null,
    image_url: null,
    capabilities: ["风格锁定", "智能补帧", "渲染集群弹性扩容"],
  },
  {
    id: "short-drama",
    scenario: "AI 短剧制作",
    description: "从剧本到分镜到成片的批量视频生成链路，配套自动化后期处理。",
    icon_url: null,
    image_url: null,
    capabilities: ["批量视频生成", "自动字幕", "多语种配音"],
  },
  {
    id: "training",
    scenario: "模型训练集群",
    description: "专属 GPU 资源池，配备 RDMA 高速互联与并行文件存储，支撑预训练与微调。",
    icon_url: null,
    image_url: null,
    capabilities: ["RDMA 高速网络", "CPFS 并行存储", "断点续训"],
  },
];

const cases: CaseStudy[] = [
  {
    id: "retail",
    title: "跨境零售平台重构架构，稳定支撑大促洪峰",
    description:
      "将单体电商系统迁移至 ACK，结合 PolarDB 与 OSS，在全球大促期间平稳承接 40 倍流量峰值。",
    photo_url: caseRetail,
    industry: ["零售", "跨境电商"],
    date: "2026-03",
    achievements: ["承接 40 倍峰值", "时延下降 62%", "零停机割接"],
  },
  {
    id: "media",
    title: "影视公司基于专属 GPU 上线 AI 短剧生产线",
    description:
      "搭建 GPU 集群与通义千问剧本链路，帮助传媒集团从概念验证走到 120 集内容上线发布。",
    photo_url: caseMedia,
    industry: ["传媒", "AIGC"],
    date: "2026-01",
    achievements: ["上线 120 集内容", "制作成本降低 55%", "9 天交付周期"],
  },
  {
    id: "manufacturing",
    title: "智能工厂将 14 个厂区统一到一套云管控平面",
    description:
      "通过 CEN 混合组网、IoT 数据接入与 RDS 分析能力，制造企业实现全产线实时可视化。",
    photo_url: caseManufacturing,
    industry: ["制造", "工业物联网"],
    date: "2025-11",
    achievements: ["14 个厂区互联", "缺陷检出率 +31%", "非计划停机 −44%"],
  },
];

const contactInfo: ContactInfo = {
  address: "浙江省杭州市西湖区云栖路 128 号 B 座",
  phone: "+86 400 820 6688",
  email: "cloud@nimbusgold.com",
  hours: "架构师 7×24 小时随时响应",
  wechat_qr: wechatQr,
};

export function useSiteData() {
  const submitLead = useCallback(async (payload: LeadPayload) => {
    // 模拟异步提交 —— 可替换为 fetch("/api/leads", { method: "POST", ... })
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
