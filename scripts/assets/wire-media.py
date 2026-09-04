#!/usr/bin/env python3
"""Point every hero at its generated media in public/generated (loop clip if present, else still).
Idempotent: re-run after each generation batch. Pages keep their current image if nothing was generated."""
import re, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
GEN = ROOT / "public/generated"
PAGES = {  # page file → shot id
    "src/app/solutions/page.tsx": "solutions", "src/app/services/page.tsx": "services", "src/app/stack/page.tsx": "stack",
    "src/app/blog/page.tsx": "blog", "src/app/about/page.tsx": "about", "src/app/contact/page.tsx": "contact",
    "src/app/agent-system/page.tsx": "agent-system", "src/app/private-ai-setup/page.tsx": "private-ai",
    "src/app/prompt-library/page.tsx": "prompt-library", "src/app/portfolio/page.tsx": "portfolio",
    "src/app/google-maps-growth/page.tsx": "google-maps", "src/app/whisper-walkie/page.tsx": "whisper-walkie",
    "src/app/portfolio/skate-workshop/page.tsx": "case-skate", "src/app/portfolio/renfaire-directory/page.tsx": "case-renfaire",
    "src/app/portfolio/cbarrgs/page.tsx": "case-cbarrgs",
}
changed = []
for rel, shot in PAGES.items():
    p = ROOT / rel; s = p.read_text()
    loop, still = GEN / f"page-{shot}-loop.mp4", GEN / f"page-{shot}.jpg"
    if loop.exists():
        media = f'media={{{{ type: "video", src: "/generated/page-{shot}-loop.mp4", poster: "/generated/page-{shot}-loop-poster.jpg" }}}}'
    elif still.exists():
        media = f'media={{{{ type: "image", src: "/generated/page-{shot}.jpg" }}}}'
    else:
        continue
    new = re.sub(r'media=\{\{ type: "(?:image|video)"[^}]*\}\}', media, s, count=1)
    if new != s:
        p.write_text(new); changed.append(f"{rel} → {media.split('src: ')[1].split(',')[0]}")
# homepage scenes
HOME = [("src/components/home/scroll/CinematicHero.tsx", "hero-loop", "/generated/hero-loop"),
        ("src/components/home/scroll/ScrubScene.tsx", "system-scrub", "/videos/scrub-system"),
        ("src/components/home/scroll/CtaScene.tsx", "cta-loop", "/videos/cta-loop")]
for rel, shot, old in HOME:
    if not (GEN / f"{shot}.mp4").exists(): continue
    p = ROOT / rel; s = p.read_text()
    new = s.replace(f'{old}.mp4', f'/generated/{shot}.mp4').replace(f'{old}-poster.jpg', f'/generated/{shot}-poster.jpg')
    if new != s: p.write_text(new); changed.append(f"{rel} → /generated/{shot}.mp4")
print("\n".join(changed) if changed else "nothing to wire yet")
