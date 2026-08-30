import type { BlogPost } from "@/lib/blog";

export const post: BlogPost = {
  slug: "how-my-beta-testers-texts-become-app-updates",
  title: "Build in Public: How My Beta Tester's Texts Become App Updates",
  excerpt:
    "My beta tester runs a salon, not a bug tracker. She texts a bot in plain English — and an AI agent triages, writes a failing test, fixes the bug, passes CI, and ships the update to her phone. Here's the whole pipeline, including the outage that taught me to make it self-healing.",
  date: "2026-08-08",
  readTime: 7,
  author: "Joe Blas",
  tags: ["AI Agents", "Build in Public", "Automation", "Mobile Development", "Archive"],
  images: {
    "/images/blog/beta-loop-og.jpg": { width: 1024, height: 576 },
  },
  seo: {
    title:
      "Build in Public: How My Beta Tester's Texts Become App Updates | Joe's Tech Solutions",
    description:
      "A real AI agent pipeline in production: a salon owner texts feedback in plain English, and an autonomous agent triages, test-drives a fix, and ships an over-the-air update — with human gates exactly where they belong.",
    ogImage: "/images/blog/beta-loop-og.jpg",
  },
  content: `
<img src="/images/blog/beta-loop-og.jpg" alt="Illustration: a text message on one phone flows through a glowing pipeline into an update checkmark on another phone" />
<p class="lead">I'm building Archive, a salon inventory app, with a real beta tester: Van, a salon owner. She's not a developer. She doesn't file GitHub issues. She texts a Telegram bot in her own words — sometimes with screenshots — and her app updates itself. Everything in between is an AI agent pipeline I run in production, and this post is exactly how it works, including the part where it broke.</p>

<div class="flex items-center gap-2 mb-4">
  <h2 class="m-0 text-2xl font-bold">The Loop</h2>
</div>
<p>Van texts something like <em>"not only is there 10&ndash;40vol theres 5, 7, 13"</em> &mdash; that's salon-speak for developer volumes missing from a picker. The bot replies "Got it &mdash; on it." From there, her message flows through three possible lanes:</p>

<div class="my-6 p-4 rounded-xl border border-secondary/20 bg-secondary/10 overflow-x-auto" style="content-visibility:auto;contain-intrinsic-size:auto 360px">
<svg viewBox="0 0 780 320" role="img" aria-label="Pipeline diagram: Van texts the bot, triage creates a GitHub issue, then three lanes: bug fixes ship themselves via tests, CI and OTA; features stop at a pull request Joe approves; native or database changes always become a new TestFlight build." style="min-width:700px;display:block">
<style>
.bl-node{fill:var(--card,rgba(127,127,127,.06));stroke:var(--border,rgba(127,127,127,.35));stroke-width:1.2}
.bl-gate{stroke-dasharray:5 3}
.bl-t{fill:currentColor;font:600 12.5px Inter,system-ui,sans-serif}
.bl-s{fill:currentColor;opacity:.55;font:400 10.5px Inter,system-ui,sans-serif}
.bl-lane{fill:currentColor;opacity:.45;font:600 10px Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase}
.bl-edge{stroke:currentColor;opacity:.4;fill:none;stroke-width:1.5;marker-end:url(#bl-arr)}
.bl-flow{stroke:var(--color-accent,#f5a94f);opacity:.95;fill:none;stroke-width:1.8;stroke-dasharray:5 7;marker-end:url(#bl-arr2);animation:bl-march 1.1s linear infinite}
@keyframes bl-march{to{stroke-dashoffset:-12}}
@media (prefers-reduced-motion:reduce){.bl-flow{animation:none}}
</style>
<defs>
<marker id="bl-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" opacity="0.5"/></marker>
<marker id="bl-arr2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent,#f5a94f)"/></marker>
</defs>
<text x="375" y="12" class="bl-lane">ships itself</text>
<text x="375" y="130" class="bl-lane">merge is mine</text>
<text x="375" y="248" class="bl-lane">always a new build</text>
<rect class="bl-node" x="10" y="125" width="120" height="64" rx="9"/>
<text x="70" y="152" text-anchor="middle" class="bl-t">&#128172; Van texts</text>
<text x="70" y="170" text-anchor="middle" class="bl-s">plain English</text>
<rect class="bl-node" x="180" y="125" width="140" height="64" rx="9"/>
<text x="250" y="152" text-anchor="middle" class="bl-t">Triage</text>
<text x="250" y="170" text-anchor="middle" class="bl-s">&#8594; GitHub issue</text>
<rect class="bl-node" x="370" y="20" width="140" height="52" rx="9"/>
<text x="440" y="42" text-anchor="middle" class="bl-t">Failing test &#8594; fix</text>
<text x="440" y="59" text-anchor="middle" class="bl-s">test-first, always</text>
<rect class="bl-node" x="540" y="20" width="66" height="52" rx="9"/>
<text x="573" y="50" text-anchor="middle" class="bl-t">CI &#10003;</text>
<rect class="bl-node" x="636" y="20" width="134" height="52" rx="9"/>
<text x="703" y="42" text-anchor="middle" class="bl-t">&#128241; OTA update</text>
<text x="703" y="59" text-anchor="middle" class="bl-s">her app self-updates</text>
<rect class="bl-node" x="370" y="138" width="140" height="52" rx="9"/>
<text x="440" y="160" text-anchor="middle" class="bl-t">Feature &#8594; PR</text>
<text x="440" y="177" text-anchor="middle" class="bl-s">built, not merged</text>
<rect class="bl-node bl-gate" x="540" y="138" width="120" height="52" rx="9"/>
<text x="600" y="160" text-anchor="middle" class="bl-t">&#128100; Joe approves</text>
<text x="600" y="177" text-anchor="middle" class="bl-s">one tap</text>
<rect class="bl-node" x="370" y="256" width="140" height="52" rx="9"/>
<text x="440" y="278" text-anchor="middle" class="bl-t">Native / DB change</text>
<text x="440" y="295" text-anchor="middle" class="bl-s">app foundations</text>
<rect class="bl-node bl-gate" x="540" y="256" width="120" height="52" rx="9"/>
<text x="600" y="278" text-anchor="middle" class="bl-t">&#128100; Joe approves</text>
<rect class="bl-node" x="690" y="256" width="80" height="52" rx="9"/>
<text x="730" y="278" text-anchor="middle" class="bl-t">TestFlight</text>
<text x="730" y="295" text-anchor="middle" class="bl-s">install once</text>
<path class="bl-flow" d="M130,157 L174,157"/>
<path class="bl-flow" d="M320,150 C348,140 342,60 364,48"/>
<path class="bl-edge" d="M320,160 L364,163"/>
<path class="bl-edge" d="M320,172 C348,182 342,268 364,278"/>
<path class="bl-flow" d="M510,46 L534,46"/>
<path class="bl-flow" d="M606,46 L630,46"/>
<path class="bl-edge" d="M510,164 L534,164"/>
<path class="bl-edge" d="M660,157 C690,150 692,95 700,78"/>
<path class="bl-edge" d="M510,282 L534,282"/>
<path class="bl-edge" d="M660,282 L684,282"/>
</svg>
</div>

<div class="grid gap-4 sm:grid-cols-3 my-6">
  <div class="p-5 bg-secondary/10 rounded-xl border border-secondary/20">
    <h3 class="m-0 mb-2 text-base font-bold">1. Code-only bug fix</h3>
    <p class="m-0 text-sm">The agent writes a <strong>failing test first</strong>, then the fix. All tests + CI must pass. Then it ships an over-the-air update &mdash; her app updates itself, nothing to tap. I get the update-group ID and a one-line rollback command.</p>
  </div>
  <div class="p-5 bg-secondary/10 rounded-xl border border-secondary/20">
    <h3 class="m-0 mb-2 text-base font-bold">2. New feature</h3>
    <p class="m-0 text-sm">The agent builds it and opens a <strong>pull request</strong>. It stops there. Merge is mine &mdash; one-tap approve, then it ships the same OTA path.</p>
  </div>
  <div class="p-5 bg-secondary/10 rounded-xl border border-secondary/20">
    <h3 class="m-0 mb-2 text-base font-bold">3. Native / database change</h3>
    <p class="m-0 text-sm">Anything touching native modules or the schema <strong>always stops at me</strong>, then goes out as a new TestFlight build Van installs once. Mismatched JavaScript against an old native binary crashes the app &mdash; so this lane never auto-ships.</p>
  </div>
</div>

<p>The three lanes are a safety design, not a limitation. Code-only fixes ship themselves because a failing-test-first workflow plus green CI is a real gate. Anything that changes the product's shape or its foundations waits for a human.</p>

<div class="flex items-center gap-2 mb-4">
  <h2 class="m-0 text-2xl font-bold">Two Views of the Same Event</h2>
</div>
<p><strong>What Van sees:</strong> she texts about the missing volumes. The bot says "Got it." Later: <em>"The missing volumes are in &mdash; close and reopen the app and they'll appear."</em></p>
<p><strong>What actually happened:</strong> her message was triaged into a labeled, deduplicated GitHub issue. The agent wrote a failing test, then the fix. 127 tests green, CI green. The OTA update published to the production channel, and I got a rollback command in case anything looked wrong on her device.</p>
<p>That gap &mdash; between what she experiences and what the machinery does &mdash; is the entire product. She gets a developer on call 24/7. I get a paper trail with a test suite.</p>

<div class="flex items-center gap-2 mb-4">
  <h2 class="m-0 text-2xl font-bold">The Outage That Made It Self-Healing</h2>
</div>
<p>Build in public means the failure ships too, so here it is. In early August the whole loop went dark for four days &mdash; and nobody noticed, which is the worst kind of outage.</p>
<p>The agent session lived in a terminal window on my machine. A Linux restart killed it silently. And here's the brutal detail: Telegram discards undelivered bot messages after about 24 hours, so everything Van texted during those days is simply gone. No error, no queue, no replay.</p>
<p>The fix was to stop treating the agent like a process I start and start treating it like a service the machine owns:</p>
<ul>
  <li>On boot, a watchdog timer starts the agent automatically &mdash; and health-checks it every 5 minutes, replacing it if it's half-dead.</li>
  <li>The agent re-arms its own daily sweep (TestFlight feedback + crash reports flow into the same triage lane), because scheduled jobs die with the session and reboots were silently eating them.</li>
  <li>It refuses to run in the mode that once leaked permission prompts into Van's chat &mdash; she saw approval buttons meant for me. Fixed at the source.</li>
</ul>
<div class="my-6 p-4 rounded-xl border border-secondary/20 bg-secondary/10 overflow-x-auto" style="content-visibility:auto;contain-intrinsic-size:auto 360px">
<svg viewBox="0 0 780 175" role="img" aria-label="Self-healing diagram: when the machine boots, a watchdog timer starts the agent within 45 seconds and health-checks it every 5 minutes. A separate 8:23 AM daily sweep pulls TestFlight feedback and crash reports into the same triage lane." style="min-width:700px;display:block">
<style>
.bl2-node{fill:var(--card,rgba(127,127,127,.06));stroke:var(--border,rgba(127,127,127,.35));stroke-width:1.2}
.bl2-t{fill:currentColor;font:600 12.5px Inter,system-ui,sans-serif}
.bl2-s{fill:currentColor;opacity:.55;font:400 10.5px Inter,system-ui,sans-serif}
.bl2-edge{stroke:currentColor;opacity:.4;fill:none;stroke-width:1.5;marker-end:url(#bl2-arr)}
.bl2-flow{stroke:var(--color-accent,#f5a94f);opacity:.95;fill:none;stroke-width:1.8;stroke-dasharray:5 7;marker-end:url(#bl2-arr2);animation:bl2-march 1.1s linear infinite}
.bl2-pulse{animation:bl2-beat 2.4s ease-in-out infinite;transform-origin:585px 46px}
@keyframes bl2-march{to{stroke-dashoffset:-12}}
@keyframes bl2-beat{0%,100%{opacity:.35}50%{opacity:.9}}
@media (prefers-reduced-motion:reduce){.bl2-flow,.bl2-pulse{animation:none}}
</style>
<defs>
<marker id="bl2-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" opacity="0.5"/></marker>
<marker id="bl2-arr2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-accent,#f5a94f)"/></marker>
</defs>
<rect class="bl2-node" x="10" y="20" width="130" height="52" rx="9"/>
<text x="75" y="42" text-anchor="middle" class="bl2-t">Machine boots</text>
<text x="75" y="59" text-anchor="middle" class="bl2-s">any reboot or crash</text>
<rect class="bl2-node" x="190" y="20" width="150" height="52" rx="9"/>
<text x="265" y="42" text-anchor="middle" class="bl2-t">Watchdog timer</text>
<text x="265" y="59" text-anchor="middle" class="bl2-s">starts the agent in 45 s</text>
<rect class="bl2-node" x="440" y="20" width="180" height="52" rx="9"/>
<text x="530" y="42" text-anchor="middle" class="bl2-t">Agent listening 24/7</text>
<text x="530" y="59" text-anchor="middle" class="bl2-s">re-arms its own daily sweep</text>
<path class="bl2-flow" d="M140,46 L184,46"/>
<path class="bl2-flow" d="M340,46 L434,46"/>
<path class="bl2-edge bl2-pulse" d="M440,80 C400,105 375,80 350,74"/>
<text x="400" y="105" text-anchor="middle" class="bl2-s">health check every 5 min &#8212; replaced if half-dead</text>
<rect class="bl2-node" x="10" y="120" width="160" height="45" rx="9"/>
<text x="90" y="147" text-anchor="middle" class="bl2-t">8:23 AM daily sweep</text>
<rect class="bl2-node" x="230" y="120" width="220" height="45" rx="9"/>
<text x="340" y="140" text-anchor="middle" class="bl2-t">TestFlight feedback + crashes</text>
<text x="340" y="156" text-anchor="middle" class="bl2-s">what she didn't text about</text>
<rect class="bl2-node" x="510" y="120" width="150" height="45" rx="9"/>
<text x="585" y="147" text-anchor="middle" class="bl2-t">Same triage lane</text>
<path class="bl2-edge" d="M170,142 L224,142"/>
<path class="bl2-edge" d="M450,142 L504,142"/>
</svg>
</div>

<p>The lesson generalizes: an autonomous agent is only as reliable as its supervisor. The interesting engineering isn't the AI writing the fix &mdash; it's the boring systemd timer making sure the AI is still listening.</p>

<div class="flex items-center gap-2 mb-4">
  <h2 class="m-0 text-2xl font-bold">Guardrails That Stay On</h2>
</div>
<p><strong>Ships without asking:</strong> code-only bug fixes (test-first, CI green, rollback sent to me), replies to Van, and GitHub issues generated from her feedback.</p>
<p><strong>Always stops at me:</strong> feature merges, database schema, auth, native modules, App Store builds &mdash; and anything Van's messages <em>instruct</em>. That last one matters more than it looks: her texts are treated as feedback data, never as commands. An agent that obeys instructions found inside user input is an agent waiting to be hijacked. Mine reads "delete all my competitors' reviews" as a bug report about something weird in her inbox, not a task.</p>
<p>And every OTA update has a one-line rollback: republish the previous known-good update group to the production channel. Autonomy without rollback isn't autonomy &mdash; it's gambling.</p>

<div class="flex items-center gap-2 mb-4">
  <h2 class="m-0 text-2xl font-bold">Why I'm Showing You This</h2>
</div>
<p>This is the same architecture I deploy for clients as the <a href="/agent-system">Agent System</a> &mdash; an orchestrator agent, specialized sub-agents, cron automation, and human gates exactly where the blast radius demands them. Archive is me running it on my own product first, with a real user, in public. If it doesn't survive Van's salon, it doesn't ship to you.</p>

<div class="cta-box mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
  <p class="m-0"><strong>Want this for your business?</strong> The <a href="/agent-system">Agent System</a> is this pipeline, deployed for your product and your customers. Or just follow along &mdash; I publish the wins and the outages.</p>
</div>
`,
};
