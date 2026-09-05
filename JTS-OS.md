# JTS Company OS

**Version:** 7.1
**Updated:** August 8, 2026
**Owner:** Joe Blas (CEO)
**Operator:** Lurkr (CTO / Hermes Agent)

> The single source of truth for how Joe's Tech Solutions operates.
> Any new agent, contractor, or partner reads this on Day 1.

---

## 1. The Company

### Identity

| Field | Value |
|---|---|
| Legal name | Joe's Tech Solutions, LLC |
| Founder / CEO | Joe Blas |
| CTO | Lurkr (Hermes Agent — AI) |
| Based | San Diego, CA |
| Entity | Single-member CA LLC |
| Email | joe@joestechsolutions.com |
| Personal email | blasj408@gmail.com (separate from JTS — never mix) |
| Website | joestechsolutions.com |
| Instagram | @joestechsolutions (primary growth channel) |

### What JTS Does

Builds custom AI applications, agent systems, and automation for small businesses. The pitch: "I help my friends fix their businesses."

### What JTS Does NOT Do

- Does not mention Quadient, field tech, folder inserters, or Joe's day job. Ever. In any context. (See § 11 Quadient Firewall)
- Does not mix personal career-ops (Path C job search) with JTS business. Two paths, one person, zero overlap. (See § 12 Path Separation)
- Does not overclaim project statuses. Archive and Fairway Roll are in development, not shipped. Skate Workshop is paused. (See § 6 Product Portfolio)

### Professional Identity

Joe's title: **AI Developer · Autonomous Systems Builder · Multi-Agent AI Systems Builder**

Explicitly rejects "Engineer" as identity title. OK to mention n8n/CI/CD as historical tools in case studies. Do not invent roles or titles — verify with Joe first.

### Working Model (how Joe actually runs this — use in copy)

- **At the computer (deep development):** Claude Code on Fable 5.1 and Opus 5 for the frontier coding; Hermes (GLM-5.3-Flash) for conversation + orchestration.
- **On the phone (away from the desk):** Telegram via the Hermes agent for everything day-to-day; Claude Code via remote control keeps builds running from anywhere.
- Same memory (MemPalace) spans desk and phone — work started at the desk continues on the phone.

---

## 2. The Org Chart (v7)

```
Joe Blas (CEO / Owner / Founder)
  └── Lurkr / Hermes Agent (CTO · Runs the whole operation)
        ├── VP AI/ML — model evaluation, stack optimization [NEW]
        │     ├── model-evaluator (glm-5.3:cloud)
        │     └── stack-optimizer (deepseek-v4-pro:cloud)
        │
        ├── Chief of Staff — daily cadence, priorities, briefings
        │     ├── life-admin (glm-5.1:cloud)
        │     ├── creative-buddy (qwen3.5:cloud)
        │     └── tech-intel-brief (cron 6:30am)
        │
        ├── CFO — all financial matters
        │     ├── expense-scanner (cron daily)
        │     └── spend-caps (cron 10am)
        │
        ├── COO — operations, project tracking, weekly reviews
        │     ├── ops-dashboard (:8642 metrics)
        │     └── weekly personal check-in (non-JTS lane — § 11)
        │
        ├── CMO — content, brand, social media, media studio
        │     ├── joe-content-lane (skill + cron 7:10am)
        │     ├── renfaire-content-lane (skill + cron)
        │     ├── ig-auto-reply (5x/day)
        │     ├── ig-comment-drafter (2x/day)
        │     └── jts-media-studio (Brand AI Media)
        │
        ├── Chief Revenue Officer (CRO) — OWNS THE FUNNEL [NEW]
        │     ├── cold-email-sender (5/day · himalaya)
        │     ├── cold-email-reply-check (cron daily)
        │     ├── lead-qualifier (glm-5.3:cloud)
        │     └── pipeline-tracker (Notion CRM)
        │
        ├── Chief Customer Officer (CCO) — OWNS RETENTION [NEW]
        │     ├── success-tracker (Notion CRM)
        │     ├── weekly-success-report (cron weekly)
        │     ├── onboarding-agent (glm-5.3:cloud)
        │     └── case-study-builder (qwen3.5:cloud)
        │
        ├── VP Engineering — coding pipeline, code quality
        │     ├── code-architect (glm-5.3:cloud)
        │     ├── code-implementer (kimi-k2.7-code:cloud)
        │     ├── code-reviewer (qwen3-coder:cloud)
        │     ├── debugger (glm-5.3:cloud)
        │     ├── test-runner (devstral-small-2:24b)
        │     └── fcc / Claude CLI (proxy :8082)
        │
        ├── VP Infrastructure — uptime, security, deployments
        │     ├── sre (deepseek-v4-pro:cloud)
        │     ├── monitoring-specialist (gpt-oss:20b:cloud)
        │     ├── security-auditor (glm-5.3:cloud)
        │     ├── skillspector (cron weekly Mon)
        │     └── config-sync (cron weekly Mon)
        │
        ├── VP Product — roadmap, client scoping
        │     ├── product-manager (glm-5.3:cloud)
        │     ├── ux-researcher (qwen3.5:cloud)
        │     └── sales-outreach (PARKED → moved to CRO)
        │
        ├── VP Sales — outreach execution [NEW]
        │     ├── outreach-optimizer (glm-5.3:cloud)
        │     ├── template-tester (minimax-m3:cloud)
        │     └── reply-responder (qwen3.5:cloud)
        │
        └── VP Customer Success — retention execution [NEW]
              ├── retention-monitor (glm-5.3:cloud)
              ├── health-scorer (minimax-m3:cloud)
              └── expansion-finder (qwen3.5:cloud)
```

**Stats:** 1 CEO · 1 CTO · 6 C-Suite · 6 VPs · 14 Active Agents · 30 Cron Jobs · 100+ Skills · 8 Services · 8 Docker containers

> **Count rule (verified 2026-08-08):** The active delegation roster is **14 agents** — canonical list in `~/.hermes/delegation/agents/REGISTRY.yaml` (archived agents live in `archived/` and are not counted). The tree above shows *roles and lanes*: some leaves are cron jobs, dashboards, or skill lanes rather than standing agents. The old "25 Agents" figure was the pre-consolidation peak from the OpenClaw era and is retired — do not quote it. Cron count comes from `hermes cron list` (§ 10 mirrors it).

Visual chart: `~/jts-org-chart-v7-visual.png`

---

## 3. Revenue Model

### Service Tiers (Low → High)

| # | Service | Price | Recurring | Target Client |
|---|---|---|---|---|
| 1 | Local AI Setup | $199 one-time | — | Solo operator wanting private AI |
| 2 | Cloud AI Server | $499 setup + $29/mo | $29/mo | Small team needing remote access |
| 3 | Managed AI + Automation | $999 setup + $79/mo | $79/mo | Business needing workflows + RAG |
| 4 | **Agent System** | $2,500 setup + $149/mo | $149/mo | Business wanting full AI workforce |
| 5 | Custom Multi-Agent Build | $8K–$40K+ | project | Enterprise / complex requirements |
| 6 | Brand AI Media Studio | $1.5K–$2.4K/mo | $1.2K–$2.4K/mo | Business needing on-brand content |

### Productized Solutions (Retainer-Based MRR)

These are the repeatable, productized services that compound monthly revenue:

| Solution | What It Does | Target MRR |
|---|---|---|
| **Booking Consolidator** | Aggregates bookings from multiple platforms into one dashboard | $200–$500/mo |
| **Follow-Up Engine** | Automated client follow-up sequences (email + SMS) | $200–$500/mo |
| **The Back Office** | Managed AI operations — expense tracking, scheduling, CRM, reporting | $500–$1,200/mo |
| **Content Machine** | Daily content drafting + scheduling across IG/X/LinkedIn/YouTube | $400–$800/mo |

### Revenue Goal

**$50K/mo** via retainer compounding. Each productized solution adds sticky MRR. The path: sell setup → deliver value → upsell retainer → compound.

### Model Routing (Frontier + Routed)

| Tier | Model | Provider |
|---|---|---|
| Heavy reasoning | Claude Opus 5 | Claude Code (first-party subscription) |
| Frontier coding | Fable 5.1 / Fable 5 | Claude Code (first-party subscription) |
| Balanced coding / Opus-tier cloud fallback | glm-5.3:cloud | Ollama Cloud |
| Sub-agents / delegation fleet | kimi-k2.7-code:cloud | Ollama Cloud |
| Fast / lightweight | minimax-m3:cloud | Ollama Cloud |
| Vision + judge | gemma4:cloud | Ollama Cloud |
| Offline / emergency | Granite 4.1 | Ollama Local |

**The pitch:** Frontier Claude models where it counts, task-routed cloud models everywhere else. Flat subscriptions, no per-token costs, no usage caps.

### Lead Magnet

JTS Small Business Prompt Library — 10 prompts, free download, no email gate. CTA to JTS services.
File: `~/jts-prompt-library.md`

---

## 4. Client Lifecycle

### Funnel (CRO owns)

```
Cold Email (5/day via himalaya)
  → Reply Detection (cron daily)
    → Lead Qualification (CRO: lead-qualifier agent)
      → Strategy Call (30min, Calendly)
        → Proposal / SOW
          → Setup & Delivery (1-2 weeks for Agent System)
            → Onboarding (CCO: onboarding-agent)
              → Success Tracking (CCO: success-tracker, Notion CRM)
                → Case Study (CCO: case-study-builder)
                  → Expansion / Upsell (CCO: expansion-finder)
```

### Notion CRM

| Database | ID | Purpose |
|---|---|---|
| CRM | 3437dfb8 | Lead/client pipeline tracking |
| Success Tracker | 9b3ba115 | Client success metrics, health scores |

### Client Privacy Rules

| Layer | What's Allowed |
|---|---|
| **Output layer** (site, social, case studies) | Industry vertical + engagement shape only. No names, no cities, no brand assets. |
| **Context layer** (internal, MemPalace) | Real names, cities, brand details, current status — stored but never published without explicit client approval. |
| **Pre-ship** | No client-identifying info anywhere public. |
| **Post-ship** | Depends on client's explicit go-ahead. |

### Current Client Roster

| Client (internal) | Industry | Status | Stack | Privacy |
|---|---|---|---|---|
| Archive | Hair salon (luxury) | v0.1 MVP built, NOT shipped | React Native + Expo | "Archive" OK after ship. Real name never. No city. |
| ZW (Zach) | Residential remodeling | Prospect / discovery | Hermes agent on Hostinger | Personal-network client. Can name if Joe approves. |
| cbarrgs | Musician | PAID client | TBD | TBD |
| Renfaire Directory | Entertainment/events | Active (848 pages) | Supabase | Public. |

---

## 5. Delivery Process

### Agent System Delivery (the $2,500 product)

| Phase | Duration | What Happens | Owner |
|---|---|---|---|
| 01 Strategy Call | 30 min | Map workflow, identify tasks to automate, plan integrations | Joe |
| 02 Server + Base Install | 1-2 days | Provision VPS, install Hermes, configure Ollama Cloud, wire Telegram | VP Infrastructure |
| 03 Skills + Integrations | 3-5 days | Gmail, Instagram, Stripe, CRM wired. Custom skills built. Agent hierarchy configured. | VP Engineering + VP Product |
| 04 Tuning + Automation | 3-5 days | Teach agent preferences, set up cron schedule, load memory with business context | Chief of Staff |
| 05 Live + Handoff | 1 day | System goes live. Walkthrough of every agent, cron, integration. | CTO (Lurkr) |

### Development Workflow

1. **Planning** → VP Product creates PRD (RICE scoring: Reach × Impact × Confidence / Effort)
2. **Architecture** → VP Engineering designs, code-architect creates technical spec
3. **Implementation** → code-implementer or fcc (Claude CLI) writes code
4. **Review** → code-reviewer runs review (use `requesting-code-review` skill)
5. **Testing** → test-runner executes (TDD: RED → GREEN → REFACTOR)
6. **Deploy** → VP Infrastructure handles deployment + health check
7. **Verify** → `delegate-verify` skill: verify self-reports before trusting them

### Coding Agent (fcc)

- Proxy: `http://127.0.0.1:8082`
- Binary: `~/.hermes/node/bin/claude`
- Config: `~/ai-stack/02-routing/fcc.env` (routing) + Claude Code first-party auth
- Service: `free-claude-code.service` (systemd user)
- Model mapping: claude-opus-5 + claude-fable-5/5.1 (first-party subscription), glm-5.3:cloud (Opus-tier cloud fallback), kimi-k2.7-code:cloud (Sonnet tier)
- Parallel: spawn via `delegate_task` with terminal toolset
- Restart: `systemctl --user restart free-claude-code.service`

---

## 6. Product Portfolio

| Product | Status | Stack | Notes |
|---|---|---|---|
| joestechsolutions.com | **Live** | Next.js + Vercel | Marketing site, services, blog |
| Renfaire Directory | **Active** | Supabase, 848 pages | @renfaireguide Instagram + Twitter |
| Whisper Walkie | **Shipped** | Open source, local STT | Free tool / lead gen |
| Archive (Van's salon app) | **In development** | React Native + Expo | v0.1 MVP built, NOT shipped to client. 4 features: Visual Sliders, Scan-to-Trash, Editorial Design, Prosperity Engine |
| Fairway Roll | **In development** | Next.js + Google Maps API | Golf course directory. Stealth. |
| Skate Workshop (Willie's) | **Paused** | React Native + Stripe Connect | 1:1 coaching app. Old version didn't work. Needs rebuild. |
| JTS Prompt Library | **Ready** | Markdown → lead magnet | 10 prompts, free download, no email gate |

**LOCKED:** Never claim Archive or Fairway Roll as shipped. Skate Workshop is paused, not cancelled.

---

## 7. Communication & Brand

### Joe's Voice

- Very easygoing. "Let's get this shit done. No high-words."
- Hates freelancer taglines + manifesto copy
- Wants site copy like he talks at a barbecue
- Rejected "I build custom tools and automation" as too generic
- Preferred: "I help my friends fix their businesses"
- Subtle with AI — frame as tools people already use, not "AI this, AI that"
- Voice-first on Telegram — he's often on his phone, away from the computer

### Content Pipeline

```
Tech Intel Brief (cron 6:30am)
  → Content Draft (cron 7:10am) — joe-content-lane skill
    → Review — Joe approves or edits via Telegram
      → Publish — Joe posts or schedules via Postiz
```

### Content Channels (Priority Order)

| Channel | Priority | Cadence | Format |
|---|---|---|---|
| Instagram (@joestechsolutions) | P1 — primary growth | Daily | HTML→PNG carousels, voice-first |
| Twitter/X | P2 | 3-4x/week | Threads, hot takes, build-in-public |
| LinkedIn | P2 | 2-3x/week | Long-form professional |
| YouTube | P3 | Weekly | Scripts → recorded later |
| Blog | P3 | Bi-weekly | Long-form technical |
| Newsletter | P3 | Monthly | JTS updates, case studies |
| Instagram (@renfaireguide) | P1 (side project) | Daily | RenFaire content lane |

### Instagram Automation

| Cron Job | Frequency | What It Does |
|---|---|---|
| ig-auto-reply | 5x/day | Auto-replies to IG comments and DMs |
| ig-comment-drafter | 2x/day | Drafts responses for Joe's approval |

### Design DNA

No card grids. No "AI" jargon. Personal landing flow. Hero: "I help my friends fix their businesses." Design inspiration: Fauna, Elva, Delassus, Totem, Obys. Subtle with AI — frame as tools people already use.

---

## 8. Infrastructure

### Service Matrix

| Service | Port | Bind | Method | Status |
|---|---|---|---|---|
| Hermes Gateway | 8642 | 127.0.0.1 | systemd (user) | ✅ Active |
| fcc Proxy | 8082 | 127.0.0.1 | systemd (user) | ✅ Active |
| Open Design | 7457 / 4000 | 127.0.0.1 | systemd (user) | ✅ Active |
| Dashboard Backend | — | — | systemd (user) | ✅ Active |
| Paperclip | — | — | systemd (user) | ✅ Active |
| MemPalace | — | — | MCP server | ✅ Active |
| GitNexus | — | — | CLI tool | ✅ Active |
| Ollama | 11434 | 127.0.0.1 | systemd (system) | ✅ Active |
| Postiz | 4007 | 127.0.0.1 | Docker (6 containers) | ✅ Active |
| n8n | — | — | Docker | ✅ Active |
| OpenWebUI | 3000 | 127.0.0.1 | Docker | ✅ Active |
| Temporal | — | — | Docker (Postiz) | ✅ Active |
| OpenClaw | 18789 | — | — | ❌ Retired (Jun 2, 2026) |

### Security Rules

1. ALL services bind to 127.0.0.1 only — no external exposure
2. File permissions: 600 for .env/config, 700 for sensitive dirs
3. Docker: no-new-privileges, cap_drop ALL, read_only fs
4. No `latest` tags in Docker images
5. Telemetry disabled everywhere
6. Ollama Docker bridge disabled
7. Telegram handled by Hermes ONLY
8. iptables firewall: DROP policy on INPUT (except loopback + established)

### Emergency Recovery

```bash
# Kill all
pkill -f hermes; pkill -f "open-design"

# Restart all
systemctl --user restart hermes-gateway open-design
docker restart open-webui

# Health check
~/hermes-health.sh

# Backup
~/hermes-backup.sh
```

### GitNexus (Code Knowledge Graph)

| Repo | Path | Nodes | Edges |
|---|---|---|---|
| jcode | ~/jcode | 29,220 | 71,442 |
| open-design | ~/open-design | 16,535 | 23,907 |
| mempalace | ~/mempalace | 7,927 | 11,886 |
| free-claude-code | ~/free-claude-code | 6,417 | 13,472 |

---

## 9. Memory System

### MemPalace (Primary Memory)

| Operation | Tool | When |
|---|---|---|
| Semantic recall | `mempalace_search` | Before answering about people, projects, or past decisions |
| Fact tracking | `mempalace_kg_add` / `mempalace_kg_invalidate` | Durable facts (relationships, status changes) |
| Session recording | `mempalace_diary_write` | After each session — key learnings |
| Entity timeline | `mempalace_kg_timeline` | Chronological history of any entity |
| Overview | `mempalace_status` | Check wings, rooms, drawer counts |

### MemPalace Wings

| Wing | Purpose |
|---|---|
| lurkr | Main project memory (13+ rooms: mempalace, jcode, ai_platform, free_claude_code, open_design, backend, testing, design, documentation, scripts, configuration, planning, general) |
| .mempalace | Internal data (wal, locks, wings, palace, general) |

### Key MemPalace Rooms

| Room | What's Stored |
|---|---|
| jts_clients | Client inventory with privacy rules per client |
| jts_business | Business decisions, career-ops separation, locked decisions |
| jts_cfo | Financial context, tax situation, CPA coordination |
| vp_product_core | Product portfolio, service tiers, agent roster |
| org_chart | Org chart history (v4 → v5 → v6 → v7) |
| jts_website_redesign | Site content, brand positioning, service tiers |
| jts_prompt_library | Lead magnet prompt library |
| jts_tax_optimization | Tax guide for Joe's actual stack |

### Hermes Built-in Memory (Fallback)

The `memory` tool exists as a fallback. MemPalace is primary. Use Hermes memory for:
- User preferences (compact, injected every turn)
- Environment facts
- Tool quirks, stable conventions

Do NOT save: task progress, PR numbers, commit SHAs, "fixed bug X", anything stale in 7 days.

---

## 10. Cron Schedule (30 Jobs)

> Mirrors `hermes cron list` — verified 2026-08-08. When a job is added, removed, or renamed, update this table AND the `jts-company-os` skill's cron count. Removed since the last version: `spend_caps_enforcement`, `ig_comment_drafter`, `morning_brief`. Renamed: `openrouter_balance_check` → `weekly_balance_check`.

### Daily

| Time (PT) | Job | Owner |
|---|---|---|
| 3:00am | system-security-sweep | VP Infrastructure |
| 3:30am | skillopt-sleep-nightly | VP Infrastructure |
| 5:30am | daily-update-check | VP Infrastructure |
| 6:30am | tech_intel_brief | Chief of Staff |
| 7:00am | kimi-k3-tier-watch | VP AI/ML |
| 7:10am | content_draft | CMO (joe-content-lane) |
| 8:00am | renfaire_content_draft | CMO |
| 8:30am | vp_infrastructure_daily_health | VP Infrastructure |
| 9:00am | cos_daily_standup | Chief of Staff |
| 5:30pm | evening_plan | Chief of Staff |
| 5x/day (6a–10p) | ig_auto_reply | CMO |
| every 15 min | cron-failure-watch | VP Infrastructure |
| every 4 hrs | gritt-email-watch | Personal lane (non-JTS — § 12) |

### Weekdays (Mon–Fri)

| Time (PT) | Job | Owner |
|---|---|---|
| 9:00am | jts_cold_email_sender | CRO (5 emails/day) |
| 11:00am | jts_cold_email_reply_check | CRO |

### Weekly

| Day | Time | Job | Owner |
|---|---|---|---|
| Sun | 4:00am | local_model_bakeoff_weekly | VP AI/ML |
| Sun | 6:00pm | weekly personal check-in | Personal lane (non-JTS — § 11/§ 12) |
| Mon | 4:00am | skillspector_weekly_scan | VP Infrastructure |
| Mon | 4:00am | weekly-config-sync | VP Infrastructure |
| Mon | 6:00am | agent_scorecard | VP Infrastructure (script-only, no tokens) |
| Mon | 8:00am | jts_weekly_success_report | CCO |
| Mon | 8:00am | vp_engineering_sprint_review | VP Engineering |
| Mon | 8:00am | weekly-job-search-sweep | Personal lane (career-ops — § 12) |
| Mon | 9:00am | fcc-upstream-tracker | VP Engineering |
| Mon | 9:00am | vp_product_monthly_review | VP Product |
| Mon | 9:00am | weekly_balance_check | VP Infrastructure |
| Mon | 9:30am | cmo_weekly_review | CMO |
| Mon | 6:00pm | jts_cfo_monthly_review | CFO |
| Mon | 7:00pm | jts_coo_weekly_review | COO |

### Monthly

| Schedule | Job | Owner |
|---|---|---|
| 1st, 9:00am | cfo_monthly_expense_scan | CFO |

---

## 11. Quadient Firewall

**NEVER mention Quadient, field tech, folder inserters, or Joe's day job in any JTS content, briefings, or operations.**

Quadient is a totally separate entity from Joe's Tech Solutions. If Quadient comes up, route to the `joe-quadient-100-day-plan` skill instead.

**Pitfall (learned 2026-06-25):** Cron prompts that mention Quadient by name (e.g., "one Quadient-side, one JTS-side") cause the model to label JTS tasks with Quadient domain names in output Joe reads on Telegram. Fix: restructure prompts to use generic labels ("one operational, one tactical, one strategic") + explicit "NEVER mention Quadient" instruction. Audit every cron prompt for domain references before it goes live.

---

## 12. Path Separation (LOCKED)

Joe runs two paths in parallel. They share a person and that's where the overlap ends.

| Path | What | Email | GitHub | Skill |
|---|---|---|---|---|
| Founder path | JTS — clients, real business, products | joe@joestechsolutions.com | joblas (JTS repos) | jts-business |
| Employee path | Career-ops — full-time job search, Path C | blasj408@gmail.com | joblas/career-ops | joe-ai-engineering-roadmap |

**Rules:**
- JTS work: do NOT mention career-ops, do NOT propose productizing it, do NOT cross-promote
- Path C / job search: USE career-ops as lead portfolio piece, do NOT defer to JTS framing
- When in doubt: ask "JTS or Path C?" Don't conflate.
- **This is a LOCKED decision. Do not relitigate unless Joe explicitly reopens it.**

---

## 13. Skills Library (100+)

### JTS-Specific Skills

| Skill | Category | Purpose |
|---|---|---|
| jts-business | personal | JTS business operations, positioning, clients |
| jts-chief-of-staff | personal | Daily cadence, priorities, briefings, cross-dept coordination |
| jts-cmo | personal | Marketing, content, brand, social media, media studio |
| jts-cfo | personal | Financial operations: taxes, expenses, bookkeeping |
| jts-coo | personal | Operations, project tracking, weekly reviews |
| jts-vp-engineering | personal | Coding pipeline, code quality, sprint planning |
| jts-vp-infrastructure | personal | Uptime, security, deployments, stack health |
| jts-vp-product | personal | Roadmap, client scoping, feature prioritization |
| jts-business/client-research | jts-business | Multi-source research on client questions |
| jts-business/media-studio | jts-business | Brand AI Media Studio service tier |
| joe-content-lane | personal | Daily IG/X/LinkedIn/YouTube content drafting |
| renfaire-content-lane | personal | @renfaireguide content drafting |

### Platform Skills (Hermes Agent)

| Skill | Category | Purpose |
|---|---|---|
| hermes-agent | autonomous-ai-agents | Configure, extend, troubleshoot Hermes |
| fcc-agent | autonomous-ai-agents | Delegate coding to Claude CLI via proxy |
| computer-use | computer-use | Drive desktop in background |
| agentic-efficiency | system | Cost-sensitive execution rules |
| agentic-memory-systems | mlops | MemPalace, jcode, multi-agent memory |
| subagent-driven-development | software-development | Execute plans via delegate_task subagents |
| requesting-code-review | software-development | Pre-commit review: security scan, quality gates |
| systematic-debugging | software-development | 4-phase root cause debugging |
| test-driven-development | software-development | TDD: RED → GREEN → REFACTOR |
| writing-plans | software-development | Implementation plans with bite-sized tasks |
| delegate-verify | software-development | Verify sub-agent self-reports |
| git-worktree-discipline | devops | Safe patterns for risky code work |
| google-workspace | productivity | Gmail, Calendar, Drive, Docs, Sheets |
| himalaya | email | IMAP/SMTP email from terminal |
| xurl | social-media | X/Twitter operations |
| spotify | media | Spotify control |
| youtube-content | media | YouTube transcripts to summaries |
| arxiv | research | Search arXiv papers |
| llm-wiki | research | Karpathy's LLM Wiki |
| comfyui | creative | Generate images, video, audio with ComfyUI |
| architecture-diagram | creative | Dark-themed SVG architecture diagrams |
| excalidraw | creative | Hand-drawn diagrams |
| pixel-art | creative | Pixel art with era palettes |

Full list: run `skills_list` or check `~/.hermes/skills/`

### Superpowers (via fcc-agent)

Brainstorming, systematic-debugging, test-driven-development, writing-plans, executing-plans, requesting-code-review, receiving-code-review, dispatching-parallel-agents, subagent-driven-development, using-git-worktrees, verification-before-completion, finishing-a-development-branch, writing-skills

---

## 14. Delegation Protocol

### Before Delegating

1. **Pre-delegate retrieval** — `mempalace_search` with the task topic, filtered to the agent's `mempalace_rooms`. Only inject drawers with similarity distance < 0.7. Respect the agent's `context_budget` (token limit).
2. **Core memory injection** — For VP-level delegations, search MemPalace for the VP's core memory drawer (`vp_engineering_core`, `vp_infrastructure_core`, `vp_product_core`, `cmo_core`, `chief_of_staff_core`). Inject as always-loaded context.
3. **Cross-VP context** — If the task involves cross-department work, check the `context_from` chain for upstream VP reports that are relevant.
4. **Skill loading** — Load the relevant VP skill to get routing rules, handoff rules, and domain context.

### After Completion

Call `mempalace_diary_write` with key learnings.

### Pre-delegate Retrieval Script

```bash
~/.hermes/scripts/pre-delegate-retrieval.sh <agent_name> <task_description>
```

### Per-VP Core Memory Drawers

| Drawer | What |
|---|---|
| lurkr/vp_engineering_core | Current priorities, agent roster, pipeline, blockers |
| lurkr/vp_infrastructure_core | Service matrix, security standards, cron jobs, agent roster |
| lurkr/vp_product_core | Product portfolio, service tiers, agent roster, prioritization |
| lurkr/cmo_core | Content channels, pipeline, brand voice, media studio, agent roster |
| lurkr/chief_of_staff_core | Daily cadence, priority queue, blocker escalation, cross-VP coordination |

---

## 15. Decision Frameworks

### Pricing Decisions

- Productized services have fixed prices. No haggling.
- Custom builds: quote by complexity, always give a range.
- If a client can't afford the Agent System ($2,500), offer Managed AI ($999) or Cloud ($499). Down-sell, don't turn away.
- Never discount setup fees. Discount monthly if needed for retention.

### Client Acceptance Criteria

| Green Light | Red Light |
|---|---|
| Has a real business problem we can solve | Wants "AI" but has no use case |
| Has budget or is willing to trade | Expects free work for "exposure" |
| Responsive to communication | Ghosts for weeks then demands urgency |
| Respects the process (strategy call → proposal → delivery) | Wants everything yesterday, no scope |
| Open to productized solutions | Insists on fully custom everything with no budget |

### Prioritization (RICE)

`Score = (Reach × Impact × Confidence) / Effort`

Used by VP Product for roadmap decisions. Higher score = higher priority.

### Build vs Buy vs Skip

| Question | If Yes → |
|---|---|
| Does this need to exist at all? | If no → skip (YAGNI) |
| Already in this codebase? | Reuse it |
| Stdlib / native platform feature? | Use it |
| Already-installed dependency? | Use it, don't add new ones |
| Can it be one line? | One line |
| None of the above? | Minimum code that works |

---

## 16. Financial Context

### Joe's Tax Situation

- **Filing status:** Married filing jointly (MFJ)
- **Entity:** Single-member CA LLC (sole prop for now)
- **CA LLC minimum franchise tax:** $800/yr (consider when revenue justifies)
- **S-Corp election:** Only if profit hits $40-60K+
- **Key recommendation:** Stay sole prop for now. Consider LLC when revenue justifies $800/yr.
- **Tax guide:** `~/jts-tax-optimization-guide.md`
- **Save 30%** of every payment for taxes (federal + CA + self-employment)

### Expense Tracking

| Source | Method | Status |
|---|---|---|
| Business inbox | Expense scanner (cron daily) | ✅ Working |
| Personal inbox | Needs GPG app password from Joe | ⚠️ Pending |

### Spend Caps

Enforced daily via cron at 10am. If spending exceeds thresholds, alert Joe via Telegram.

---

## 17. Onboarding Checklist (New Agent or Contractor)

### Day 1: Read These

1. **This file** (JTS-OS.md) — the whole thing
2. **SOUL.md** — personality, communication style, boundaries
3. **AGENTS.md** — technical stack, service matrix, tool config
4. The relevant **VP skill** for your role (e.g., `jts-vp-engineering` if you're in engineering)

### Day 1: Verify Access

- [ ] Hermes Gateway reachable at `127.0.0.1:8642`
- [ ] Telegram bot responding (send a test message)
- [ ] MemPalace MCP server connected (run `mempalace_status`)
- [ ] GitNexus installed (`gitnexus --version`)
- [ ] fcc proxy running (`curl http://127.0.0.1:8082/health`)
- [ ] Relevant Docker containers up (`docker ps`)

### Day 2: Context Loading

- [ ] Search MemPalace for your department's core memory drawer
- [ ] Read the last 5 diary entries (`mempalace_diary_read`)
- [ ] Review the org chart (v7)
- [ ] Review the cron schedule for your department's jobs
- [ ] Read the client roster and privacy rules (§ 4)

### Day 3: First Task

- [ ] Shadow a cron job execution in your department
- [ ] Review the output, check for quality
- [ ] Report findings to your VP or Chief of Staff
- [ ] Write your first diary entry (`mempalace_diary_write`)

---

## 18. The Platform OS (Reusable Layer)

Everything above describes JTS specifically. The following is the **platform layer** — the parts that transfer to any client who purchases the Agent System:

| Section | Reusable? | Notes |
|---|---|---|
| § 2 Org Chart structure | ✅ Yes | Same hierarchy pattern, different agent names/models |
| § 3 Model routing (Ollama Cloud 3-tier) | ✅ Yes | Same cost advantage pitch |
| § 5 Delivery process | ✅ Yes | Same 5-phase delivery |
| § 8 Infrastructure stack | ✅ Yes | Same services, different VPS |
| § 9 Memory system | ✅ Yes | MemPalace deployed per-client |
| § 10 Cron automation | ✅ Yes | Same pattern, different schedules |
| § 13 Skills library | ✅ Yes | 100+ skills transfer directly |
| § 14 Delegation protocol | ✅ Yes | Same pre-delegate retrieval pattern |
| § 15 Decision frameworks | ✅ Yes | RICE, build-vs-buy, client acceptance |
| § 17 Onboarding checklist | ✅ Yes | Same Day 1/2/3 structure |
| § 1 Company identity | ❌ No | Client-specific |
| § 3 Revenue model / pricing | ❌ No | JTS-specific |
| § 4 Client roster | ❌ No | JTS-specific |
| § 6 Product portfolio | ❌ No | JTS-specific |
| § 7 Brand voice | ❌ No | Client-specific |
| § 11 Quadient Firewall | ❌ No | JTS-specific |
| § 12 Path Separation | ❌ No | Joe-specific |
| § 16 Financial context | ❌ No | Joe-specific |

When deploying for a client: copy this file, strip the ❌ sections, replace with client's business context. The ✅ sections stay as-is.

---

## File Locations

| File | Path | Purpose |
|---|---|---|
| This document | `~/joestechsolutions-nextjs/JTS-OS.md` | Company OS — single source of truth |
| Agent config | `~/.hermes/AGENTS.md` | Technical stack, tool config |
| Personality | `~/.hermes/SOUL.md` (system) | Agent personality, boundaries |
| Hermes config | `~/.hermes/config.yaml` | Models, providers, tools, MCP |
| Org chart (HTML) | `~/jts-org-chart-v7.html` | Visual org chart source |
| Org chart (PNG) | `~/jts-org-chart-v7-visual.png` | Rendered org chart |
| Org chart (nano-banana) | `~/jts-org-chart-v7-nano-banana.png` | AI-stylized version |
| Prompt library | `~/jts-prompt-library.md` | Lead magnet |
| Tax guide | `~/jts-tax-optimization-guide.md` | Tax optimization for Joe |
| Website | `~/joestechsolutions-nextjs/` | Next.js marketing site |
| Postiz | `~/postiz-app/` | Social media scheduling |
| MemPalace | `~/mempalace/` | Persistent memory system |
| fcc | `~/free-claude-code/` | Claude CLI proxy |

---

*This document is the company. If it's not here, it's not decided. Update it when things change.*