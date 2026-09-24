# Typography Guide — Portfolio (agent reference)

Read this before touching any font, size, weight, or text-related code. This is the single source of truth for typography on this project, alongside `DESIGN.md` for color. Do not introduce a font, size, or weight that isn't defined here without flagging it first.

---

## Why this guide exists

Default AI-generated frontends converge on the same handful of fonts (Inter, Roboto, Montserrat, Poppins, Fraunces, Geist, Söhne) because every template and starter kit ships them as defaults. Using them isn't wrong technically, but it's the fastest way for a hand-built site to read as templated. This project deliberately avoids that list across all three type roles below.

---

## The three type roles

Never mix these. Never use a role's font for a purpose outside its defined use.

### 1. Display (identity)

**Font:** Theme-aware: IBM Plex Mono in dark mode and Georgia in light mode
**Use:** the hero name heading ONLY. Nowhere else on the site.
**Alternatives if swapping:** Instrument Serif (Google Fonts, OFL) or Bricolage Grotesque (Google Fonts, variable, OFL), both fresher than Fraunces/Playfair which are now common defaults.
**Rules:**
- Never used for body copy, labels, or buttons
- Always paired with `text-wrap: balance` to avoid orphaned words on wrap
- Weight: use a display-appropriate weight, this is meant to feel intentional and large, not a body-weight font blown up

### 2. Body / UI (everything else readable)

**Font:** Onest or Hanken Grotesk (Google Fonts, OFL, variable)
**Use:** paragraphs, nav items, labels, button text, form fields, bento card content
**Rules:**
- Never Inter, Roboto, Montserrat, Poppins, DM Sans, or Plus Jakarta Sans, these are the current "AI default" cluster and actively avoided on this project
- Sentence case everywhere, never Title Case on headings, nav items, or labels
- Body paragraphs get `text-wrap: pretty`
- Minimum body size 16px, never smaller for actual reading content

### 3. Terminal / mono (functional code aesthetic)

**Font:** IBM Plex Mono (Google Fonts, OFL), used for terminal panel content, command lines, and code-styled elements
**Rules:**
- Reserved for the terminal panel and any literal "code" styled content
- Never used for headings or body copy outside the terminal context
- This is the one role where looking "like every dev site" is fine, a terminal is supposed to look like a terminal

### 4. Agentic mono (system-status accent, used sparingly)

Not a fourth separate font, this reuses IBM Plex Mono with a distinct visual treatment, defined in `DESIGN.md`:
- Widened letter-spacing
- Accent-colored text with a soft glow (`text-shadow` at low opacity, same accent color)
- Trailing blinking cursor block
- Used only for short system-style status lines (e.g. a tagline near "Developer profile"), never for paragraphs or the terminal's main content

---

## Type scale

Do not use arbitrary pixel values anywhere (`text-[15px]`, `text-[22px]`, etc). Every font size on the site must come from this scale. If a design need doesn't fit, adjust the scale itself here rather than reaching for a one-off value.

| Token | Size | Line height | Use |
|---|---|---|---|
| `text-xs` | 12px | 1.4 | Timestamps, fine print, badge labels |
| `text-sm` | 14px | 1.5 | Secondary text, nav items, muted captions |
| `text-base` | 16px | 1.6 | Body paragraphs (minimum readable size) |
| `text-lg` | 18px | 1.6 | Lead paragraphs, larger body text |
| `text-xl` | 20px | 1.4 | Card titles, small headings |
| `text-2xl` | 24px | 1.3 | Section subheadings |
| `text-3xl` | 32px | 1.2 | Section headings |
| `text-4xl` | 40px | 1.15 | Larger section headings |
| `text-5xl`+ | 56px+ | 1.05–1.1 | Hero display name only |

Spacing between text elements should also snap to the existing 4px/8px spacing grid used across the rest of the site, defined in `DESIGN.md`, not one-off margin/padding values.

---

## Loading fonts (performance)

- Load all fonts via `next/font/google` (not a manual `<link>` tag), so Next.js handles self-hosting, subsetting, and layout-shift prevention automatically
- Only load the weights actually used (don't import all 9 weights of a variable font if only 3 are used in the design)
- Set `display: 'swap'` so text renders immediately with a fallback rather than staying invisible while the font loads
- Terminal/mono font: subset to Latin characters only unless multilingual support becomes a requirement later

---

## Accessibility

- Body text never below 16px
- Line height never tighter than 1.2 even on large display text, tighter risks readability issues
- Color contrast for all text must meet WCAG AA against its background in BOTH light and dark themes, check `--accent-strong` usage per the color guide in `DESIGN.md`, don't use `--accent` as literal text color on light backgrounds
- The agentic-mono glow effect must not reduce actual text contrast below AA, the glow is decorative, the base text color underneath must still pass on its own

---

## Quick checklist before shipping any new text element

1. Which of the three roles does this belong to, display, body, or terminal/mono?
2. Is the size coming from the defined type scale, not an arbitrary value?
3. Is it sentence case, not Title Case?
4. Does it need `text-wrap: balance` (headings) or `text-wrap: pretty` (paragraphs)?
5. Does it pass contrast in both light and dark theme?
