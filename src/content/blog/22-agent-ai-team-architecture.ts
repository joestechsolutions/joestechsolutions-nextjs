import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "22-agent-ai-team-architecture",
  title: "I Built a 22-Agent AI Team to Run My Business — Here's the Architecture",
  excerpt:
    "I run a one-man AI consultancy with a 22-agent team that works 24/7. They hold standups, find leads, write proposals, build code, and send invoices. This isn't a demo — it's running in production right now.",
  date: "2026-02-18",
  readTime: 8,
  author: "Joe Blas",
  tags: ["AI Agents", "Automation", "Hermes", "Architecture", "Small Business"],
  seo: {
    title:
      "I Built a 22-Agent AI Team to Run My Business — Here's the Architecture | Joe's Tech Solutions",
    description:
      "How I built a 22-agent AI system that handles ops, sales, engineering, and marketing for my one-man consultancy. Not a concept — running in production on Hermes.",
    ogImage: "/images/blog/22-agent-architecture-og.png",
  },
  images: {
    "/images/blog/22-agent-org-chart.png": { width: 2000, height: 1776 },
    "/images/blog/22-agent-architecture.png": { width: 2200, height: 2050 },
    "/images/blog/22-agent-standup.png": { width: 900, height: 870 },
    "/images/blog/22-agent-workflow.png": { width: 2200, height: 3250 },
  },
  content: `
<p><em>Editor's note (July 2026): this post is a snapshot from February. The system has since been rebuilt around one orchestrator with executive skills, VPs, and worker agents spawned on demand — see the live setup at <a href="/stack">/stack</a>.</em></p>

<p class="lead">I run a one-man AI consultancy out of San Diego. No employees, no contractors, no VA. Just me.</p>

<p>But I have a 22-agent team that works 24/7. They hold morning standups. They find leads, write proposals, build code, review PRs, deploy services, send invoices, and create marketing content. They report to four directors, who report to a CTO, who reports to me.</p>

<p>This isn't a demo. It's not a proof of concept I built over a weekend. It's running in production <em>right now</em> on <a href="/stack">Hermes</a>, handling real client work for Joe's Tech Solutions.</p>

<p>Here's how the whole thing is wired together.</p>

<video autoplay loop muted playsinline style="width:100%;border-radius:12px;margin:2rem 0;">
  <source src="/images/blog/22-agent-video.mp4" type="video/mp4" />
</video>

<h2>The Org Chart</h2>

<img src="/images/blog/22-agent-org-chart.png" alt="JTS 22-Agent Architecture — Org Chart showing Joe, Lurkr CTO, 4 Directors, and 18 team agents across Operations, Business, Engineering, and Skate Workshop divisions" loading="lazy" />

<p>At the top, there's me. Below me is <strong>Lurkr</strong>, the CTO and orchestrator, running on Claude Opus 4.6. Lurkr is the brain — it coordinates everything, makes judgment calls, and is the only agent that talks to me directly unless I go looking.</p>

<p>Under Lurkr, four <strong>Director agents</strong> (all Claude Sonnet 4.5) each run a division:</p>

<ul>
<li><strong>Chief</strong> — Operations</li>
<li><strong>Summit</strong> — Business & Growth</li>
<li><strong>Nexus</strong> — Engineering</li>
<li><strong>Halfpipe</strong> — The Skate Workshop (more on this one later)</li>
</ul>

<h3>Operations (Chief)</h3>
<ul>
<li><strong>Bridge</strong> — Client communications: email, follow-ups, scheduling confirmations</li>
<li><strong>Dispatch</strong> — Calendar management, scheduling, time allocation</li>
<li><strong>Ledger</strong> — Invoicing, payment tracking, financial ops via Stripe</li>
</ul>

<h3>Business & Growth (Summit)</h3>
<ul>
<li><strong>Radar</strong> — Lead generation, market scanning, opportunity identification</li>
<li><strong>Quill</strong> — Proposal writing, SOWs, client-facing docs</li>
<li><strong>Muse</strong> — Marketing content: blog posts, social, copy</li>
<li><strong>Compass</strong> — Strategy, roadmapping, sprint planning</li>
</ul>

<h3>Engineering (Nexus)</h3>
<ul>
<li><strong>Forge</strong> — Core development: writes the code</li>
<li><strong>Nimbus</strong> — Cloud infrastructure, deployment configs</li>
<li><strong>Tensor</strong> — ML/AI-specific work, model integration</li>
<li><strong>Sentinel</strong> — Code review, security scanning, PR review</li>
<li><strong>Helm</strong> — Deployment, CI/CD, release management</li>
</ul>

<h3>The Skate Workshop (Halfpipe)</h3>
<ul>
<li><strong>Kickflip</strong> — Product design and features</li>
<li><strong>Grind</strong> — Development</li>
<li><strong>Ollie</strong> — QA and testing</li>
<li><strong>Canvas</strong> — Design assets and UI</li>
<li><strong>Rail</strong> — Backend and API</li>
<li><strong>Deck</strong> — Marketing and community</li>
</ul>

<p>Yeah, the Skate Workshop is a skateboarding side project. I like skateboarding. The agents don't judge.</p>

<h2>Model Tiers — Not Every Task Needs the Big Brain</h2>

<p>One thing I learned fast: you don't run Opus on everything. That's like hiring a senior architect to answer the phone.</p>

<p>Here's how I tier it:</p>

<pre><code>Claude Opus 4.6    → Complex reasoning, orchestration, judgment calls (Lurkr)
Claude Sonnet 4.5  → Balanced work, management, writing (Directors + most agents)
Claude Haiku 4.5   → Fast/simple tasks, classification, routing, summaries</code></pre>

<p>Lurkr runs on Opus because it needs to understand context across the entire org, make trade-offs, and decide what's worth escalating to me. Directors run Sonnet because they need to be competent but don't need to burn tokens on deep reasoning for every standup report. And for quick stuff — parsing an email, classifying a lead, formatting a response — Haiku handles it at a fraction of the cost.</p>

<p>This tiering is the difference between this being affordable and this being a money pit.</p>

<h2>The Infrastructure</h2>

<img src="/images/blog/22-agent-architecture.png" alt="JTS Agent Architecture — 5-layer diagram showing External Inputs, Hermes Gateway, Agent Runtime, Skills & Tools, and Infrastructure layers" loading="lazy" />

<p>None of this works without the plumbing. Here's what connects everything:</p>

<ul>
<li><strong>Hermes</strong> — The agent runtime. Handles agent lifecycle, messaging, tool access, scheduling. This is the backbone.</li>
<li><strong>Telegram</strong> — Primary communication channel. Directors post standups here. I read them over coffee.</li>
<li><strong>Slack</strong> — Internal agent-to-agent coordination for engineering workflows.</li>
<li><strong>GitHub</strong> — Code lives here. Forge pushes branches, Sentinel reviews PRs, Helm merges and deploys.</li>
<li><strong>Gmail + Google Calendar</strong> — Bridge and Dispatch handle client comms and scheduling through these.</li>
<li><strong>Stripe</strong> — Ledger creates invoices, tracks payments, sends reminders.</li>
<li><strong>n8n</strong> — Webhook orchestration for event-driven workflows. When a Stripe payment hits, Ledger knows. When a form submission comes in, Radar picks it up.</li>
<li><strong>Tailscale VPN</strong> — Everything runs on a mesh network. Secure, no exposed ports.</li>
<li><strong>systemd</strong> — Each agent runs as a managed service. Restarts on failure. Logs go to journald.</li>
</ul>

<p>It's boring infrastructure. That's the point. Boring infrastructure is reliable infrastructure.</p>

<h2>How It Actually Works — Real Workflows</h2>

<p>Let me walk through what happens on a typical day.</p>

<h3>Morning Standups</h3>

<img src="/images/blog/22-agent-standup.png" alt="Screenshot of a real Director standup message in the Joe's Tech Solutions Telegram group, showing Chief's daily report with team status, inbox highlights, calendar events, and action items" loading="lazy" />

<p>Every weekday at 9:00 AM Pacific, four messages land in my Telegram group. Each Director reports what their division did yesterday, what's planned today, and any blockers. Chief covers ops, Summit covers pipeline, Nexus covers engineering, Halfpipe covers the Skate Workshop.</p>

<p>I skim them in five minutes. If something needs my input, I reply. If not, the team keeps moving.</p>

<h3>Lead → Proposal → Client → Invoice</h3>

<img src="/images/blog/22-agent-workflow.png" alt="Workflow diagram showing the Lead to Invoice pipeline — 6 agents handling the full sales-to-delivery cycle from Radar to Ledger" loading="lazy" />

<ol>
<li><strong>Radar</strong> monitors configured sources — job boards, social mentions, inbound forms. Finds a potential lead that matches our ICP.</li>
<li><strong>Radar</strong> passes it to <strong>Summit</strong>, who evaluates fit and priority.</li>
<li><strong>Quill</strong> drafts a proposal — scope, timeline, pricing — based on templates and past proposals.</li>
<li>I review and send (this is the one manual step I keep — I sign off on every proposal).</li>
<li>Client signs. Now ops kicks in.</li>
<li><strong>Bridge</strong> sends the welcome email, collects onboarding info, handles follow-up comms.</li>
<li><strong>Dispatch</strong> blocks time on the calendar, creates project milestones.</li>
<li><strong>Ledger</strong> generates the invoice in Stripe, sets up payment schedule.</li>
</ol>

<p>That pipeline used to take me half a day of context-switching. Now I review a proposal and hit send.</p>

<h3>Engineering Flow</h3>

<ol>
<li><strong>Compass</strong> breaks the project into sprints and tasks based on the SOW.</li>
<li><strong>Forge</strong> picks up tasks, writes code, pushes branches.</li>
<li><strong>Sentinel</strong> reviews every PR — checks for bugs, security issues, style violations.</li>
<li>If Sentinel approves, <strong>Helm</strong> merges and deploys.</li>
<li><strong>Nimbus</strong> handles any infra changes — Terraform, Docker, cloud configs.</li>
<li><strong>Tensor</strong> jumps in when there's ML-specific work.</li>
</ol>

<p>Nexus oversees the whole thing and escalates to Lurkr if something's blocked or off-track.</p>

<h3>Content Pipeline</h3>

<p><strong>Muse</strong> creates marketing content — blog drafts, social posts, email campaigns. When we need visuals or design assets, <strong>Canvas</strong> (in the Skate Workshop) handles it, and <strong>Deck</strong> coordinates marketing across both JTS and the Skate Workshop brand.</p>

<p>Cross-division collaboration is where the Director layer really earns its keep. Summit and Halfpipe coordinate through Lurkr so I don't have to play traffic cop.</p>

<h2>Why This Matters (Especially for Small Business)</h2>

<p>Here's the thing — I'm not Google. I don't have a 200-person eng org. I'm one guy who builds AI solutions for clients.</p>

<p>But with this setup:</p>

<p><strong>Every agent is specialized.</strong> Bridge doesn't write code. Forge doesn't send invoices. This isn't one mega-chatbot trying to do everything poorly. Each agent has a focused role, specific tools, and clear responsibilities. Just like a real team.</p>

<p><strong>Directors reduce noise.</strong> I don't need to know that Dispatch moved a meeting by 30 minutes. I need to know if a client is unhappy or a deployment failed. The Director layer filters signal from noise. I only hear what matters.</p>

<p><strong>Tiered models keep costs sane.</strong> Opus for the CTO, Sonnet for directors and skilled work, Haiku for routine tasks. You wouldn't pay a senior engineer to sort mail. Same principle.</p>

<p><strong>It scales without hiring.</strong> When I take on a new client, I don't need to hire an ops person and a project manager. The agents handle it. My marginal cost per client is mostly just API tokens and compute.</p>

<p>And here's the kicker: <strong>this is what Joe's Tech Solutions builds for clients.</strong> I'm not just talking about it. I'm running my own business on it. Every day.</p>

<h2>What Didn't I Cover?</h2>

<p>A lot. This post is the 30,000-foot view. There's a ton of detail in how agents communicate, how Directors run daily syncs, how I handle failures and edge cases, and what went hilariously wrong along the way.</p>

<p>So this is Part 1 of a series:</p>

<ul>
<li><strong>Part 2:</strong> How Directors manage sub-agents — the daily standup system deep dive</li>
<li><strong>Part 3:</strong> Real workflow walkthrough with actual data and logs</li>
<li><strong>Part 4:</strong> Lessons learned and what failed (spoiler: a lot, at first)</li>
</ul>

<p>Subscribe or check back. I'll link them here as they go up.</p>

<h2>Want This for Your Business?</h2>

<p>This isn't theoretical. It's not a whitepaper. It's a production system running a real business.</p>

<p>If you're a small business owner, a solo founder, or a team that's stretched thin — this is what Joe's Tech Solutions builds. Custom AI agent teams, tailored to your workflows, running on your infrastructure.</p>

<p><strong><a href="/contact">Let's talk →</a></strong></p>

<hr />

<p><em>Joe is the founder of Joe's Tech Solutions LLC, a generative AI consultancy based in San Diego. He builds AI agent systems for businesses that want to do more with less. When he's not wrangling 22 AI agents, he's probably skateboarding.</em></p>
`,
};
