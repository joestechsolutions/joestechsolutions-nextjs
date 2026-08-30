# JTS Brand — Midnight Edition (2026 Rebrand)

Chosen by Joe Aug 30 2026 from palette candidates. Replaces Safety Orange system.

## Palette
| Role | Hex | Name | Use |
|------|-----|------|-----|
| Base (dark) | `#071317` | Midnight Edition | dark backgrounds, panels, hero grounds |
| Primary | `#02A0A0` | Traditional Turquoise | brand color: headlines accent, links, icons, CTAs (both modes) |
| Accent | `#FFBD65` | Pastel Orange | sparing emphasis: badges, highlights, hovers. Never competing with primary for attention on the same element |
| Base (light) | `#f2f7f6` | misted paper | light mode background |
| Ink (light) | `#0a1f1d` | deep teal-charcoal | light mode foreground |
| Ink (dark) | `#d9ece9` | pale mint | dark mode foreground |
| OK green | `#3ddc84` (dark) / `#00871f` (light) | — | status only |

## Rules
1. NEVER invent colors — extend via tokens only. All colors flow from `src/app/globals.css` `:root` + `.dark` variables. Components consume `text-primary`, `bg-card`, `border-border` etc. — never raw hex in JSX (the 15 legacy stragglers swept Aug 2026 stay swept).
2. Turquoise is the ONE brand color. Pastel orange = spice, not sauce. If a screen is mostly orange, it's wrong.
3. Pairing for contrast: turquoise text on `#071317` ✓ · pastel orange text only on midnight, never on white (fails contrast) — on light mode orange appears as washes (`#fff1dc`) or chip fills.
4. Type unchanged: Inter (body) + JetBrains Mono (headlines/code).
5. Zero radius stays. Sharp corners are part of the identity.

## Where it lives
- Tokens: `src/app/globals.css`
- OG/favicon/logo assets: ✅ regenerated Aug 30 2026 from candidate A (Badge Monogram) — logo-icon set 16–192, favicons, apple-touch 180, OG 1200×630. Old brand **fully purged** Aug 30 (backup dir + logo-main* shells deleted, 404 in prod) per Joe. Master: `~/generations/jts_logo_A_final_master.png`. Note: raster PNGs downscaled from 1024 AI master — a hand-traced SVG is the eventual ideal for infinite scaling.
- OG image + social templates: update when next generated — use #071317 ground, turquoise type, pastel-orange accent bar