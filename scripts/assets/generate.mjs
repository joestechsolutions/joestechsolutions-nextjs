#!/usr/bin/env node
// Generate on-brand images and video clips for the homepage scroll journey via Replicate.
//
//   REPLICATE_API_TOKEN=r8_... node scripts/assets/generate.mjs [--only images|videos] [--dry-run] [--shot <id>]
//
// Output lands in public/generated/. Videos are post-processed with ffmpeg into the
// three encodes the scenes expect (loop / all-keyframe scrub / loop). Re-running skips
// shots whose output already exists — delete a file to regenerate it.

import { mkdir, writeFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const OUT = path.resolve("public/generated");
const TOKEN = process.env.REPLICATE_API_TOKEN;
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const dry = args.includes("--dry-run");
const shotFilter = args.includes("--shot") ? args[args.indexOf("--shot") + 1] : null;

// Swap models here if Replicate renames or you want a different look.
const MODELS = {
  image: "black-forest-labs/flux-1.1-pro",
  video: "kwaivgi/kling-v2.1",
};

// Brand: midnight #071317 ground, turquoise #02a0a0, pastel orange #f5a94f accent.
// "Precision badge" — geometric, restrained, engineered. No people, no legible text.
const BRAND =
  "midnight teal-black palette (#071317), turquoise rim light (#02a0a0), a single pastel-orange accent (#f5a94f), " +
  "photoreal, cinematic, restrained, precise, high contrast, film grain, no people, no legible text, no watermark";

const SHOTS = [
  {
    id: "hero-workshop",
    kind: "image",
    aspect_ratio: "21:9",
    prompt: `Cinematic wide shot of a dark, quiet engineering workshop at night: one desk, three monitors glowing with terminal code, a compact rack server on a shelf with one turquoise status light, one warm desk lamp, shallow depth of field, 35mm, ${BRAND}`,
  },
  {
    id: "private-ai-server",
    kind: "image",
    aspect_ratio: "16:9",
    prompt: `A small-business back office: a single compact matte-black server on a wooden shelf with turquoise LEDs, exposed brick, an open laptop showing a dark chat interface, moody practical lighting, ${BRAND}`,
  },
  {
    id: "agent-network",
    kind: "image",
    aspect_ratio: "16:9",
    prompt: `Abstract visualization of sixteen glowing nodes connected by thin lines into an org chart, floating in black-teal space, turquoise nodes, one pastel-orange root node, geometric, minimal, precise, ${BRAND}`,
  },
  {
    id: "custom-build-devices",
    kind: "image",
    aspect_ratio: "4:5",
    prompt: `Product photograph of a phone and a laptop on a matte black desk, both screens showing a clean dark app interface with turquoise accents, studio lighting, ${BRAND}`,
  },
  {
    id: "hero-loop",
    kind: "video",
    aspect_ratio: "16:9",
    duration: 5,
    post: "loop",
    prompt: `Slow cinematic push-in on a dark engineering workshop at night: three monitors with terminal text slowly scrolling, a compact server with a pulsing turquoise light, steady camera, seamless loop feel, ${BRAND}`,
  },
  {
    id: "system-scrub",
    kind: "video",
    aspect_ratio: "16:9",
    duration: 10,
    post: "scrub",
    prompt: `Camera slowly orbits a floating network of sixteen glowing turquoise nodes connected by thin lines; nodes light up one by one, a single pastel-orange root node at the center, black-teal space, smooth constant motion, ${BRAND}`,
  },
  {
    id: "cta-loop",
    kind: "video",
    aspect_ratio: "16:9",
    duration: 5,
    post: "loop",
    prompt: `Slow dolly forward down a dark server corridor, turquoise light strips along the racks, faint haze, steady camera, seamless loop feel, ${BRAND}`,
  },
  // ── Per-page heroes (one unique still + clip per page; nothing reused across the site) ──
  ...[
    ["solutions", "A workbench with three distinct tools laid out in a row on dark steel — a small server, a laptop, a phone — each under its own pool of turquoise light"],
    ["services", "Three doorways in a dark concrete corridor, each lit from inside with a different intensity of turquoise, one with a warm pastel-orange glow"],
    ["stack", "Tight macro of a running server rack: fiber, blinking turquoise link lights, brushed aluminum, shallow focus"],
    ["blog", "A dark desk at night with an open notebook, a mechanical keyboard, and a monitor showing a terminal, turquoise screen glow, warm lamp"],
    ["about", "Empty founder's chair at a workbench, tools hung with precision on a pegboard, one warm lamp, turquoise monitor glow at the edge of frame"],
    ["contact", "A single vintage telephone handset on a dark steel desk lit by one turquoise light, cable coiling into darkness"],
    ["agent-system", "Sixteen small identical black cubes arranged as an org chart on a dark surface, thin turquoise light lines connecting them, top-down"],
    ["private-ai", "A compact matte-black server sitting on a wooden shelf in a small-business back office, padlock-shaped turquoise indicator light, brick wall"],
    ["prompt-library", "Rows of index cards in a black card catalog drawer, one pulled out and lit turquoise, monospace-looking marks on the cards, no legible text"],
    ["portfolio", "A gallery wall in a dark room with three unlit framed screens, a single turquoise spotlight on the middle frame"],
    ["google-maps", "A city street at dusk seen from above, one storefront glowing pastel orange, a turquoise map pin of light hovering over it"],
    ["whisper-walkie", "A vintage push-to-talk microphone on a dark desk, a turquoise sound-wave of light frozen mid-air in front of it"],
    ["case-skate", "A skateboard leaning against a dark concrete wall under a turquoise light strip, wheels catching the light"],
    ["case-renfaire", "Colorful festival banners and a castle tower silhouette at dusk, a turquoise glow rising from below, painterly but photoreal"],
    ["case-cbarrgs", "A studio synthesizer and headphones on a dark desk, one turquoise LED strip, warm pastel-orange VU meter glow"],
  ].flatMap(([page, scene]) => [
    { id: `page-${page}`, kind: "image", aspect_ratio: "21:9", prompt: `${scene}, cinematic wide shot, 35mm, shallow depth of field, ${BRAND}` },
    { id: `page-${page}-loop`, kind: "video", aspect_ratio: "16:9", duration: 5, post: "loop", prompt: `Slow, steady cinematic push-in: ${scene}; subtle light flicker, seamless loop feel, ${BRAND}` },
  ]),
];

const exists = (p) => access(p).then(() => true, () => false);

async function replicate(model, input) {
  const res = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", Prefer: "wait=60" },
    body: JSON.stringify({ input }),
  });
  if (!res.ok) throw new Error(`${model}: ${res.status} ${await res.text()}`);
  let pred = await res.json();
  while (!["succeeded", "failed", "canceled"].includes(pred.status)) {
    await new Promise((r) => setTimeout(r, 4000));
    const poll = await fetch(pred.urls.get, { headers: { Authorization: `Bearer ${TOKEN}` } });
    pred = await poll.json();
    process.stdout.write(".");
  }
  if (pred.status !== "succeeded") throw new Error(`${model} ${pred.status}: ${pred.error}`);
  const url = Array.isArray(pred.output) ? pred.output[0] : pred.output;
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

function postProcess(shot, rawPath) {
  const out = path.join(OUT, `${shot.id}.mp4`);
  const common = ["-v", "error", "-y", "-i", rawPath, "-an", "-vf", "scale=1280:-2", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];
  const extra = shot.post === "scrub" ? ["-crf", "27", "-g", "1", "-keyint_min", "1"] : ["-crf", "27"];
  execFileSync("ffmpeg", [...common, ...extra, out]);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", "0.3", "-i", out, "-frames:v", "1", "-q:v", "4", path.join(OUT, `${shot.id}-poster.jpg`)]);
  return out;
}

async function main() {
  if (!TOKEN && !dry) {
    console.error("REPLICATE_API_TOKEN is not set.");
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });
  for (const shot of SHOTS) {
    if (only && `${shot.kind}s` !== only) continue;
    if (shotFilter && shot.id !== shotFilter) continue;
    const ext = shot.kind === "image" ? "jpg" : "mp4";
    const dest = path.join(OUT, `${shot.id}.${ext}`);
    if (await exists(dest)) {
      console.log(`skip  ${shot.id} (exists)`);
      continue;
    }
    console.log(`${dry ? "would " : ""}gen   ${shot.id}  [${MODELS[shot.kind]}]`);
    if (dry) continue;
    const input =
      shot.kind === "image"
        ? { prompt: shot.prompt, aspect_ratio: shot.aspect_ratio, output_format: "jpg", output_quality: 90, safety_tolerance: 2 }
        : { prompt: shot.prompt, aspect_ratio: shot.aspect_ratio, duration: shot.duration, mode: "standard" };
    const buf = await replicate(MODELS[shot.kind], input);
    if (shot.kind === "image") {
      await writeFile(dest, buf);
    } else {
      const raw = path.join(OUT, `${shot.id}.raw.mp4`);
      await writeFile(raw, buf);
      postProcess(shot, raw);
    }
    console.log(`\ndone  ${dest}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
