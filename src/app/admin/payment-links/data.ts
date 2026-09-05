// Internal data for /admin/payment-links. Only ever imported by the server
// component, which renders it after the session cookie checks out — so the
// Stripe links, templates and internal pricing never ship to a logged-out
// browser (the previous client-side gate put all of it in the JS bundle).

export type PaymentLinkKey = "local" | "vps" | "vpsMonthly";

export type PaymentLink = {
  name: string;
  price: string;
  description: string;
  url: string;
  icon: "desktop" | "cloud";
  color: string;
};

export type EmailTemplate = { subject: string; body: string };

export const PAYMENT_LINKS: Record<PaymentLinkKey, PaymentLink> = {
  local: {
    name: "Private AI Local Setup",
    price: "$199",
    description: "One-time payment",
    url: "https://buy.stripe.com/9B6eVc58E5Fvb9reAJ0x200",
    icon: "desktop",
    color: "#02a0a0",
  },
  vps: {
    name: "Private AI Cloud Server Setup",
    price: "$499 + $29/mo",
    description: "Setup + Monthly hosting",
    url: "https://buy.stripe.com/8x200i30w3xna5n2S10x201",
    icon: "cloud",
    color: "#f5a94f",
  },
  vpsMonthly: {
    name: "Cloud AI Server Monthly",
    price: "$29/mo",
    description: "Monthly subscription only",
    url: "https://buy.stripe.com/4gM14mfNi2tjcdv0JT0x202",
    icon: "cloud",
    color: "#ffbd65",
  },
};

export const EMAIL_TEMPLATES: Record<PaymentLinkKey, EmailTemplate> = {
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

export const QUICK_REFERENCE = [
  { label: "Local", text: "$199 one-time → 30-min walkthrough + 30 days email support" },
  { label: "Cloud AI Server", text: "$499 setup + $29/mo → Dedicated VPS + domain + monthly updates" },
  { label: "Managed AI + Automation", text: "$999 setup + $79/mo → Full service with n8n workflows" },
  { label: "Cloud Monthly", text: "$29/mo → Monthly subscription only (for existing customers)" },
  { label: "Compliance add-on", text: "+$100 → Healthcare, Legal, Financial, Therapy" },
] as const;
