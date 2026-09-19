# Portfolio Design System — Mizanur Rahman

This doc is the single source of truth for design decisions on this project. Check it before adding anything new, colors, spacing, components, so later sections stay consistent with week 1.

---

## Concept

**Terminal-to-Bento hybrid.**

- Hero section opens as a terminal boot sequence (auto-typing, realistic speed, skippable, respects `prefers-reduced-motion`)
- Once the sequence finishes, the rest of the site unfolds as a bento-grid dashboard, projects, experience, skills, contact, each as a card in the grid
- The terminal panel itself supplies the hero depth accent through a bounded hover parallax tilt. This keeps the first screen focused and avoids a competing decorative object.

**Why this concept:** Terminal/IDE and Bento are the two developer-portfolio styles that read as memorable and recruiter-friendly rather than generic. Combining them gives a strong entrance plus a scannable, information-dense body.

---

## Tech Stack

- Next.js (App Router), TypeScript
- Tailwind CSS + shadcn/ui (customized, not default look)
- CSS custom properties and pointer events for the terminal hover parallax
- Framer Motion / motion for UI transitions

---

## Color System

Dark-first, with a warm light-mode counterpart.

| Token | Hex | HSL (for CSS var) | Use |
|---|---|---|---|
| Background | `#0A0A0A` | `0 0% 4%` | Page background, near-black not pure black |
| Surface | `#141414` | `0 0% 8%` | Cards, terminal panel, bento tiles |
| Border | `#2A2A2A` | `0 0% 16%` | Dividers, card outlines |
| Foreground | `#E4E4E4` | `0 0% 89%` | Primary text |
| Muted | `#8A8A8A` | `0 0% 54%` | Secondary text, timestamps, comments |
| Accent | `#F5A623` | `38 91% 58%` | Primary accent, warm amber (CRT feel) |
| Accent hover | `#FFC15E` | `38 100% 68%` | Hover/active state on accent elements |
| Success | `#4ADE80` | `142 71% 65%` | Fake "ok" terminal lines, positive states |
| Error | `#F87171` | `0 91% 71%` | Fake error lines, destructive states |
| Warning | `#FBBF24` | `43 96% 62%` | Warning states |
| Info | `#60A5FA` | `217 91% 70%` | Rare, comment-style lines only |

**Why amber, not purple or green:** purple-to-blue gradients are the default "AI SaaS" look right now, avoiding it dodges the generic-AI-slop read. Green-on-black is the cliché "hacker portfolio" look. Amber reads as authentic CRT/terminal nostalgia and pairs cleanly with near-black without feeling copied.

### Light Mode

| Token | Hex | HSL (for CSS var) | Use |
|---|---|---|---|
| Background | `#F7F5F2` | `36 24% 96%` | Page background, warm off-white |
| Surface | `#FFFFFF` | `0 0% 100%` | Cards, terminal panel, bento tiles |
| Foreground | `#1A1A1A` | `0 0% 10%` | Primary text |
| Muted | `#6B6B6B` | `0 0% 42%` | Secondary text, timestamps, comments |
| Border | `#E5E1DC` | `35 16% 88%` | Dividers, card outlines |
| Accent | `#F5A623` | `38 91% 58%` | Button, icon, and progress fills |
| Accent strong | `#B2530A` | `26 89% 37%` | Links, active states, and amber text requiring AA contrast |
| Accent hover | `#DB8D1F` | `35 75% 49%` | Hover/active state on accent fills |
| Success | `#16A249` | `142 76% 36%` | Fake "ok" terminal lines, positive states |
| Error | `#DC2828` | `0 72% 51%` | Fake error lines, destructive states |
| Warning | `#DB7706` | `32 95% 44%` | Warning states |
| Info | `#2463EB` | `221 83% 53%` | Rare, comment-style lines only |

**Why warm off-white instead of pure white:** `#F7F5F2` keeps continuity with the CRT-nostalgia concept from dark mode instead of making light mode feel like a disconnected second theme.

**Why `--accent-strong` is separate:** raw accent amber fails AA contrast as text on light backgrounds, so `--accent` is reserved for fills and buttons while `--accent-strong` handles text, links, and active states.

### CSS variables (globals.css)

```css
:root {
  --background: 0 0% 4%;
  --surface: 0 0% 8%;
  --foreground: 0 0% 89%;
  --muted: 0 0% 54%;
  --border: 0 0% 16%;
  --accent: 38 91% 58%;
  --accent-strong: 38 91% 58%;
  --accent-hover: 38 100% 68%;
  --success: 142 71% 65%;
  --destructive: 0 91% 71%;
  --warning: 43 96% 62%;
  --info: 217 91% 70%;
}
```

Reference these as Tailwind theme colors, never hardcode hex in components.

---

## Design Constraints (avoid AI-slop look)

- No arbitrary pixel values for font size or spacing, define a type scale and spacing scale once, use only those values everywhere
- Sentence case on all headings and labels, never Title Case
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs
- Customize shadcn defaults, never ship the untouched look
- Monospace font for terminal/code elements, a separate contrasting font for headings/body, not two similar sans fonts

---

## Accessibility

- Terminal typing output in an appropriately managed `aria-live` region, not read character by character
- Full keyboard access, no focus traps during animations
- Proper semantic heading hierarchy, real `h1` on the hero
- Reduced motion users skip straight to the settled end-state (no forced animation)

---

## Section Rollout (one per week)

| Week | Section | Status |
|---|---|---|
| 1 | Hero (terminal boot + 3D accent) | In progress |
| 2 | Bento dashboard shell (grid structure) | Not started |
| 3 | Experience / projects cards | Not started |
| 4 | Skills visualization | Not started |
| 5 | Contact + polish | Not started |

---

## Decision Log

Add one line per week here, what you built, what you changed from plan, and why. Future-you will forget the reasoning otherwise.

- **Week 1:** Built the terminal boot hero with randomized 28–80ms character pacing, longer punctuation and inter-line pauses, and a skippable reduced-motion path. The terminal itself has a bounded pointer parallax tilt, resets when the pointer leaves, and is disabled for reduced-motion users. The completed boot sequence reveals the portfolio actions and a terminal-style `scroll↓` cue for the forthcoming bento dashboard.
- **Theme system:** Added a theme toggler to the navigation, implemented light-mode tokens, and split `--accent` from `--accent-strong` so amber fills stay expressive while amber text remains accessible on light backgrounds.
