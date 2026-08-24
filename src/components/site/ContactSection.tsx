import { useState } from "react";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContactInfo, LeadPayload } from "@/hooks/useSiteData";

interface Props {
  contactInfo: ContactInfo;
  submitLead: (payload: LeadPayload) => Promise<{ ok: true; id: string }>;
}

const EMPTY: LeadPayload = { name: "", contact: "", company: "", requirements: "" };

export function ContactSection({ contactInfo, submitLead }: Props) {
  const [form, setForm] = useState<LeadPayload>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof LeadPayload) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) {
      toast.error("请填写您的姓名与联系方式。");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitLead(form);
      if (result.ok) {
        toast.success("提交成功，云架构师将在 1 个工作日内与您联系。");
        setForm(EMPTY);
      }
    } catch {
      toast.error("提交失败，请稍后重试或直接发送邮件联系我们。");
    } finally {
      setSubmitting(false);
    }
  }

  const details = [
    { icon: MapPin, label: "公司地址", value: contactInfo.address },
    { icon: Phone, label: "咨询电话", value: contactInfo.phone },
    { icon: Mail, label: "电子邮箱", value: contactInfo.email },
    { icon: Clock, label: "服务时间", value: contactInfo.hours },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-border py-24 lg:py-32"
    >
      <div className="absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-[120px]" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="联系我们"
          title="从一次免费的架构诊断开始"
          description="告诉我们您的业务与系统现状，我们将回复迁移路径、参考架构与交付排期。"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="surface-panel flex flex-col gap-8 rounded-2xl p-6 lg:p-8">
            <ul className="space-y-5">
              {details.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border-strong bg-accent text-primary">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5 rounded-2xl border border-border bg-background/50 p-5">
              <img
                src={contactInfo.wechat_qr}
                alt="微信二维码"
                loading="lazy"
                width={512}
                height={512}
                className="h-24 w-24 rounded-xl bg-foreground p-1"
              />
              <div>
                <p className="font-display text-base font-semibold">微信扫码咨询</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  添加解决方案团队，即时解答迁移方案、配额与 GPU 资源问题。
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="surface-panel rounded-2xl p-6 lg:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lead-name">
                  姓名 <span className="text-primary">*</span>
                </Label>
                <Input
                  id="lead-name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-contact">
                  联系方式 <span className="text-primary">*</span>
                </Label>
                <Input
                  id="lead-contact"
                  value={form.contact}
                  onChange={update("contact")}
                  placeholder="手机号或邮箱"
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="lead-company">公司名称</Label>
                <Input
                  id="lead-company"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="公司名称（选填）"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="lead-requirements">需求描述</Label>
                <Textarea
                  id="lead-requirements"
                  value={form.requirements}
                  onChange={update("requirements")}
                  rows={5}
                  placeholder="当前技术栈、待迁移的业务系统、AI 或 GPU 需求……"
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="xl" className="mt-6 w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> 提交中……
                </>
              ) : (
                <>
                  立即预约架构诊断 <Send className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              您的信息仅用于方案沟通，我们不会发送任何骚扰信息。
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
