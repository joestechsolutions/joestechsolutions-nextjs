"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/FadeIn";
import { SaasComparisonTable } from "@/components/blog/SaasComparisonTable";
import { ArchitectureDiagram } from "@/components/blog/ArchitectureDiagram";
import { Callout } from "@/components/blog/Callout";
import { StatBlock } from "@/components/blog/StatBlock";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { TimelineStep } from "@/components/blog/TimelineStep";

const tocItems = [
  { id: "the-stack", label: "The Stack: Hermes + 24 Agents" },
  { id: "what-it-replaced", label: "What It Actually Replaced" },
  { id: "architecture", label: "The Architecture" },
  { id: "three-tier", label: "The 3-Tier Action Model" },
  { id: "monday-morning", label: "Real Example: Monday Morning" },
  { id: "safety-guardrails", label: "Safety & Guardrails" },
  { id: "lessons", label: "Lessons Learned" },
];

export function BlogContent() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="prose-blog space-y-8">
          {/* Table of Contents */}
          <FadeIn delay={0.1}>
            <TableOfContents items={tocItems} />
          </FadeIn>

          {/* Editor's note */}
          <FadeIn delay={0.12}>
            <p className="text-gray-400 italic text-base leading-relaxed mb-6">
              Editor&apos;s note (August 2026): this post is a snapshot from March. The team has since
              been consolidated to 14 agents — see the live setup at <a href="/stack" className="text-primary hover:underline">/stack</a>.
            </p>
          </FadeIn>

          {/* Intro */}
          <FadeIn delay={0.15}>
            <p className="lead text-gray-200 text-xl sm:text-2xl leading-loose mb-8">
              Most &ldquo;AI automation&rdquo; content is someone connecting Zapier to ChatGPT and calling it a day.
              No shade — that works for some people. But when you&apos;re a developer launching a business,
              you face a choice: buy 10+ SaaS tools at $200-300/mo, or build something smarter.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="text-gray-200 text-lg leading-loose mb-6">
              I wanted Jarvis. Not the Marvel version — the version where I wake up
              and my AI has already triaged my inbox, checked my deployments, drafted a proposal for a new client,
              and reminded me that my SSL cert expires in 6 days.
            </p>
            <p className="text-gray-200 text-lg leading-loose mb-8">So instead of buying a stack of SaaS subscriptions, I built 24 AI agents to do it all.</p>
          </FadeIn>

          {/* Stats block */}
          <StatBlock
            stats={[
              { value: 24, suffix: "", label: "AI Agents", color: "from-primary/10 to-transparent" },
              { value: 285, prefix: "$", label: "Typical SaaS Cost Avoided/mo", color: "from-red-500/10 to-transparent" },
              { value: 0, prefix: "$", label: "Marginal Cost", color: "from-emerald-500/10 to-transparent" },
              { value: 8, suffix: "h", label: "Saved Weekly", color: "from-primary/10 to-transparent" },
            ]}
          />

          {/* The Stack */}
          <FadeIn>
            <h2 id="the-stack" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">The Stack: Hermes + 24 Specialized Agents</h2>
            <p className="text-gray-200 text-lg leading-loose mb-6">
              One orchestrator agent (Lurkr) that sits on top of 24 sub-agents. Each one has a lane:
            </p>
          </FadeIn>

          <FadeIn>
            <ul className="space-y-2 mb-10 text-gray-200 text-base leading-loose">
              <li><strong className="text-foreground">Forge</strong> — code, PRs, reviews, CI/CD</li>
              <li><strong className="text-foreground">Radar</strong> — lead gen, competitive research</li>
              <li><strong className="text-foreground">Muse</strong> — content creation</li>
              <li><strong className="text-foreground">Helm</strong> — infrastructure, deployments</li>
              <li><strong className="text-foreground">Beacon</strong> — SEO health, indexing</li>
              <li><strong className="text-foreground">Ledger</strong> — revenue, invoicing</li>
              <li><strong className="text-foreground">Bridge</strong> — email triage, drafts</li>
              <li><strong className="text-foreground">Scout</strong> — calendar, reminders</li>
              <li>...and 16 more covering everything from video generation to backup verification.</li>
            </ul>
          </FadeIn>

          <Callout variant="insight">
            The whole thing runs on <a href="/stack" className="text-primary underline underline-offset-2 hover:text-primary">Hermes</a>, my agent runtime, deployed on my own local Linux machine. Not a cloud VPS. Not Kubernetes. <strong>One box in my house.</strong>
          </Callout>

          {/* Comparison Table */}
          <FadeIn>
            <h2 id="what-it-replaced" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">The SaaS Tools I Never Had to Buy</h2>
            <p className="text-gray-200 text-lg leading-loose mb-10">Here&apos;s what running a solo dev business typically costs. I skipped all of it:</p>
          </FadeIn>

          <SaasComparisonTable />

          <Callout variant="tip">
            <p className="mb-0">
              Here&apos;s the kicker: I already pay for the subscriptions my agents run on — Claude Code (frontier Opus 5 + Fable 5/5.1) and Ollama Cloud — for daily development work. 
              The 24 agents run on those <strong>same subscriptions at zero marginal cost</strong>. So I avoided $285/mo in SaaS subscriptions with effectively $0 additional spend. Not every task needs the most powerful model — Opus 5 and Fable run the frontier work, the routed cloud models handle most sub-agents, lightweight models run checks. All included.
            </p>
          </Callout>

          {/* Architecture */}
          <FadeIn>
            <h2 id="architecture" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">The Architecture (Keep It Simple)</h2>
            <p className="text-gray-200 text-lg leading-loose mb-10">
              Each agent is a system prompt + relevant tools (API keys, scripts, file paths) + memory files (daily logs + long-term context). That&apos;s it. No vector databases required. No LangChain. No framework soup. I control everything through Telegram — one interface for morning briefings, deployment confirmations, draft proposals, revenue reports. No dashboards. No web UIs. Just my phone. When agents hit complex coding tasks, Claude Code runs on the same machine as the escape hatch for heavy-duty development work. The toolkit includes image/video generation (Gemini, ElevenLabs), Google Workspace, GitHub, Stripe, Notion, plus custom scripts for deployments, invoicing, and CRM.
            </p>
          </FadeIn>

          <ArchitectureDiagram />

          {/* 3-Tier Model */}
          <FadeIn>
            <h2 id="three-tier" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">The 3-Tier Action Model</h2>
            <p className="text-gray-200 text-lg leading-loose mb-10">
              The thing that makes this actually useful instead of terrifying:
            </p>
          </FadeIn>

          <FadeIn>
            <div className="space-y-5 my-10">
              {[
                {
                  tier: "AUTO",
                  color: "emerald",
                  desc: "Agent does it silently.",
                  examples: "Reading files, running checks, updating logs.",
                },
                {
                  tier: "NOTIFY",
                  color: "amber",
                  desc: "Agent does it and tells me.",
                  examples: "Drafts an email, prepares a report.",
                },
                {
                  tier: "CONFIRM",
                  color: "red",
                  desc: "Agent proposes it and waits.",
                  examples: "Sending emails, deploying code, anything external.",
                },
              ].map((item) => (
                <div
                  key={item.tier}
                  className={`border rounded-xl p-6 ${
                    item.color === "emerald"
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : item.color === "amber"
                      ? "border-amber-500/20 bg-amber-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-bold font-mono px-2.5 py-1 rounded ${
                        item.color === "emerald"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : item.color === "amber"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {item.tier}
                    </span>
                    <span className="text-gray-200 text-sm font-medium">{item.desc}</span>
                  </div>
                  <p className="text-foreground/60 text-sm ml-0 mb-0 leading-relaxed">{item.examples}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <Callout variant="warning">
            This is the difference between &ldquo;AI that helps&rdquo; and &ldquo;AI that sends weird emails to your clients at 3 AM.&rdquo;
          </Callout>

          {/* Monday Morning */}
          <FadeIn>
            <h2 id="monday-morning" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">Real Example: Monday Morning</h2>
            <p className="text-gray-200 text-lg leading-loose mb-10">Here&apos;s what happened last Monday, entirely through Telegram, before I even opened my laptop:</p>
          </FadeIn>

          <div className="my-10 border border-foreground/10 rounded-xl bg-foreground/[0.02] p-8">
            <TimelineStep time="9:00 AM" index={0}>
              <strong>Lurk Report</strong> drops in my Telegram DM:
              <ul className="mt-3 space-y-2 text-foreground/60 text-sm list-disc list-inside">
                <li>3 new emails (1 client inquiry, 1 invoice paid, 1 spam)</li>
                <li>GitHub: 2 PRs ready for review, CI green across all repos</li>
                <li>Revenue: $2,400 collected last 7 days, +15% WoW</li>
                <li>Calendar: 2 meetings today, one has a conflict → suggested resolution</li>
                <li>RenFaire Directory: 3 new contact form submissions</li>
              </ul>
            </TimelineStep>
            <TimelineStep time="9:01 AM" index={1}>
              I reply in Telegram: <span className="text-primary font-mono text-xs">&quot;send that proposal to Nick&quot;</span> (a client from last week)
            </TimelineStep>
            <TimelineStep time="9:02 AM" index={2}>
              Lurkr orchestrates → Muse (content agent) generates proposal from template → result comes back to my Telegram with the PDF preview, asking permission to send
            </TimelineStep>
            <TimelineStep time="9:02 AM" index={3}>
              I reply in Telegram: <span className="text-primary font-mono text-xs">&quot;send it&quot;</span>
            </TimelineStep>
            <TimelineStep time="9:03 AM" index={4}>
              <strong>Done.</strong> Email sent, confirmation delivered back to my Telegram. Coffee&apos;s not even ready. ☕
            </TimelineStep>
          </div>

          <FadeIn>
            <p className="text-gray-200 text-lg leading-loose mb-8 mt-8">
              The key here: <strong className="text-foreground">every step happened in one Telegram thread.</strong> No switching apps. 
              No logging into dashboards. No &quot;let me check the CRM.&quot; Just a conversation with an AI 
              that has access to everything and reports back in the same place.
            </p>
          </FadeIn>

          {/* Safety & Guardrails */}
          <FadeIn>
            <h2 id="safety-guardrails" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">Safety &amp; Guardrails</h2>
            <p className="text-gray-200 text-lg leading-loose mb-10">
              &ldquo;24 AI agents with access to your business tools&rdquo; sounds dangerous. Here&apos;s how it&apos;s not:
            </p>
          </FadeIn>

          <div className="my-12">
            <Image
              src="/images/blog/ai-control-panel.png"
              alt="AI Control Panel and Safety Systems"
              width={1920}
              height={1072}
              className="w-full rounded-xl border border-foreground/10 shadow-2xl"
              style={{ height: "auto" }}
            />
          </div>

          <FadeIn>
            <ul className="space-y-4 mb-10 text-gray-200 text-lg leading-loose">
              <li><strong className="text-foreground">Kill switch via Telegram</strong> — I can stop anything instantly from my phone. No SSH. No dashboard. Just one command.</li>
              <li><strong className="text-foreground">The 3-tier action model</strong> — Agents can&apos;t send emails, push code, or deploy without explicit approval. Everything goes through CONFIRM tier.</li>
              <li><strong className="text-foreground">Cost controls</strong> — Model tiering (Opus/Sonnet/Haiku), cron job timeouts, fallback to cheaper models on rate limits, monthly spend monitoring.</li>
              <li><strong className="text-foreground">Security boundaries</strong> — No auto-send on external actions, UFW firewall active, secrets protected in env vars, external content treated as untrusted, agents can&apos;t self-modify.</li>
              <li><strong className="text-foreground">Full audit trail</strong> — Daily memory files, morning briefing, failed jobs surface automatically, revenue and costs tracked.</li>
            </ul>
          </FadeIn>

          <Callout variant="warning">
            <p className="mb-0">
              I built this to be <strong>useful, not dangerous</strong>. The safeguards aren&apos;t afterthoughts — they&apos;re core design. 
              This is production infrastructure, not a demo that works until it doesn&apos;t.
            </p>
          </Callout>

          {/* Lessons */}
          <FadeIn>
            <h2 id="lessons" className="pt-16 text-foreground text-3xl sm:text-4xl font-bold mb-6">Lessons Learned</h2>
          </FadeIn>

          <FadeIn>
            <ul className="space-y-3 mb-10 text-gray-200 text-lg leading-loose">
              <li><strong className="text-foreground">Start with one agent, not twenty-four.</strong> Build incrementally. Get email triage working, then expand.</li>
              <li><strong className="text-foreground">Memory is everything.</strong> Daily logs + long-term memory files make Lurkr actually useful across sessions.</li>
              <li><strong className="text-foreground">Don&apos;t over-automate sending.</strong> Draft everything, send nothing without approval. I learned this the hard way.</li>
            </ul>
          </FadeIn>

          <FadeIn>
            <p className="text-gray-200 text-lg leading-loose mb-6">
              If you&apos;re a developer who runs a freelance business or small agency, the ROI is insane. Not just avoiding $200-300/mo in SaaS, but the time — I save 6-8 hours a week on admin work. 
              If you&apos;re not technical? Wait a year. The tooling will get easier. But if you&apos;re curious, start with{" "}
              <a href="/stack" className="text-primary underline underline-offset-2 hover:text-primary">the stack I run</a>{" "}
              and just get one automation working.
            </p>
          </FadeIn>

          <Callout variant="insight">
            The future isn&apos;t &ldquo;AI replaces developers.&rdquo; It&apos;s <strong>&ldquo;developers with AI agents are
            10x more effective than developers without them.&rdquo;</strong>
            <br /><br />
            And yeah, that&apos;s a competitive advantage I plan to keep.
          </Callout>
        </div>
      </div>
    </section>
  );
}
