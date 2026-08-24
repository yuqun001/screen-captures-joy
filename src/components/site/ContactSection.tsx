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
      toast.error("Please provide your name and contact details.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitLead(form);
      if (result.ok) {
        toast.success("Thanks — a cloud architect will reach out within one business day.");
        setForm(EMPTY);
      }
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  const details = [
    { icon: MapPin, label: "Address", value: contactInfo.address },
    { icon: Phone, label: "Phone", value: contactInfo.phone },
    { icon: Mail, label: "Email", value: contactInfo.email },
    { icon: Clock, label: "Availability", value: contactInfo.hours },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-border py-24 lg:py-32"
    >
      <div className="absolute right-0 top-10 -z-10 h-72 w-72 rounded-full bg-secondary/15 blur-[120px]" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact Us"
          title="Start with a free architecture review"
          description="Tell us about your workloads. We respond with a migration path, reference architecture and delivery timeline."
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
                alt="WeChat QR code"
                loading="lazy"
                width={512}
                height={512}
                className="h-24 w-24 rounded-xl bg-foreground p-1"
              />
              <div>
                <p className="font-display text-base font-semibold">Scan on WeChat</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add our solutions team for instant answers on migration, quotas and GPU capacity.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="surface-panel rounded-2xl p-6 lg:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lead-name">
                  Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="lead-name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-contact">
                  Contact Info <span className="text-primary">*</span>
                </Label>
                <Input
                  id="lead-contact"
                  value={form.contact}
                  onChange={update("contact")}
                  placeholder="Phone or email"
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="lead-company">Company</Label>
                <Input
                  id="lead-company"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Company name (optional)"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="lead-requirements">Needs / Requirements</Label>
                <Textarea
                  id="lead-requirements"
                  value={form.requirements}
                  onChange={update("requirements")}
                  rows={5}
                  placeholder="Current stack, workloads to migrate, AI or GPU requirements…"
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="xl" className="mt-6 w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Request my architecture review <Send className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Your details stay with our solutions team. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
