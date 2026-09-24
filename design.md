# Portfolio Design System — Mizanur Rahman

This doc is the single source of truth for design decisions on this project. Check it before adding anything new, colors, spacing, components, so later sections stay consistent with week 1.

---

## Concept

**Terminal-to-Bento hybrid.**

- Hero section opens as a terminal boot sequence (auto-typing, realistic speed, skippable, respects `prefers-reduced-motion`)
- Once the sequence finishes, the rest of the site unfolds as a bento-grid dashboard, projects, experience, skills, contact, each as a card in the grid
- The terminal panel supplies the hero depth accent through a bounded hover parallax tilt
- Terminal/system text uses IBM Plex Mono, while the hero name reverses the pairing: IBM Plex Mono is the visible identity layer and the serif layer drifts behind it as a decorative shadow

**Why this concept:** Terminal/IDE and Bento are the two developer-portfolio styles that read as memorable and recruiter-friendly rather than generic. Combining them gives a strong entrance plus a scannable, information-dense body.

---

## Tech Stack

- Next.js (App Router), TypeScript
- Tailwind CSS + shadcn/ui (customized, not default look)
- CSS custom properties and pointer events for the terminal hover parallax
- Framer Motion / motion for UI transitions

---

## Typography

One font family, applied with distinct roles:

| Role | Font | Use |
|---|---|---|
| Display | IBM Plex Mono | Name/identity heading only |
| Body | Hanken Grotesk | Paragraphs, nav, labels, buttons |
| Terminal/system | IBM Plex Mono | Terminal output, short system-style status lines, and the visible hero name |

**Agentic mono treatment spec:**
- Letter-spacing slightly widened
- Color: `--accent-strong` in light mode, `--accent` in dark mode
- `text-shadow` glow using the same accent color at low opacity for a soft neon feel
- Trailing blinking cursor block, same blink timing as the terminal's own cursor

---

## Color System

Dark-first, with a warm light-mode counterpart.

### Dark Mode

| Token | Hex | HSL (for CSS var) | Use |
|---|---|---|---|
| Background | `#0A0A0A` | `0 0% 4%` | Page background |
| Surface | `#141414` | `0 0% 8%` | Cards, terminal panel, bento tiles |
| Border | `#2A2A2A` | `0 0% 16%` | Dividers, card outlines |
| Foreground | `#E4E4E4` | `0 0% 89%` | Primary text |
| Muted | `#8A8A8A` | `0 0% 54%` | Secondary text |
| Accent | `#F5A623` | `38 91% 58%` | Fills, buttons, progress bars |
| Accent strong | `#F5A623` | `38 91% 58%` | Same as accent, already AA-safe as text on dark bg |
| Accent hover | `#FFC15E` | `38 100% 68%` | Hover state, goes lighter |
| Name shimmer highlight | `#FFFFFF` at 40% opacity | `0 0% 100%` | The moving highlight band in the name's shimmer sweep, light-on-dark |
| Success | `#4ADE80` | `142 71% 65%` | Positive states |
| Error | `#F87171` | `0 91% 71%` | Destructive states |
| Warning | `#FBBF24` | `43 96% 62%` | Warning states |
| Info | `#60A5FA` | `217 91% 70%` | Rare, comment-style lines only |

### Light Mode

| Token | Hex | HSL (for CSS var) | Use |
|---|---|---|---|
| Background | `#F7F5F2` | `36 24% 96%` | Page background, warm off-white |
| Surface | `#FFFFFF` | `0 0% 100%` | Cards, terminal panel, bento tiles |
| Foreground | `#1A1A1A` | `0 0% 10%` | Primary text |
| Muted | `#6B6B6B` | `0 0% 42%` | Secondary text |
| Border | `#E5E1DC` | `35 16% 88%` | Dividers, card outlines, MUST be visible against surface, add a subtle shadow too, border alone is too faint on near-white |
| Accent | `#F5A623` | `38 91% 58%` | Fills, buttons, progress bars only, never raw icon-only buttons at full saturation, pair with a ghost/outline style instead |
| Accent strong | `#B2530A` | `26 89% 37%` | Text, links, active nav state, name shimmer highlight |
| Accent hover | `#DB8D1F` | `35 75% 49%` | Hover state, goes darker (opposite direction from dark mode) |
| Name shimmer highlight | `#B2530A` at 55% opacity | `26 89% 37%` | The moving highlight band in the name's shimmer sweep, must use accent-strong, NOT white, white-on-dark-text produces no visible effect and causes the frozen-letter bug |
| Success | `#16A249` | `142 76% 36%` | Positive states |
| Error | `#DC2828` | `0 72% 51%` | Destructive states |
| Warning | `#DB7706` | `32 95% 44%` | Warning states |
| Info | `#2463EB` | `221 83% 53%` | Rare, comment-style lines only |

**Why warm off-white instead of pure white:** keeps continuity with the CRT-nostalgia concept from dark mode instead of making light mode feel like a disconnected second theme.

**Why `--accent-strong` is separate:** raw accent amber fails AA contrast as text on light backgrounds, so `--accent` is reserved for fills and buttons while `--accent-strong` handles text, links, active states, and the name shimmer highlight.

**Known bug fixed here:** the name shimmer effect was using a single hardcoded highlight color across both themes. It must be theme-aware, white-based highlight for dark mode, accent-strong-based highlight for light mode, otherwise the sweep either doesn't render or freezes on individual letters like the orange "M" and "R" bug.

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
  --name-highlight: 0 0% 100%;
  --success: 142 71% 65%;
  --destructive: 0 91% 71%;
  --warning: 43 96% 62%;
  --info: 217 91% 70%;
}

.light {
  --background: 36 24% 96%;
  --surface: 0 0% 100%;
  --foreground: 0 0% 10%;
  --muted: 0 0% 42%;
  --border: 35 16% 88%;
  --accent: 38 91% 58%;
  --accent-strong: 26 89% 37%;
  --accent-hover: 35 75% 49%;
  --name-highlight: 26 89% 37%;
  --success: 142 76% 36%;
  --destructive: 0 72% 51%;
  --warning: 32 95% 44%;
  --info: 221 83% 53%;
}
```

Reference these as Tailwind theme colors, never hardcode hex in components.

---

## Design Constraints (avoid AI-slop look)

- No arbitrary pixel values for font size or spacing, define a type scale and spacing scale once, use only those values everywhere
- Sentence case on all headings and labels, never Title Case
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs
- Customize shadcn defaults, never ship the untouched look
- Icon-only buttons (like the theme toggle) use a ghost/outline treatment, never a fully-filled solid accent circle, full saturation fills are reserved for primary CTAs only

---

## Accessibility

- Terminal typing output in an appropriately managed `aria-live` region, not read character by character
- Full keyboard access, no focus traps during animations
- Proper semantic heading hierarchy, real `h1` on the hero
- Reduced motion users skip straight to the settled end-state (no forced animation)
- Light mode border/shadow values checked against actual contrast, not just copied proportionally from dark mode

---

## Section Rollout (one per week)

| Week | Section | Status |
|---|---|---|
| 1 | Hero (terminal boot + theming) | In progress |
| 2 | Bento dashboard shell (grid structure) | Not started |
| 3 | Experience / projects cards | Not started |
| 4 | Skills visualization | Not started |
| 5 | Contact + polish | Not started |

---

## Decision Log

- **Week 1:** Built the terminal boot hero with randomized 28–80ms character pacing, longer punctuation and inter-line pauses, and a skippable reduced-motion path. Terminal has bounded pointer parallax tilt, disabled for reduced-motion users.
- **Theme system:** Added theme toggler to nav, implemented light-mode tokens, split `--accent` from `--accent-strong`.
- **Bugfix:** Light mode shipped with broken name-shimmer (frozen orange letters) and an overly saturated solid theme-toggle icon. Root cause was reusing dark-mode-only values (`--name-highlight`, full-fill icon buttons) without a light-mode-specific variant. Fixed by adding a theme-aware `--name-highlight` token and switching icon-only buttons to ghost style.
- **Typography:** Added a third type layer, "agentic mono," a monospace status-text treatment with accent glow and blinking cursor, used for short system-style taglines only, kept separate from the serif name and sans body text.
- **Typography:** Hanken Grotesk remains the body/UI font; IBM Plex Mono is loaded once at the root through `next/font` for terminal/system text, avoiding runtime font loading.
- **Typography scale:** Aligned UI labels/buttons to 14px and terminal content to 18px, with the terminal's fixed height and hero measures expanded to preserve readable wrapping and layout stability.
- **Name interaction:** Added a GSAP ScrambleText decryption effect on hover for the hero name, while retaining its semantic name for assistive technology and disabling the effect for reduced-motion users.
