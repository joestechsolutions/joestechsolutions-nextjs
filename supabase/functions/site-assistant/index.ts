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
// Secrets: OLLAMA_API_KEY (chat via Ollama Cloud; REPLICATE_API_TOKEN is the
// fallback if it is missing), RESEND_API_KEY (lead email). Each is read from
// the function's env first, then from Supabase Vault via public.get_secret()
// (service-role only), so keys can be rotated in Vault without a redeploy.
// No OpenAI anywhere: retrieval is keyword overlap over the sitemap, which is
// plenty for ~15 pages. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are
// injected by the platform.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE = "https://www.joestechsolutions.com";
const OWNER_EMAIL = "joe@joestechsolutions.com";

// Per-IP fixed window. Generous for a real conversation, tight enough that a
// script cannot run up the Replicate bill. Checked before any model call, so
// a blocked request costs nothing.
const RATE_LIMIT = 30;
const RATE_WINDOW = "1 hour";

// Joe's default model on his own stack (see /stack). Cheap, fast, tool-capable.
const OLLAMA_MODEL = "glm-5.3-flash";

type Admin = ReturnType<typeof createClient>;

// Env first, Vault second. Cached per isolate so it is one RPC per cold start,
// not one per message.
const secretCache = new Map<string, string | null>();
async function getSecret(supabase: Admin, name: string): Promise<string | null> {
  const fromEnv = Deno.env.get(name);
  if (fromEnv) return fromEnv;
  if (secretCache.has(name)) return secretCache.get(name) ?? null;
  const { data, error } = await supabase.rpc("get_secret", { p_name: name });
  if (error) console.warn(`[secrets] vault read failed for ${name}:`, error.message);
  const value = typeof data === "string" && data ? data : null;
  secretCache.set(name, value);
  return value;
}

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

const SYSTEM_PROMPT = `You are the assistant on Joe's Tech Solutions (joestechsolutions.com). Joe Blas is a solo Forward Deployed Engineer who builds custom software, automation and private AI for small businesses. He shows up where the work is, figures out what is broken, and leaves it running.

WHAT JOE OFFERS \u2014 three ways to work together:
- Setup (one-time): private AI on the client's own machine, cloud server, or fully managed. A 75-minute live session, one on one. They own it afterwards \u2014 no subscription, no per-query API fees, no data leaving their setup. Starter kits for nine industries. Page: /private-ai-setup
- Operations (monthly retainer): an AI assistant running on the client's own server handling scheduling, outreach, reporting and daily briefings. Joe tunes it every month. Page: /services#back-office
- Custom Build (project-based): mobile and web apps and full agent systems in React Native and Next.js, AI-assisted and human-verified, scoped and priced before any code, client owns the code and repo. Page: /services#custom-build
Also: Google Maps Growth, an agent that runs a local business's Google Business Profile with human review on high-stakes replies (/google-maps-growth). Free: Whisper Walkie, an open-source local dictation app (/whisper-walkie), and Joe's own prompt library (/prompt-library). Case studies on /portfolio, his running infrastructure on /stack, writing on /blog.

HOW HE WORKS: no discovery calls, no 40-page proposals, no agency. Email only \u2014 joe@joestechsolutions.com \u2014 and he replies within 24 hours. He runs the same stack for his own business that he builds for clients: one orchestrator, 40+ scheduled automations, three clients with live deployments, local-first on his own hardware.

PRICING: never invent numbers. Everything is quoted per project by email. Private AI Setup is the one product with online checkout.

RULES:
- Answer from the CURATED FACTS and SITE CONTEXT provided. Curated facts win if they disagree with a page.
- If the answer is not there, say plainly that it is not something the site covers and offer to pass the question to Joe. Do not guess.
- Never invent case studies, client names, metrics, prices, timelines, locations or hours.
- Be concise and concrete: 2-4 sentences. Plain, direct, no hype, no emoji, no bullet lists unless listing options.
- Link to the relevant page path when it helps (e.g. /private-ai-setup).
- Anyone can reach Joe. If someone wants to talk, has a project, or asks for a human, invite them to leave an email address in the chat (you will pass it to Joe) or point them to /contact. Never ask anyone to create an account \u2014 there are no accounts.`;

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

// Pages that carry the answers to most questions; always fetched.
const CORE_PAGES = ["/", "/services", "/about", "/contact", "/private-ai-setup"];

function queryWords(query: string): string[] {
  return query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
}

// Cheap first pass: score every sitemap URL by its slug so the whole site is in
// play (the sitemap is ~30 URLs and /about and /stack sit at the end of it).
// Then fetch only the winners and score their text. Two-stage, so a question
// about healthcare reaches /private-ai-setup/industries/healthcare without
// downloading the whole site per message.
async function buildSiteContext(query: string): Promise<string> {
  const words = queryWords(query);
  const sitemap = await fetchSitemapUrls();
  const all = sitemap.length ? sitemap : CORE_PAGES.map((p) => `${SITE}${p}`);

  const bySlug = all
    .map((url) => {
      const slug = url.replace(SITE, "").replace(/[-/]+/g, " ").toLowerCase();
      return { url, score: words.reduce((n, w) => n + (slug.includes(w) ? 2 : 0), 0) };
    })
    .sort((a, b) => b.score - a.score);
  const picked = new Set<string>(CORE_PAGES.map((p) => `${SITE}${p}`));
  for (const { url, score } of bySlug) {
    if (picked.size >= 9) break;
    if (score > 0) picked.add(url);
  }
  // Fill remaining slots with the sitemap order so blog/industry pages still get a look.
  for (const url of all) {
    if (picked.size >= 9) break;
    picked.add(url);
  }

  const settled = await Promise.allSettled([...picked].map(fetchPageText));
  const pages = settled
    .flatMap((r) => (r.status === "fulfilled" ? [r.value] : []))
    .filter((p) => p.text.length > 80);
  if (!pages.length) return "";

  return pages
    .map((p) => ({ p, score: keywordScore(p.text, query) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ p }) => `URL: ${p.url}\n${p.text.slice(0, 2400)}`)
    .join("\n\n");
}

// Curated answers in knowledge_base_articles: facts that are true but thin or
// scattered on the pages, plus anything Joe adds after reviewing
// unanswered_questions. Matched on keywords, title and content.
async function buildFaqContext(supabase: Admin, query: string): Promise<string> {
  const words = queryWords(query);
  if (!words.length) return "";
  const { data, error } = await supabase
    .from("knowledge_base_articles")
    .select("title, content, search_keywords, priority")
    .eq("is_published", true)
    .limit(60);
  if (error || !data?.length) return "";
  const scored = (data as { title: string; content: string; search_keywords: string[] | null; priority: number | null }[])
    .map((a) => {
      const hay = `${a.title} ${a.content}`.toLowerCase();
      const kws = (a.search_keywords ?? []).map((k) => k.toLowerCase());
      const score =
        words.reduce((n, w) => n + (kws.some((k) => k.includes(w) || w.includes(k)) ? 3 : hay.includes(w) ? 1 : 0), 0) +
        (a.priority ?? 0) / 10;
      return { a, score };
    })
    .filter(({ score }) => score >= 1)
    .sort((x, y) => y.score - x.score)
    .slice(0, 3);
  return scored.map(({ a }) => `FAQ \u2014 ${a.title}:\n${a.content}`).join("\n\n");
}

function buildUserPrompt(question: string, history: string, siteContext: string, faq: string): string {
  return [
    faq ? `CURATED FACTS (authoritative, prefer these):\n${faq}` : "",
    siteContext ? `SITE CONTEXT (from ${SITE}):\n${siteContext}` : "",
    history ? `Earlier in this conversation:\n${history}` : "",
    `Visitor: ${question}`,
  ].filter(Boolean).join("\n\n");
}

async function answerWithOllama(prompt: string, key: string): Promise<string> {
  const res = await fetch("https://ollama.com/api/chat", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      // think:true routes the model's reasoning into message.thinking, which we
      // drop. With think:false glm-5.3-flash narrates its reasoning inside
      // content instead — verified — so this is the clean setting.
      think: true,
      options: { temperature: 0.4, num_predict: 600 },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = String(data?.message?.content ?? "").replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  if (!text) throw new Error("Ollama returned no content");
  return text;
}

// Kept only as a fallback while OLLAMA_API_KEY is being provisioned.
async function answerWithReplicate(prompt: string, token: string): Promise<string> {
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
    prediction = await (await fetch(prediction.urls.get, { headers: { Authorization: `Token ${token}` } })).json();
  }
  if (prediction.status !== "succeeded") throw new Error(`Prediction ${prediction.status}`);
  const out = prediction.output;
  return (Array.isArray(out) ? out.join("") : String(out ?? "")).trim();
}

async function answer(
  supabase: Admin,
  question: string,
  history: string,
  siteContext: string,
  faq: string,
): Promise<{ text: string; model: string }> {
  const prompt = buildUserPrompt(question, history, siteContext, faq);
  const ollamaKey = await getSecret(supabase, "OLLAMA_API_KEY");
  if (ollamaKey) return { text: await answerWithOllama(prompt, ollamaKey), model: `ollama/${OLLAMA_MODEL}` };

  const replicateToken = await getSecret(supabase, "REPLICATE_API_TOKEN");
  if (!replicateToken) throw new Error("Neither OLLAMA_API_KEY nor REPLICATE_API_TOKEN is set");
  console.warn("[model] OLLAMA_API_KEY not set \u2014 falling back to Replicate");
  return { text: await answerWithReplicate(prompt, replicateToken), model: "replicate/gpt-4.1-mini" };
}

// Supabase's gateway overwrites X-Forwarded-For with the real client address
// (verified: a spoofed header did not reach the limiter), so the first entry is
// the caller. Validate it anyway: anything that would not cast to inet is
// bucketed together as 0.0.0.0 rather than erroring into the fail-open path.
const IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;
const IPV6 = /^[0-9a-f:]+$/i;
function clientIp(req: Request): string {
  const raw =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    "";
  const ip = raw.trim();
  return IPV4.test(ip) || (ip.includes(":") && IPV6.test(ip)) ? ip : "0.0.0.0";
}

const UNANSWERED =
  /\b(i (do not|don't) (know|have that)|not (on|covered by) the site|isn't (mentioned|covered)|no (mention|information) (of|about)|pass (your|that|this) (question|along) to joe)\b/i;

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;
const WANTS_HUMAN =
  /\b(talk to joe|speak to joe|contact joe|reach joe|a human|real person|call me|email me|get in touch|hire|quote|proposal)\b/i;

// Anyone can reach Joe — that is the whole point of the widget.
async function notifyOwner(supabase: Admin, payload: {
  email: string | null;
  message: string;
  reply: string;
  page: string;
  sessionId: string;
}) {
  const key = await getSecret(supabase, "RESEND_API_KEY");
  if (!key) {
    console.warn("[lead] RESEND_API_KEY not set — lead recorded in DB only", payload.sessionId);
    return;
  }
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "JTS Site Assistant <leads@subscribe.joestechsolutions.com>", // verified domain in Resend
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

    // Rate limit first — before retrieval or the model, so abuse is free to reject.
    // Fails open: a limiter outage should not take the chat down with it.
    const { data: allowed, error: limitError } = await supabase.rpc("check_chat_rate_limit", {
      p_ip: clientIp(req),
      p_limit: RATE_LIMIT,
      p_window: RATE_WINDOW,
    });
    if (limitError) console.warn("[rate-limit] check failed, allowing:", limitError.message);
    if (allowed === false) {
      return json(
        {
          content:
            `That's a lot of messages for one hour. Email Joe directly at ${OWNER_EMAIL} and he'll pick it up.`,
          rate_limited: true,
        },
        429,
      );
    }

    const { data: past } = await supabase
      .from("chat_conversations")
      .select("type, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(12);
    const history = (past ?? [])
      .map((m: { type: string; content: string }) =>
        `${m.type === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n");

    const [siteContext, faq] = await Promise.all([
      buildSiteContext(message),
      buildFaqContext(supabase, message),
    ]);
    const { text: reply, model } = await answer(supabase, message, history, siteContext, faq);

    // The learning loop: replies that admit a gap are flagged so they surface
    // in the unanswered_questions view for Joe to turn into FAQ rows.
    const unanswered = UNANSWERED.test(reply);
    await supabase.from("chat_conversations").insert([
      { session_id: sessionId, type: "user", content: message, page_context: page },
      { session_id: sessionId, type: "assistant", content: reply, page_context: page, metadata: { model, unanswered } },
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
      await notifyOwner(supabase, { email, message, reply, page, sessionId });
    }

    return json({ content: reply, session_id: sessionId, lead_captured: isLead, model });
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
