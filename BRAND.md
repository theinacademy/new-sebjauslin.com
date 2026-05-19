# Seb Jauslin — Brand Tokens

## Colour Palette
| Name | Hex | Role |
|------|-----|------|
| Ink Red | `#FF5757` | Gradient start, accent surfaces |
| Deep Red | `#C21A1A` | Gradient end, wordmark period, Deep Red accents |
| Paper | `#FFFFFF` | Primary background (~65% of page area) |
| Cream | `#FAF0E2` | Secondary background (~20% of page area) |
| Noir | `#14110F` | All body copy, headings on light bg |

**Proportion rule:** Paper 65% · Cream 20% · Ink Red + Gradient 12% · Deep Red 3%

## Gradient — Brand Signature
```css
linear-gradient(135deg, #FF5757, #C21A1A)
```

### Apply gradient to:
- Wordmark period ("Seb Jauslin**.**")
- One italic display word/phrase in hero headline (via `background-clip: text`)
- Section divider accent lines
- CTA button hover states
- Monogram "SJ" avatar
- Pull quote attribution marks
- Footer colophon / closing statement
- Key stat numbers (e.g. "77%")

### Gradient text implementation:
```css
.gradient-text {
  background: linear-gradient(135deg, #FF5757, #C21A1A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Never apply gradient to:
- Body copy or extended reading
- Navigation items
- Small captions or mono text
- Paired with any other saturated colour
- Large background fills (use sparingly on accent bands only)

## Typography
| Role | Typeface | Weight | Size | Notes |
|------|----------|--------|------|-------|
| Wordmark | Kanit Italic | 300 | — | Always with gradient period |
| Display headline | Montserrat | Light 300 / Medium 500 | 56–80px | Letter-spacing −0.03em |
| Accent phrase within headline | Kanit Italic | ExtraLight 200 | same | Gradient text; single word or short phrase only |
| Body intro | Montserrat | 400 | 18px / 1.6 | First paragraph of section |
| Body | Montserrat | 400 | 16px / 1.6 | General body copy |
| Kicker / eyebrow | JetBrains Mono | 500 | 11–14px | Uppercase, letter-spacing +0.14em |
| Section number | JetBrains Mono | 500 | 12–14px | Format: `/ 01`, `/ 02` etc. |
| Button | Montserrat | 500 | 14–15px | — |
| Caption | JetBrains Mono | 400 | 11–13px | Letter-spacing +0.14em |

### Google Fonts import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Kanit:ital,wght@0,300;0,400;0,500;1,200;1,300&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Typography rules:
- **Montserrat** is the primary font for everything: headlines, body, buttons, nav
- **Kanit** is used ONLY for: the wordmark, italic accent phrases within Montserrat headlines, and gradient display text. Always Light 300 or Italic ExtraLight 200. NEVER Regular, NEVER Bold.
- **JetBrains Mono** for: section kickers, eyebrow labels, captions, timestamps, credential lists

## CSS Design Tokens
```css
:root {
  --ink-red: #FF5757;
  --deep-red: #C21A1A;
  --paper: #FFFFFF;
  --cream: #FAF0E2;
  --noir: #14110F;
  --gradient: linear-gradient(135deg, #FF5757, #C21A1A);

  --font-primary: 'Montserrat', sans-serif;
  --font-accent: 'Kanit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --display-tracking: -0.03em;
  --body-tracking: 0;
  --mono-tracking: 0.14em;

  --hairline: 1px solid rgba(20, 17, 15, 0.12);
  --section-gap: 180px;
  --max-width: 1200px;
}
```

## Layout Principles
- **Grid**: 12-column, max-width 1200px, generous gutters (clamp-based)
- **Alignment**: Asymmetric — headlines left-aligned, NOT centered. Avoid symmetrical compositions.
- **Dividers**: 1px hairlines (`--hairline`) between sections. NEVER thick borders.
- **Whitespace**: Generous. Whitespace is the loudest element on the page.
- **Sections**: Each section numbered with `/ 01` kicker in JetBrains Mono above the headline
- **Aesthetic**: Editorial Swiss — like a high-end annual report or architecture magazine. Not SaaS, not startup.

## Voice Rules
- Direct, warm, considered
- No corporate jargon, no self-help tone
- No exclamation marks in headlines
- Evidence over slogans
- B2B framing: organisational pain, business outcomes, ROI — not individual personal growth

## Always / Never
| Always | Never |
|--------|-------|
| 4 colours + gradient only | Introduce a 5th colour |
| Paper dominant (~65%) | Make Cream or Red the dominant background |
| Body copy in Noir | Use Ink Red for body text |
| Gradient on italic display & key surfaces | Gradient on body copy or extended reading |
| Hairlines at 1px | Thick borders or drop shadows |
| All captions/kickers in JetBrains Mono | Mix mono font into headlines |
| Section numbers `/ 01` format | Unnumbered sections |
| Kanit for wordmark + accent phrases only | Kanit for full headlines or body copy |
| Evidence and specificity | Superlatives ("revolutionary", "transformational") |
| Real assets or styled placeholders | Broken `<img>` tags |
| Gradient paired with Paper or Cream | Gradient paired with another saturated colour |
| CTA buttons 4–6px border-radius max | Pill-shaped or heavy-bordered buttons |
