// site-assistant — the chat widget behind joestechsolutions.com.
//
// Forked from the older `ai-customer-service` function, which was written for a
// since-retired image/video SaaS: it quoted credit packs and subscription tiers,
// and it refused to pass anonymous visitors through to Joe. On a marketing site
// every visitor is anonymous, so that logic dropped exactly the leads it should
// have captured. This version answers from the live site and always lets a
// visitor reach Joe.
//
// Kept from the original: retrieval over the site's own sitemap, so the answers
// track the site without a knowledge base to maintain.
//
// Secrets: REPLICATE_API_TOKEN (required), OPENAI_API_KEY (optional — better
// retrieval), RESEND_API_KEY (optional — lead email). SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY are injected by the platform.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE = "https://www.joestechsolutions.com";
const OWNER_EMAIL = "joe@joestechsolutions.com";

const ALLOWED_ORIGINS = [
  "https://joestechsolutions.com",
  "https://www.joestechsolutions.com",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : SITE;
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
  };
}

const SYSTEM_PROMPT = `You are the assistant on Joe's Tech Solutions (joestechsolutions.com). Joe Blas is a solo forward-deployed engineer who builds custom software, automation and private AI for small businesses.

WHAT JOE OFFERS — three ways to work together:
- Setup (one-time): private AI on the client's own machine or server. A 75-minute live session, one on one. They own it afterwards — no subscription, no data leaving their setup. Page: /private-ai-setup
- Operations (monthly retainer): an AI assistant running on the client's server handling scheduling, outreach, reporting and daily briefings. Joe tunes it every month. Page: /services#back-office
- Custom Build (project-based): mobile and web apps and full agent systems, built in React Native and Next.js, AI-assisted and human-verified. Page: /services#custom-build
There is also Google Maps Growth — an agent that runs a local business's Google Business Profile (posts, review replies, photos, keywords). Page: /google-maps-growth

HOW HE WORKS: no discovery calls, no 40-page proposals. Tell him what is broken, he builds the fix and leaves it running. He runs the same stack for his own business that he builds for clients.

PRICING: never invent numbers. Prices are quoted per project through the contact page. Private AI Setup is the one product with online checkout. If asked about cost, say it is quoted per project and offer to put them in touch.

RULES:
- Answer ONLY from the SITE CONTEXT below and the facts above. If it is not there, say you do not know and offer to pass the question to Joe.
- Never invent case studies, client names, metrics, prices or timelines.
- Be concise and concrete: 2-4 sentences typically. Plain, direct, no hype, no emoji.
- Link to the relevant page when it helps (use the path, e.g. /private-ai-setup).
- Anyone can reach Joe. If someone wants to talk, has a project, or asks for a human, invite them to leave an email address in the chat and say you will pass it to Joe, or point them at /contact. Never ask anyone to create an account — there are no accounts.`;

function stripHtml(html: string): string {
  try {
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

async function fetchSitemapUrls(): Promise<string[]> {
  try {
    const res = await fetch(`${SITE}/sitemap.xml`, {
      headers: { "User-Agent": "JTS-SiteAssistant/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g))
      .map((m) => m[1])
      .filter((u) => u.startsWith("https://") && u.includes("joestechsolutions.com"));
  } catch {
    return [];
  }
}

async function fetchPageText(url: string): Promise<{ url: string; text: string }> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "JTS-SiteAssistant/1.0" } });
    if (!res.ok) return { url, text: "" };
    return { url, text: stripHtml(await res.text()).slice(0, 8000) };
  } catch {
    return { url, text: "" };
  }
}

function keywordScore(text: string, query: string): number {
  const words = query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
  const haystack = text.toLowerCase();
  return words.reduce((n, w) => n + (haystack.includes(w) ? 1 : 0), 0);
}

function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

// Rank the site's own pages against the question. Embeddings when a key is
// present, keyword overlap otherwise — the fallback keeps the widget useful
// rather than silent.
async function buildSiteContext(query: string): Promise<string> {
  const fallbackUrls = [
    `${SITE}/`, `${SITE}/services`, `${SITE}/solutions`,
    `${SITE}/private-ai-setup`, `${SITE}/portfolio`, `${SITE}/about`,
    `${SITE}/stack`, `${SITE}/contact`,
  ];
  const sitemap = await fetchSitemapUrls();
  const urls = (sitemap.length ? sitemap : fallbackUrls).slice(0, 12);

  const settled = await Promise.allSettled(urls.map(fetchPageText));
  const pages = settled
    .flatMap((r) => (r.status === "fulfilled" ? [r.value] : []))
    .filter((p) => p.text.length > 80);
  if (!pages.length) return "";

  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  const byKeyword = () =>
    pages
      .map((p) => ({ p, score: keywordScore(p.text, query) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ p }) => `URL: ${p.url}\n${p.text.slice(0, 2600)}`)
      .join("\n\n");

  if (!openaiKey) return byKeyword();

  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: { Authorization: `Bearer ${openaiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: [query, ...pages.map((p) => p.text.slice(0, 4000))],
      }),
    });
    if (!res.ok) return byKeyword();
    const vectors: number[][] = (await res.json()).data.map((d: { embedding: number[] }) => d.embedding);
    return pages
      .map((p, i) => ({ p, sim: cosine(vectors[0], vectors[i + 1]) }))
      .sort((a, b) => b.sim - a.sim)
      .slice(0, 3)
      .map(({ p }) => `URL: ${p.url}\n${p.text.slice(0, 2600)}`)
      .join("\n\n");
  } catch {
    return byKeyword();
  }
}

async function answer(question: string, history: string, siteContext: string): Promise<string> {
  const token = Deno.env.get("REPLICATE_API_TOKEN");
  if (!token) throw new Error("REPLICATE_API_TOKEN is not set");

  const prompt = [
    siteContext ? `SITE CONTEXT (from ${SITE}):\n${siteContext}` : "",
    history ? `Earlier in this conversation:\n${history}` : "",
    `Visitor: ${question}`,
  ].filter(Boolean).join("\n\n");

  const created = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: { Authorization: `Token ${token}`, "Content-Type": "application/json", Prefer: "wait=55" },
    body: JSON.stringify({
      version: "openai/gpt-4.1-mini",
      input: { prompt, system_prompt: SYSTEM_PROMPT, max_completion_tokens: 600, temperature: 0.4 },
    }),
  });
  if (!created.ok) throw new Error(`Replicate ${created.status}: ${await created.text()}`);

  let prediction = await created.json();
  for (let i = 0; i < 30 && !["succeeded", "failed", "canceled"].includes(prediction.status); i++) {
    await new Promise((r) => setTimeout(r, 1000));
    prediction = await (
      await fetch(prediction.urls.get, { headers: { Authorization: `Token ${token}` } })
    ).json();
  }
  if (prediction.status !== "succeeded") throw new Error(`Prediction ${prediction.status}`);

  const out = prediction.output;
  return (Array.isArray(out) ? out.join("") : String(out ?? "")).trim();
}

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;
const WANTS_HUMAN =
  /\b(talk to joe|speak to joe|contact joe|reach joe|a human|real person|call me|email me|get in touch|hire|quote|proposal)\b/i;

// Anyone can reach Joe — that is the whole point of the widget.
async function notifyOwner(payload: {
  email: string | null;
  message: string;
  reply: string;
  page: string;
  sessionId: string;
}) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    console.warn("[lead] RESEND_API_KEY not set — lead recorded in DB only", payload.sessionId);
    return;
  }
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "JTS Site Assistant <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        reply_to: payload.email ?? undefined,
        subject: payload.email
          ? `Lead from the site chat: ${payload.email}`
          : "Someone on the site chat asked for you",
        text: [
          payload.email ? `Email: ${payload.email}` : "Email: (not given)",
          `Page: ${payload.page}`,
          `Session: ${payload.sessionId}`,
          "",
          `They said:\n${payload.message}`,
          "",
          `Assistant replied:\n${payload.reply}`,
        ].join("\n"),
      }),
    });
  } catch (e) {
    console.error("[lead] Resend failed:", e);
  }
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...cors, "Content-Type": "application/json" },
    });

  try {
    const { message, session_id, page_context } = await req.json();
    if (typeof message !== "string" || !message.trim()) {
      return json({ error: "Message is required." }, 400);
    }
    if (message.length > 2000) return json({ error: "Message too long." }, 400);

    const sessionId: string = session_id || crypto.randomUUID();
    const page: string = page_context?.url ?? "unknown";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: past } = await supabase
      .from("chat_conversations")
      .select("type, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(8);
    const history = (past ?? [])
      .map((m: { type: string; content: string }) =>
        `${m.type === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n");

    const siteContext = await buildSiteContext(message);
    const reply = await answer(message, history, siteContext);

    await supabase.from("chat_conversations").insert([
      { session_id: sessionId, type: "user", content: message, page_context: page },
      { session_id: sessionId, type: "assistant", content: reply, page_context: page },
    ]);

    const email = message.match(EMAIL_RE)?.[0] ?? null;
    const isLead = Boolean(email) || WANTS_HUMAN.test(message);
    if (isLead) {
      // Direct insert rather than create_customer_escalation(): that RPC wants a
      // user_id and conversation_id, and site visitors have neither.
      const { error: escalationError } = await supabase.from("customer_escalations").insert({
        escalation_type: email ? "lead_with_email" : "wants_human",
        customer_message: message,
        ai_response: reply,
        priority: email ? 1 : 2,
        customer_context: { email, page, session_id: sessionId, source: "site-assistant" },
      });
      if (escalationError) console.warn("[lead] escalation insert failed:", escalationError.message);
      await notifyOwner({ email, message, reply, page, sessionId });
    }

    return json({ content: reply, session_id: sessionId, lead_captured: isLead });
  } catch (error) {
    console.error("site-assistant error:", error);
    return json(
      {
        content:
          `I'm having trouble answering right now. Email Joe directly at ${OWNER_EMAIL} — he usually replies within a day.`,
        error: true,
      },
      200, // the widget shows this as a message rather than a broken state
    );
  }
});
