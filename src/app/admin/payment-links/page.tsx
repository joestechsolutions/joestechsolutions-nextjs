"use client";

import { useState, useSyncExternalStore } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Desktop, Cloud, Copy, Check, EnvelopeSimple, Lock } from "@phosphor-icons/react/dist/ssr";

// Simple client-side gate — set NEXT_PUBLIC_ADMIN_PASSWORD in your .env.local
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

// A stable no-op storage listener for useSyncExternalStore
const subscribeToSessionStorage = () => () => {};
const getSessionStorageSnapshot = (key: string, expected: string) => () => {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(key) === expected;
};

const PAYMENT_LINKS = {
  local: {
    name: "Private AI Local Setup",
    price: "$199",
    description: "One-time payment",
    url: "https://buy.stripe.com/9B6eVc58E5Fvb9reAJ0x200",
    icon: Desktop,
    color: "#02a0a0",
  },
  vps: {
    name: "Private AI Cloud Server Setup",
    price: "$499 + $29/mo",
    description: "Setup + Monthly hosting",
    url: "https://buy.stripe.com/8x200i30w3xna5n2S10x201",
    icon: Cloud,
    color: "#f5a94f",
  },
  vpsMonthly: {
    name: "Cloud AI Server Monthly",
    price: "$29/mo",
    description: "Monthly subscription only",
    url: "https://buy.stripe.com/4gM14mfNi2tjcdv0JT0x202",
    icon: Cloud,
    color: "#ffbd65",
  },
};

const EMAIL_TEMPLATES = {
  local: {
    subject: "Your Private AI Setup - Payment Link",
    body: `Hi [NAME],

Great chatting with you! As discussed, here's the payment link for your Private AI Local Setup:

[PAYMENT_LINK]

Once payment is complete, I'll reach out to schedule our 30-minute walkthrough call where we'll:
• Review your hardware and configure the right model
• Walk through using your private AI day-to-day
• Answer any questions you have

You'll have 30 days of email support after the call. No recurring charges — it's yours forever.

Looking forward to getting you set up!

Best,
Joe
Joe's Tech Solutions`,
  },
  vps: {
    subject: "Your Private AI Cloud Server Setup - Payment Link",
    body: `Hi [NAME],

Great chatting with you! As discussed, here's the payment link for your Private AI Cloud Server Setup:

[PAYMENT_LINK]

This includes:
• $499 one-time setup fee
• $29/month for hosting, domain, and ongoing support
• Daily automated backups, monthly health checks, multi-user access

Once payment is complete, I'll reach out to schedule our setup session and get your private AI server running.

Looking forward to getting you set up!

Best,
Joe
Joe's Tech Solutions`,
  },
  vpsMonthly: {
    subject: "Cloud AI Server Monthly - Subscription Link",
    body: `Hi [NAME],

Here's the link to subscribe to Cloud AI Server Monthly:

[PAYMENT_LINK]

This is $29/month and covers your dedicated server, domain, and ongoing support.

Let me know if you have any questions!

Best,
Joe
Joe's Tech Solutions`,
  },
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

export default function PaymentLinksAdmin() {
  const sessionAuthenticated = useSyncExternalStore(
    subscribeToSessionStorage,
    getSessionStorageSnapshot("admin_auth", "true"),
    () => false
  );
  const [isAuthenticated, setIsAuthenticated] = useState(sessionAuthenticated);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="bg-card border-foreground/10 w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4">
              <Lock weight="duotone" className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-foreground/60 text-sm">Enter password to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <label htmlFor="admin-password" className="sr-only">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-background border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
                autoFocus
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/85 text-foreground py-6 rounded-xl"
              >
                Access Admin
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2 font-mono">
          Payment Links
        </h1>
        <p className="text-foreground/60 mb-8">
          Copy and send these to customers after 30min calls.
        </p>

        {/* Payment Link Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {Object.entries(PAYMENT_LINKS).map(([key, link]) => (
            <Card key={key} className="bg-card border-foreground/10">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${link.color}20` }}
                  >
                    <link.icon
                      weight="duotone"
                      className="h-6 w-6"
                      style={{ color: link.color }}
                    />
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
                <div className="p-3 bg-background rounded-lg border border-foreground/10">
                  <code className="text-sm text-foreground/80 break-all">{link.url}</code>
                </div>
                <div className="flex gap-3">
                  <CopyButton text={link.url} label="Copy Link" />
                  <CopyButton
                    text={EMAIL_TEMPLATES[key as keyof typeof EMAIL_TEMPLATES].body.replace("[PAYMENT_LINK]", link.url)}
                    label="Copy Email"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email Templates */}
        <h2 className="text-2xl font-bold text-foreground mb-4 font-mono">
          Email Templates
        </h2>
        <div className="space-y-6">
          {Object.entries(EMAIL_TEMPLATES).map(([key, template]) => (
            <Card key={key} className="bg-card border-foreground/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EnvelopeSimple weight="duotone" className="h-5 w-5 text-foreground/60" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {key === "local" ? "Local Setup" : key === "vps" ? "VPS Setup" : "VPS Monthly"} Email
                    </h3>
                  </div>
                  <CopyButton
                    text={template.body.replace(
                      "[PAYMENT_LINK]",
                      PAYMENT_LINKS[key as keyof typeof PAYMENT_LINKS].url
                    )}
                    label="Copy"
                  />
                </div>
                <p className="text-foreground/60 text-sm">
                  Subject: {template.subject}
                </p>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-background rounded-lg border border-foreground/10 text-sm text-foreground/70 whitespace-pre-wrap font-sans">
                  {template.body.replace(
                    "[PAYMENT_LINK]",
                    PAYMENT_LINKS[key as keyof typeof PAYMENT_LINKS].url
                  )}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Reference */}
        <div className="mt-12 p-6 bg-card rounded-xl border border-foreground/10">
          <h3 className="text-lg font-semibold text-foreground mb-3">Quick Reference</h3>
          <div className="space-y-2 text-foreground/70">
            <p><strong>Local:</strong> $199 one-time → 30-min walkthrough + 30 days email support</p>
            <p><strong>Cloud AI Server:</strong> $499 setup + $29/mo → Dedicated VPS + domain + monthly updates</p>
            <p><strong>Managed AI + Automation:</strong> $999 setup + $79/mo → Full service with n8n workflows</p>
            <p><strong>Cloud Monthly:</strong> $29/mo → Monthly subscription only (for existing customers)</p>
            <p><strong>Compliance add-on:</strong> +$100 → Healthcare, Legal, Financial, Therapy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
