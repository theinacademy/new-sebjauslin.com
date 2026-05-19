# Project: Redesign sebjauslin.com — Apply New Brand Identity

## Context
Seb Jauslin is a PCC Certified Leadership Coach based in Zürich, Switzerland. He coaches senior executives and facilitates corporate workshops across Zürich, Geneva, London, Málaga and Dubai. His current website (sebjauslin.com) is WordPress-based with a generic dark coaching site look. We're rebuilding it as a clean static site that matches his new brand identity system.

The brand guide HTML file (`Seb_Jauslin_Brand_Guide.html`) is attached to this project. Read it thoroughly before writing any code — it is the single source of truth for every visual decision.

## Step 0 — Read the brand guide
Open and parse `Seb_Jauslin_Brand_Guide.html`. Extract and document in a `BRAND.md` file:
- The 4-colour palette: Ink Red `#FF5757`, Paper `#FFFFFF`, Deep Red `#C21A1A`, Cream `#FAF0E2`
- The signature gradient: `linear-gradient(135deg, #FF5757, #C21A1A)` — this is the brand's most recognizable visual element. See gradient rules in Step 2.
- Typography: Montserrat is the PRIMARY typeface (headlines, body, UI). Kanit is SECONDARY (italic accent moments, the wordmark, signature gradient text only). JetBrains Mono for captions/eyebrows.
- Page proportion rule: Paper 65%, Cream 20%, Ink/Gradient 12%, Deep Red 3%
- Layout principles: 12-column grid, asymmetric (never centered), 1px hairlines, numbered sections, monospace captions in margins, generous whitespace
- Voice rules: Direct, warm, considered. No corporate jargon, no self-help tone, no exclamation marks in headlines. Evidence over slogans.
- The "Always / Never" rules from section 13

## Step 1 — Scrape, rewrite and shorten the content
Fetch `https://sebjauslin.com` and extract all content. Then fetch `https://bedohaveleadership.com` as a **reference for tone and length** — that site is a recent landing page we built for Seb and represents the target: short, punchy, B2B-focused, no fluff.

### What to extract from sebjauslin.com:
- Hero headline and subheadline
- Pain point sections (6 blocks)
- Leadership gap statistics
- Flagship program details (Be · Do · Have structure)
- Corporate workshop list (5 workshops)
- Bio / About section
- Testimonials (all names, titles, quotes)
- Forbes feature reference
- Credentials and "as seen on" logos
- CTAs: Calendly link (`https://calendly.com/sebjauslin/intro`), Quiz link (`https://tally.so/r/44N90A`)

### Content rewrite rules (CRITICAL):
The current site reads B2C — it speaks to individual leaders about their personal struggles. The new site must read **B2B** — it speaks to **organisations, HR directors, L&D teams, and C-suite decision makers** who are buying coaching and workshops for their people.

**Shift the voice from:**
- "When you feel exhausted..." → "When your leaders are burning out..."
- "Transform your leadership" → "Develop leadership capability across your organisation"
- Individual pain ("I feel unheard") → Organisational pain ("Your teams are disengaged, turnover is rising")
- Personal growth framing → Business outcome framing (retention, performance, culture, ROI)

**Make it shorter.** The current site is too long. Follow the bedohaveleadership.com model:
- Cut the 6 pain point blocks to 3 max — consolidate the strongest ones
- Shorten the bio by 50% — keep credentials, cut the personal journey narrative
- Trim testimonials to the 3 strongest (pick ones from corporate contexts: Estée Lauder, UN, Google)
- Remove redundant sections — if two sections say similar things, merge them
- Every section should earn its place. If it doesn't drive a B2B buyer to book a call, cut it.

**Keep unchanged:**
- The Be · Do · Have program structure and pricing tiers (BE: 3mo, DO: 6mo, HAVE: 12mo)
- Workshop names and descriptions
- All credential references (Forbes, ICF, PCC, CPCC)
- Calendly and Tally links

## Step 2 — Build the site
Tech stack: plain HTML + CSS + vanilla JS. One `index.html`, one `styles.css`, one `main.js`. No frameworks, no build tools. The site must be deployable as a static file.

### Design system (from brand guide)
```css
:root {
  --ink-red: #FF5757;
  --deep-red: #C21A1A;
  --paper: #FFFFFF;
  --cream: #FAF0E2;
  --noir: #14110F;
  --gradient: linear-gradient(135deg, #FF5757, #C21A1A);
  
  --font-primary: 'Montserrat', sans-serif;   /* Headlines, body, UI — the workhorse */
  --font-accent: 'Kanit', sans-serif;          /* Italic accent moments, wordmark, gradient text */
  --font-mono: 'JetBrains Mono', monospace;    /* Captions, kickers, eyebrows */
  
  --display-tracking: -0.03em;
  --body-tracking: 0;
  --mono-tracking: 0.14em;
  
  --hairline: 1px solid rgba(20, 17, 15, 0.12);
  --section-gap: 180px;
}
```

### Typography hierarchy (IMPORTANT)
- **Montserrat** is the primary font for everything: headlines, subheads, body copy, buttons, navigation
- **Kanit** is used ONLY for accent/signature moments: the wordmark "Seb Jauslin.", italic gradient text on hero or key statements, and pull quotes. Always in Light 300 or Italic ExtraLight 200. NEVER in Regular or Bold.
- **JetBrains Mono** for section kickers (`/ 01`, `/ 02`), eyebrow labels, captions, timestamps, and credential lists

### Gradient system (CRITICAL — this is the brand's signature)
The gradient `linear-gradient(135deg, #FF5757, #C21A1A)` is the most distinctive visual element. Use it intentionally:

**Where to apply the gradient:**
- The wordmark dot (the period in "Seb Jauslin.")
- Hero headline — apply as `background-clip: text` on one key italic Kanit word or phrase (e.g. "clarity, courage, results" in italic Kanit with gradient)
- Section divider accents (thin gradient lines between major sections)
- CTA button hover states (gradient background)
- The monogram "SJ" avatar
- Pull quote attribution marks or decorative elements
- Footer colophon / closing statement
- Key stat numbers (e.g. the "77%" leadership gap stat)

**How to implement gradient text:**
```css
.gradient-text {
  background: linear-gradient(135deg, #FF5757, #C21A1A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Where NOT to use the gradient:**
- Body copy or extended reading
- Navigation items
- Small captions or mono text
- Paired with any other saturated colour
- As a full background fill on large areas (use sparingly on cards or accent bands)

### Layout rules
- 12-column grid with generous gutters (desktop: ~1200px max-width)
- Asymmetric compositions — headlines off-center, not centered
- Section numbering: `/ 01`, `/ 02` etc. in JetBrains Mono as kickers above section titles
- 1px hairline dividers between sections — never thick borders
- Whitespace is the loudest element on the page
- Body copy in `--noir`, NEVER in Ink Red
- Gradient applied ONLY to italic display words and key surfaces (headlines, the wordmark dot, hero moments)
- Mobile responsive with the same aesthetic principles

### Page structure (shorter, B2B-focused)
Map the rewritten content to the brand system. Fewer sections, tighter flow:

```
/ 00 — Navigation (wordmark left: "Seb Jauslin." with gradient dot, minimal nav right)
/ 01 — Hero (large Montserrat headline, one key phrase in Kanit italic with gradient, CTA)
/ 02 — The Problem (3 consolidated pain points — organisational framing, cream background)
/ 03 — The Solution (Be · Do · Have program overview, clean editorial grid)
/ 04 — Corporate Workshops (list with mono kickers, short descriptions)
/ 05 — About Seb (short bio, credentials in mono captions, headshot)
/ 06 — Social Proof (Forbes callout + 3 best testimonials on cream cards + credential logos)
/ 07 — CTA (Book a call, gradient accent, Calendly link)
/ 08 — Footer (wordmark, contact, city list: ZRH · GVA · LON · AGP · DXB, copyright in mono)
```

### Specific brand rules to enforce
- The wordmark is "Seb Jauslin." — the period is always Deep Red `#C21A1A`, set in Kanit Italic with gradient
- Headlines: Montserrat Light 300 or Medium 500. Display accent words: Kanit Italic ExtraLight 200 with gradient.
- NEVER use Kanit for full headlines or body copy — only for accent words/phrases within Montserrat headlines
- Body: Montserrat 400 at 16px/1.6. Larger body (intros): 18px/1.6.
- Eyebrow/kicker text: JetBrains Mono 500 at 11-14px with tracking +0.14em, uppercase
- CTA buttons: clean, not heavy. Ink Red background with Paper text, or outlined. Rounded corners minimal (4-6px max).
- No stock photography placeholders — use solid color blocks or the gradient for image placeholder areas
- No shadows, no thick borders, no rounded cards with heavy borders. The aesthetic is editorial Swiss, not SaaS.
- Navigation: minimal, sticky, with a slight cream/paper backdrop on scroll

### Interactions
- Smooth scroll between sections
- Subtle fade-in on scroll for content blocks (IntersectionObserver, CSS transitions — no heavy animation libraries)
- Navigation highlight for current section
- Mobile hamburger menu if needed, matching the brand aesthetic

### Typography imports
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Kanit:ital,wght@0,300;0,400;0,500;1,200;1,300&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
```

## Step 3 — Quality check
Before finishing, verify against the brand guide "Always / Never" rules:
- ✓ Only 4 colours + gradient used
- ✓ Paper is dominant (~65% of page area)
- ✓ Body copy in Noir, never in Ink Red
- ✓ Gradient only on italic display words and key surfaces
- ✓ Hairlines at 1px
- ✓ Sections numbered
- ✓ Captions in monospace
- ✓ No exclamation marks in headlines
- ✓ No superlatives ("revolutionary", "transformational")
- ✓ No fifth colour introduced
- ✓ No gradient on body copy or extended reading
- ✗ No stock photography or staged corporate imagery
- ✗ No gradient paired with another saturated hue

## Step 4 — Output
- `index.html` — the full page
- `styles.css` — all styles
- `main.js` — interactions
- `BRAND.md` — extracted brand tokens for future reference
- Use real assets from the `assets/` folder wherever possible (see below). For any missing images, use solid color blocks or gradient fills as placeholders — never broken `<img>` tags.

## Assets folder
An `assets/` folder is included in this project with the logo files, headshots, and key photos. Before building, scan `assets/` and inventory everything available:
- Logo files (SVG/PNG) — use these for the wordmark and monogram, do NOT recreate the logo in CSS/HTML
- Seb's headshot(s) — use in the About section
- Workshop/event photos — use in relevant sections
- Client headshots — use in testimonials if available
- Credential logos (Forbes, ICF, etc.) — use in the press/credentials section
- Any other brand assets (icons, patterns, etc.)

Reference all assets with relative paths (`./assets/filename.ext`). If an expected image isn't in the folder, fall back to a styled placeholder block with a mono caption noting what should go there (e.g. `[ Workshop photo — Zürich ]`).

## Important notes
- This is a STATIC site rebuild — not WordPress. The client will deploy this separately.
- Preserve all existing CTAs: Calendly booking link and Tally quiz link.
- The site should feel like the brand guide came to life as a website. Same editorial Swiss precision, same restraint, same quiet confidence.
- When in doubt, refer back to the brand guide. It wins every argument.
