#!/usr/bin/env node
// Renders the prompt library (src/content/prompt-library.ts) to
// public/downloads/jts-prompt-library.pdf. Dev-only; the PDF is committed.
//
//   pnpm prompts:pdf              # uses /usr/bin/chromium
//   CHROME_PATH=... pnpm prompts:pdf
//
// Single source of truth: the same module feeds the /prompt-library page.

import { chromium } from "playwright-core";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Let Node import the TypeScript content module directly (Node 22+ strips types).
const here = dirname(fileURLToPath(import.meta.url));
const { PROMPT_LIBRARY, LIBRARY_META } = await import(resolve(here, "../../src/content/prompt-library.ts"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const total = PROMPT_LIBRARY.reduce((n, c) => n + c.prompts.length, 0);

const css = `
  @page { size: Letter; margin: 0.7in 0.75in 0.8in; }
  * { box-sizing: border-box; }
  body { font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #0a1f1d; font-size: 10.5pt; line-height: 1.5; margin: 0; }
  .mono { font-family: "JetBrains Mono", "JetBrainsMono Nerd Font", ui-monospace, "SFMono-Regular", Menlo, monospace; }
  .cover { height: 9.2in; display: flex; flex-direction: column; justify-content: center; page-break-after: always; }
  .cover .prompt { color: #02a0a0; font-weight: 700; font-size: 12pt; margin-bottom: 18pt; }
  .cover h1 { font-size: 34pt; line-height: 1.1; margin: 0 0 14pt; letter-spacing: -0.02em; }
  .cover h1 em { font-style: normal; color: #02a0a0; }
  .cover .sub { font-size: 13pt; color: #3d5652; max-width: 5.6in; }
  .cover .meta { margin-top: 36pt; font-size: 9.5pt; color: #5b7370; }
  .cover .box { border: 2px solid #0a1f1d; box-shadow: 8px 8px 0 #02a0a0; padding: 28pt 30pt; background: #ffffff; }
  h2.cat { font-size: 20pt; margin: 0 0 4pt; page-break-before: always; letter-spacing: -0.01em; }
  h2.cat span { color: #02a0a0; }
  .cat-desc { color: #3d5652; margin: 0 0 16pt; font-size: 11pt; }
  .card { border: 1.5px solid #cfdedb; padding: 12pt 14pt 10pt; margin: 0 0 12pt; page-break-inside: avoid; background: #fff; }
  .card h3 { font-size: 12.5pt; margin: 0 0 3pt; }
  .card .when { color: #3d5652; font-size: 9.5pt; margin: 0 0 8pt; }
  .card pre { white-space: pre-wrap; background: #071317; color: #d9ece9; padding: 10pt 12pt; margin: 0 0 8pt; font-size: 9.2pt; line-height: 1.45; border-left: 3px solid #02a0a0; }
  .card .tips { font-size: 9.3pt; color: #3d5652; margin: 0; }
  .card .tips b { color: #0a1f1d; }
  .card .src { font-size: 8.3pt; color: #7a8f8c; margin: 6pt 0 0; }
  .patterns li, .credits li { margin-bottom: 5pt; }
  .credits { font-size: 9.3pt; }
  a { color: #02a0a0; text-decoration: none; }
  .footer-note { margin-top: 20pt; font-size: 9pt; color: #5b7370; border-top: 1px solid #cfdedb; padding-top: 8pt; }
`;

const cover = `
<section class="cover">
  <div class="box">
    <div class="prompt mono">$ ls ~/prompts</div>
    <h1>The prompt library <em>I actually use.</em></h1>
    <p class="sub">${esc(LIBRARY_META.subtitle)}</p>
    <p class="meta mono">${total} prompts · ${PROMPT_LIBRARY.length} categories · v${esc(LIBRARY_META.version)} · ${esc(LIBRARY_META.date)}<br/>joestechsolutions.com/prompt-library · joe@joestechsolutions.com</p>
  </div>
</section>`;

const howTo = `
<section>
  <h2 class="cat" style="page-break-before:auto"><span>#</span> How to use these</h2>
  <p class="cat-desc">${esc(LIBRARY_META.howTo)}</p>
  <ul class="patterns">${LIBRARY_META.patterns.map((p) => `<li><b>${esc(p.name)}.</b> ${esc(p.body)}</li>`).join("")}</ul>
</section>`;

const sections = PROMPT_LIBRARY.map((c) => `
<section>
  <h2 class="cat"><span>${esc(c.prefix)}</span> ${esc(c.name)}</h2>
  <p class="cat-desc">${esc(c.description)}</p>
  ${c.prompts.map((p) => `
  <article class="card">
    <h3>${esc(p.title)}</h3>
    <p class="when"><b>Use it when:</b> ${esc(p.when)}</p>
    <pre class="mono">${esc(p.prompt)}</pre>
    ${p.tips ? `<p class="tips"><b>Make it yours:</b> ${esc(p.tips)}</p>` : ""}
    ${p.inspiredBy ? `<p class="src">Pattern credit: ${esc(p.inspiredBy)}</p>` : ""}
  </article>`).join("")}
</section>`).join("");

const credits = `
<section>
  <h2 class="cat"><span>~</span> Credits and sources</h2>
  <p class="cat-desc">${esc(LIBRARY_META.creditsIntro)}</p>
  <ul class="credits">${LIBRARY_META.sources.map((s) => `<li><b>${esc(s.creator)}</b> — ${esc(s.what)} <a href="${esc(s.url)}">${esc(s.url)}</a></li>`).join("")}</ul>
  <p class="footer-note">${esc(LIBRARY_META.footer)}</p>
</section>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${cover}${howTo}${sections}${credits}</body></html>`;

const out = resolve(here, "../../public/downloads/jts-prompt-library.pdf");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(resolve(here, "../../.next-prompt-library.html"), html); // handy for eyeballing; gitignored below

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? "/usr/bin/chromium" });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.pdf({
  path: out,
  format: "Letter",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: `<div></div>`,
  footerTemplate: `<div style="width:100%;font-family:Arial,sans-serif;font-size:8px;color:#7a8f8c;padding:0 0.75in;display:flex;justify-content:space-between"><span>Joe's Tech Solutions — Prompt Library v${esc(LIBRARY_META.version)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  margin: { top: "0.7in", right: "0.75in", bottom: "0.8in", left: "0.75in" },
});
await browser.close();
console.log(`wrote ${out} (${total} prompts, ${PROMPT_LIBRARY.length} categories)`);
