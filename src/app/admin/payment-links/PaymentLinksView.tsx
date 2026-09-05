"use client";

import { useState } from "react";
import { Desktop, Cloud, Copy, Check, EnvelopeSimple, SignOut } from "@phosphor-icons/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";
import type { EmailTemplate, PaymentLink, PaymentLinkKey } from "./data";

const ICONS = { desktop: Desktop, cloud: Cloud } as const;
const TEMPLATE_LABEL: Record<PaymentLinkKey, string> = {
  local: "Local Setup",
  vps: "VPS Setup",
  vpsMonthly: "VPS Monthly",
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      className={`gap-2 ${copied ? "bg-green-500/20 border-green-500 text-green-400" : "border-foreground/20 hover:bg-foreground/10"}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : label}
    </Button>
  );
}

type Props = {
  links: Record<PaymentLinkKey, PaymentLink>;
  templates: Record<PaymentLinkKey, EmailTemplate>;
  quickReference: ReadonlyArray<{ label: string; text: string }>;
};

export function PaymentLinksView({ links, templates, quickReference }: Props) {
  const keys = Object.keys(links) as PaymentLinkKey[];

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 font-mono">Payment Links</h1>
            <p className="text-foreground/60">Copy and send these to customers after 30min calls.</p>
          </div>
          <form action={logout}>
            <Button type="submit" variant="outline" className="gap-2 border-foreground/20 hover:bg-foreground/10">
              <SignOut className="h-4 w-4" />
              Log out
            </Button>
          </form>
        </div>

        {/* Payment Link Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {keys.map((key) => {
            const link = links[key];
            const Icon = ICONS[link.icon];
            return (
              <Card key={key} className="bg-card border-foreground/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-none flex items-center justify-center"
                      style={{ backgroundColor: `${link.color}20` }}
                    >
                      <Icon weight="duotone" className="h-6 w-6" style={{ color: link.color }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{link.name}</h2>
                      <p className="text-foreground/60">
                        {link.price} — {link.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-background rounded-none border border-foreground/10">
                    <code className="text-sm text-foreground/80 break-all">{link.url}</code>
                  </div>
                  <div className="flex gap-3">
                    <CopyButton text={link.url} label="Copy Link" />
                    <CopyButton
                      text={templates[key].body.replace("[PAYMENT_LINK]", link.url)}
                      label="Copy Email"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Email Templates */}
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">Email Templates</h2>
        <div className="space-y-6">
          {keys.map((key) => {
            const filled = templates[key].body.replace("[PAYMENT_LINK]", links[key].url);
            return (
              <Card key={key} className="bg-card border-foreground/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <EnvelopeSimple weight="duotone" className="h-5 w-5 text-foreground/60" />
                      <h3 className="text-lg font-semibold text-foreground">{TEMPLATE_LABEL[key]} Email</h3>
                    </div>
                    <CopyButton text={filled} label="Copy" />
                  </div>
                  <p className="text-foreground/60 text-sm">Subject: {templates[key].subject}</p>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 bg-background rounded-none border border-foreground/10 text-sm text-foreground/70 whitespace-pre-wrap font-sans">
                    {filled}
                  </pre>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Reference */}
        <div className="mt-12 p-6 bg-card rounded-none border border-foreground/10">
          <h3 className="text-lg font-semibold text-foreground mb-3">Quick Reference</h3>
          <div className="space-y-2 text-foreground/70">
            {quickReference.map((q) => (
              <p key={q.label}>
                <strong>{q.label}:</strong> {q.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
