# Coast2Coast — DESIGN_SPEC v1 ("DATUM")

**Status: BINDING.** This spec is the single source of truth for the visual-elevation
pass. It sits alongside `docs/ARCHITECTURE.md` (the engineering contract). Where the
two conflict, see §10 — exactly two clauses of ARCHITECTURE.md are amended; every
other clause of that contract (island whitelist, copy freeze, section order, anchor
ids, a11y floors, perf rules) remains fully in force and is restated in §9 here.

---

## 1. Verdict on the three proposals

| Direction | Brand fit | Risk | Decision |
|---|---|---|---|
| **DATUM** (editorial architectural, Archivo expanded) | The strongest concept-to-brand mapping: a roofing company that sells *measurement, precision and trust* gets a site that reads as a numbered set of architectural drawings. Archivo shares Inter's grotesque skeleton, so display/body never clash. | All pure CSS + aria-hidden server markup; font verified in this repo's `font-data.json`. Main risk is over-application. | **SPINE. Adopted, with cuts (§1.1).** |
| **GOLDSMITH** (Fraunces, foil, grain) | Tasteful, but the serif/foil/grain language reads boutique-heritage (watch brand), not trade-craft. Highest fragility per unit of payoff (blend modes over photos, gradient borders that can't transition, clip-text fallbacks). | Medium-high execution risk for subtle returns. | **Rejected as spine. Two grafts taken (§1.2).** |
| **HEAVY GAUGE** (Big Shoulders, industrial) | Energetic but motif-inflated (grids + stamps + brackets + diamonds + press shadows). Condensed-caps + hard offset shadows skew brutalist/streetwear — louder, not more expensive. Weak lowercase legibility at small sizes. | Medium risk, but cohesion is the casualty. | **Rejected as spine. Two grafts taken (§1.2).** |

### 1.1 Cuts from DATUM (restraint is the design)
- **CUT** the per-section ghost label echoes behind every title. Ghost type is limited to **four monuments**: the hero ticker, the Process numerals, the Areas "WA", the Footer wordmark. Nothing else gets outline type except the small Testimonials quote glyph.
- **CUT** the hero vertical "COAST2COAST" ghost (redundant with the ticker below it and the footer monument).
- **CUT** the Services in-photo plan numerals (a fourth numbering system; the section indexes + Process numerals + FAQ counters are enough).

### 1.2 Grafts
- From HEAVY GAUGE: `animation-play-state: paused` on ticker hover; `font-variant-numeric: tabular-nums` on every numeral surface (stats, indexes, FAQ counters, © year).
- From GOLDSMITH: engraved form-field depth (inset shadow — inputs sink, buttons rise), and its discipline rule: **hover intensity rides transform/opacity only; backgrounds/borders never animate beyond simple color transitions that already exist.**

---

## 2. The concept — "DATUM: the drawing set"

Every measurement on a construction drawing references a datum line. The page becomes
a precision document: monumental expanded-grotesque caps over Inter body text, 1px
gold **dimension lines with square endcaps** replacing soft gradient rules, indexed
section title blocks (02–09), a drafted radius discipline (cards sharpen to 2–4px;
only human touchpoints stay round), and exactly four aria-hidden outline-type ghosts.
The hero closes on a server-rendered marquee of the three service names in outlined
expanded caps — the page's only perpetual motion.

No grain, no foil, no blueprint grids. Drafting sheets are clean; the texture budget
is spent entirely on ruled lines and type.

---

## 3. Display font (the ONLY new font)

**Archivo, variable, with the `wdth` axis.** Verified in
`node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` for
next@14.2.35: axes `wdth 62–125` + `wght 100–900`, latin, one woff2.

`app/layout.js`:

```js
import { Inter, Archivo } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],   // 800 dropped — display takes all headings
  display: "swap",
  variable: "--font-inter",
});

// Variable mode: `weight` is OMITTED so `axes` is legal.
// (If the loader ever complains, add weight: "variable" — do NOT fall back to
// static weights without flagging it: wdth=125 IS the identity.)
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-display",
});
```

`<html className={`${inter.variable} ${archivo.variable}`}>`.

**Usage rules (binding):**
- Display face appears ONLY at: weight 700, `text-transform: uppercase`, and
  `font-stretch` 118% (H2/card titles) or 125% (H1, numerals, ghosts, wordmarks, ticker).
- Use `font-stretch`, never `font-variation-settings` (which would zero the wght axis).
- Nothing below 11px is ever set in Archivo. Body copy, FAQ questions, testimonial
  quotes, form fields, nav links stay **Inter**.
- After implementation: `grep -rn "font-weight: 800" components app` must return zero
  hits (every 800 migrates to `var(--font-display)` 700 or Inter 700 — see component rows).

---

## 4. Global tokens + shared utilities — `app/globals.css`

**Owner: foundations (one engineer). Nobody else touches globals.css or layout.js.**

Add to `:root` (existing tokens stay byte-identical):

```css
  /* ── DATUM additions ── */
  --font-display: var(--font-display);            /* injected by next/font (html class) */
  --rule: color-mix(in srgb, var(--gold-dark) 30%, transparent); /* dimension-line stroke */
  --ghost-stroke: rgba(251, 191, 36, 0.16);       /* default ghost outline (overridable) */
  --radius-draft: 4px;                            /* cards / items / figure / inputs */
  --radius-crisp: 2px;                            /* buttons / chips / tags / pills-no-more */
```

Add two global utilities (used by aria-hidden decorative elements only):

```css
/* ── Dimension line: 1px rule + 5×5 gold square endcaps ──
   Apply to dedicated aria-hidden spans/divs. Modules MAY replicate these exact
   values on their own pseudo-elements where a span is impractical — values are
   frozen: 1px stroke var(--rule) or var(--gold-dark), 5×5px var(--gold) endcaps
   offset top:-2px. One drawing convention, everywhere. */
.dimline {
  position: relative;
  display: block;
  height: 1px;
  background: var(--gold-dark);
}
.dimline::before,
.dimline::after {
  content: "";
  position: absolute;
  top: -2px;
  width: 5px;
  height: 5px;
  background: var(--gold);
}
.dimline::before { left: 0; }
.dimline::after { right: 0; }

/* ── Ghost outline type (decorative ONLY — always aria-hidden) ── */
.ghost {
  pointer-events: none;
  user-select: none;
  font-family: var(--font-display);
  font-stretch: 125%;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  color: rgba(251, 191, 36, 0.12); /* engines without text-stroke */
}
@supports (-webkit-text-stroke: 1px #000) {
  .ghost {
    color: transparent;
    -webkit-text-stroke: 1px var(--ghost-stroke);
  }
}
```

Modules tune ghost intensity by overriding the custom property on their own class
(e.g. `.num { --ghost-stroke: rgba(251,191,36,.30); }`) — never by new colors.

The reduced-motion kill-switch, `.reveal`, `.cv-section`, focus ring, skip link:
**unchanged.**

---

## 5. Type system

| Role | Spec |
|---|---|
| H1 (hero) | `var(--font-display)`, 700, uppercase, `font-stretch:125%`, `clamp(46px, 9.5vw, 120px)`, line-height .92, letter-spacing -0.01em. Below 480px: `font-stretch:110%` (variable width IS the responsive mechanism — never wrap or shrink below the clamp floor instead). |
| H2 (SectionHeader `.title`) | `var(--font-display)`, 700, uppercase, `font-stretch:118%`, `clamp(32px, 5vw, 56px)`, line-height .98, letter-spacing 0 (replaces Inter 800 / -2px). |
| Card/step titles (h3) | `var(--font-display)`, 700, uppercase, `font-stretch:118%`, 15px, letter-spacing .5px. |
| Numerals (stats, indexes, ghosts, counters) | `var(--font-display)`, 700, `font-stretch:125%`, `font-variant-numeric: tabular-nums`. |
| Labels / micro-caps | Inter 600–700, 10–12px, uppercase, letter-spacing 1.5–3.5px. |
| Body, sub copy, quotes, FAQ Q&A, forms, nav links | **Inter, unchanged sizes, unchanged colors.** |

---

## 6. Shared component recipes

### 6.1 SectionHeader — the page-wide lever
**Files: `components/ui/SectionHeader.jsx`, `components/ui/ui.module.css` (foundations owner).**

Becomes a drawing **title block**. New optional prop `index` (string, e.g. `"02"`).

Markup (server, no new client JS):

```jsx
<div className={cls}>
  <div className={styles.meta}>
    <p className={styles.label}>{label}</p>            {/* real copy — unchanged string */}
    {index && <span className={styles.index} aria-hidden="true">{index}</span>}
  </div>
  <h2 className={styles.title}>{title}</h2>
  {sub != null && <p className={styles.sub}>{sub}</p>}
</div>
```

CSS (replaces `.line` — the gradient line is retired here):
- `.meta`: `display:flex; justify-content:space-between; align-items:baseline; border-top:1px solid var(--rule); padding-top:14px; position:relative;` plus a 5×5px `var(--gold)` square endcap via `::before` at `top:-3px; left:0` (frozen dimension-line values, §4).
- `.label`: stays gold (`--gold` dark / `--gold-deep` light — current colors), 11px, 700, letter-spacing 3.5px, uppercase.
- `.index`: `font-family:var(--font-display); font-stretch:125%; font-weight:700; font-size:12px; font-variant-numeric:tabular-nums; color:var(--text-dim);` light variant `color:var(--text-faint)`. Decorative, aria-hidden, contrast-exempt.
- `.title`: per §5 H2 row. Colors unchanged (`--text-white` / `--text-dark`).
- `.sub`: colors/size unchanged (`--text-muted` / `--text-dark-muted` — the AA floor); add `border-left:2px solid var(--gold-dark); padding-left:16px;` (hanging citation). Centered variant: no left border (`border-left:0; padding-left:0`).
- `.center`: meta row stays full-width flex (label left, index right); title + sub centered beneath. This asymmetric-rule/centered-title pairing is intentional.

**Index assignments (page order, hero is the cover, footer the colophon):**
Services `02` · Process `03` · BeforeAfter `04` · BookInspection `05` ·
Testimonials `06` · FAQ `07` · Areas `08` · Contact `09`.
TrustBadges has no SectionHeader — it is the unnumbered "schedule" strip by design.
Each section owner adds the one-line `index` prop in their own JSX (no collisions).

### 6.2 Radius discipline
- `--radius-draft` (4px): service cards, testimonial cards, FAQ items, trust ledger frame, BeforeAfter figure (+ its `:focus-visible` override), form card, inputs, success panel.
- `--radius-crisp` (2px): all CTAs/buttons (hero pair, nav `.cta`, `.mobCta`, form `.submit`), brand marks (`.brandMark`, `.logoBox`, `.mark`), Services `.chip`, area tags, BeforeAfter pills + grip, Contact `.rowIcon`, FAQ `.summary:focus-visible`.
- **Round survivors (human touchpoints — do not square):** Testimonials `.avatar`, FloatingCTA `.bubble` + its panel, range-slider thumbs, success-panel icon circle.

### 6.3 Buttons (one treatment, three sites)
Primary gold CTA (`Hero .ctaPrimary`, `forms .submit`, `Navbar .mobCta`):
`border-radius: var(--radius-crisp)`; keep existing colors, hover lift and shadows
exactly as-is (already transform/opacity-friendly). Ghost CTA (`Hero .ctaGhost`):
radius 2px, `border-color: rgba(255,255,255,.18)`, hover unchanged. Nav `.cta`:
radius 2px, behavior unchanged.

---

## 7. Per-component treatment table

> Each row lists every file it may touch. **No file appears in two rows except
> `components/islands/forms.module.css` (rows 9 and 13 — single owner required: the
> forms/footer engineer owns it).** Island JSX files are never touched.

| # | Component | Files touched | Treatment |
|---|---|---|---|
| 0 | Foundations | `app/globals.css`, `app/layout.js` | §3 font import + Inter trim; §4 tokens + `.dimline` / `.ghost` utilities. Nothing else. |
| 1 | SectionHeader | `components/ui/SectionHeader.jsx`, `components/ui/ui.module.css` | §6.1 title block. |
| 2 | Navbar + ScrollProgress | `components/Navbar.module.css` (CSS only — `Navbar.jsx` untouched) | `.brandName`: `var(--font-display)` stretch 125% 700, 14px, letter-spacing 1px (expanded width replaces the 2.5px tracking). `.brandMark` radius → 2px. `.link`: uppercase, 12px, 600, letter-spacing 1.5px; add `position:relative` + `::after { left:0; right:0; bottom:-6px; height:1px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform .3s var(--ease); }` → `scaleX(1)` on `:hover/:focus-visible`. `.cta`/`.mobCta` per §6.3. `.scrolled`, mobile menu, `.progress` bar: **unchanged** (the gold bar at top:0 already IS the datum line). |
| 3 | Hero | `components/Hero.jsx`, `components/Hero.module.css` | (a) `.title` per §5 H1 (copy untouched; `aria-label` already set; letter-stagger spans/keyframes/delays untouched). `.letterGold` stays flat `var(--gold)`. (b) Kicker `.line` → dimension line (1px `var(--gold-dark)` + two 5×5 endcaps via `::before/::after`; frozen values §4). `.label` unchanged otherwise. (c) `.sub`: add the hanging 2px gold-dark left rule + 16px padding (system match with SectionHeader). (d) CTAs per §6.3. (e) Stats → surveyor's title block: `.stats { border-top:1px solid var(--rule); padding-top:28px; }`; each stat after the first: `border-left:1px solid var(--rule); padding-left:clamp(20px,3vw,32px);` `.statValue`: display 125% 700 `clamp(30px,4vw,46px)` tabular-nums, **gold (large/bold — existing approved usage)**; `.statLabel`: uppercase 10px ls 2px `var(--text-light)`. (f) New aria-hidden `.rail` div inside `.inner`: vertical ruler at `left:-36px; top:8px; bottom:8px; width:9px;` — 1px `var(--rule)` spine + `repeating-linear-gradient(to bottom, transparent 0 21px, var(--rule) 21px 22px)` ticks; `display:none` below 1024px. (g) `padding-bottom` → ~170px to clear the ticker. `.baseline` div is **replaced by the ticker** (remove it). |
| 4 | Hero ticker — THE signature | same files as row 3 (same owner) | Server-rendered aria-hidden marquee pinned inside `#hero` at its bottom edge (section order untouched): `<div className={styles.ticker} aria-hidden="true"><div className={styles.tickerRun}>…</div></div>`. The run = the three EXISTING `services[].title` strings verbatim ("Roof Repairs" / "Roof Cleaning" / "Roof Restoration"), each followed by a CSS-drawn 6×6px gold square separator (`span::after`, no text node) — **the whole run duplicated exactly 2×**. CSS: `.ticker { position:absolute; left:0; right:0; bottom:0; overflow:hidden; border-top:1px solid var(--rule); }` `.tickerRun { display:flex; align-items:center; gap:48px; width:max-content; padding:16px 0; animation:marquee 36s linear infinite; }` `.ticker:hover .tickerRun { animation-play-state:paused; }` spans: `.ghost` recipe with `--ghost-stroke: rgba(251,191,36,.30)`, `clamp(24px,3.2vw,40px)`. `@keyframes marquee { to { transform: translateX(-50%); } }` — transform-only; seamless because the run is an exact 2× duplicate; the global reduced-motion kill-switch (duration .001ms, 1 iteration) lands on −50%, visually identical to frame 0. Hero is exempt from `cv-section`, so no containment issues. |
| 5 | Services | `components/Services.jsx` (index prop only), `components/Services.module.css` | `index="02"`. Stepped rooflines ≥1024px: `.grid { grid-template-columns:repeat(3,1fr); }` with `.cell:nth-child(2) { margin-top:32px; }` `.cell:nth-child(3) { margin-top:64px; }`; below 1024px reset margins, back to current auto-fit. `.card` radius → `var(--radius-draft)`; image height 150 → 200px (`style={{height:200}}` on SmartImage — its documented API). `.chip` radius → 2px. `.title` per §5 h3, preceded by a 28px-wide mini dimension rule (1px `var(--gold-dark)` + one 5×5 endcap, `::before` on the title, frozen values). Features → spec sheet: `.features { gap:0; }` `.feature { padding:9px 0; border-top:1px solid var(--border-light); }` — check icon stays `--gold-deep`, text stays 12px/500 `--text-dark-muted` (AA on white). Hover: keep lift/shadow; add `::after` 2px gold top seam `scaleX(0)→scaleX(1)` from left (transform-only). |
| 6 | TrustBadges | `components/TrustBadges.module.css` (CSS only) | Certification **ledger** — kill the six floating cards: `.grid { gap:0; border:1px solid var(--border); background:var(--dark-card); }` `.cell { box-shadow:-1px 0 0 var(--border), 0 -1px 0 var(--border); }` (hairline trick — internal rules collapse correctly at every auto-fit wrap). `.badge { border:0; border-radius:0; background:transparent; text-align:left; padding:22px 24px; }` Icon 24 → 18px, inline on the title row; `.title`: 12px 700 uppercase ls 1px `--text-white`. `.desc` **unchanged** (11px `--text-muted` — the audit floor). Hover: `transform:none; background:var(--gold-muted);`. Top seam + 60px padding stay. QA: check hairline doubling against the frame at 640/768/1024 and orphan rows. |
| 7 | Process | `components/Process.jsx` (index prop only), `components/Process.module.css` | `index="03"`. `.num` → the page's biggest ghosts: apply the `.ghost` recipe values in-module with `--ghost-stroke: rgba(251,191,36,.30)`, `font-size:clamp(72px,9vw,112px); line-height:.85; margin-bottom:18px;` (numerals "01–04" are existing config copy; remove the old `opacity:.2` solid styling). Replace dot connectors with a true dimension line: `.grid::before { content:""; position:absolute; top:0; left:0; right:0; height:1px; background:var(--rule); }`; `.step { padding-top:40px; }`; each step gets a 6×6px gold square tick (`::before`, `top:-3px; left:0;` — replaces the 14px circle); `.grid::after` places the closing 6×6 endcap top-right. Keep the vertical `border-left: var(--border)` hairlines between steps. `.title` per §5 h3, icon 18px gold inline before it. `.desc` untouched (`--text-muted` AA). |
| 8 | BeforeAfter | `components/BeforeAfter.jsx` (index prop + one aria-hidden div), `components/BeforeAfter.module.css` — **slider island JSX untouched** | `index="04"`. `.figure` radius → `var(--radius-draft)` (incl. the `:focus-visible` override). New aria-hidden ruler strip div directly under `<BeforeAfterSlider/>` in the shell: `height:10px; margin-top:8px; background: repeating-linear-gradient(to right, var(--border-light) 0 1px, transparent 1px 24px) bottom / 100% 6px no-repeat, repeating-linear-gradient(to right, var(--rule) 0 1px, transparent 1px 120px);` — minor ticks every 24px, gold majors every 120px: the slider becomes a measuring instrument. Pills: radius 2px, uppercase, 11px, ls 1px (colors unchanged). `.grip`: 44×44 square, radius 2px, gold, chevrons kept. |
| 9 | BookInspection + shared form fields | `components/BookInspection.jsx` (index prop only), `components/BookInspection.module.css`, `components/islands/forms.module.css` (CSS only — island JSX untouched) | `index="05"`. In forms.module.css: `.card`/`.cardWide` radius → `var(--radius-draft)` + a drafted top seam: `::before { content:""; position:absolute; top:0; left:24px; right:24px; height:1px; background:var(--gold-dark); }` with a centered 5×5 gold endcap via `::after`. Inputs (`.input`): radius → `var(--radius-draft)`, **engraved depth** (GOLDSMITH graft): `box-shadow: inset 0 1px 3px rgba(0,0,0,.35);` focus behavior unchanged (border + global ring). `.floatLabel`: uppercase, ls 1.5px, colors unchanged (AA floor). `.submit` per §6.3. `.successTitle`: Inter 700 (was 800), letter-spacing -0.5px; success icon circle stays round. Alert/success colors untouched. |
| 10 | Testimonials | `components/Testimonials.jsx` (index prop only), `components/Testimonials.module.css` | `index="06"`. Grid: explicit `repeat(3,1fr)` ≥1024px / `repeat(2,1fr)` ≥640px / `1fr` below; `.grid > :first-child { grid-column: span 2; }` on desktop with its quote at 15px — pull-quote lead, editorially ragged second row. Cards radius → `var(--radius-draft)`. Outlined quote glyph: `.quote::before { content:"\201C" / ""; font-family:var(--font-display); font-stretch:125%; font-weight:700; font-size:56px; line-height:0; display:block; margin:24px 0 6px; }` + ghost-stroke recipe at `rgba(251,191,36,.35)` (the `/ ""` alt keeps SRs silent). Stars, round avatar, all text colors: **exactly as audited.** |
| 11 | FAQ | `components/FAQ.jsx` (index prop only), `components/FAQ.module.css` | `index="07"`. Items radius → `var(--radius-draft)` (and `.summary:focus-visible` radius → 2px). CSS-counter indexes: `.list { counter-reset:faq; }` `.summary::before { counter-increment:faq; content:counter(faq, decimal-leading-zero) / ""; font-family:var(--font-display); font-stretch:125%; font-weight:700; font-size:13px; font-variant-numeric:tabular-nums; color:var(--gold-deep); min-width:32px; flex-shrink:0; }`. `[open]` additionally gets `border-left:2px solid var(--gold-dark);`. Questions stay Inter 15px/600 (real copy must scan — no caps). Chevron + answer animation unchanged. |
| 12 | Areas | `components/Areas.jsx` (index prop + one aria-hidden div), `components/Areas.module.css` | `index="08"`. The statement moment: aria-hidden ghost `WA` (existing string — `business.address.state`) behind the pill cloud: a `.ghost`-class div, `position:absolute; inset:0; display:grid; place-items:center; font-size:clamp(180px,28vw,340px); --ghost-stroke: rgba(251,191,36,.10); z-index:0;` with `.pills { position:relative; z-index:1; }` (section already `position:relative`; add `overflow:hidden`). Pills → surveyor's tags: radius 2px, uppercase, 11px, 600, ls 1.5px, padding 10px 18px; hover colors unchanged. `.more` untouched. |
| 13 | Contact | `components/Contact.jsx` (index prop only), `components/Contact.module.css` (+ shares row 9's forms.module.css — same owner) | `index="09"`. Editorial asymmetry: `.grid { grid-template-columns: 5fr 7fr; }` ≥900px (info rail narrow, form dominant); `1fr` below — replaces symmetric auto-fit. `.rowIcon` radius → 2px. `.rowLabel` stays `--text-faint` 10px (documented AA decision — do not regress). A 56px dimension rule with one endcap sits above the form column (`::before` on the form wrapper). Quote form styling arrives via row 9's shared forms.module.css changes. |
| 14 | Footer | `components/Footer.jsx` (one aria-hidden div), `components/Footer.module.css` | The colophon. Above `.grid`: `<div className={styles.giant} aria-hidden="true">COAST2COAST</div>` (existing wordmark string) — `.ghost` recipe, `text-align:center; font-size:clamp(40px,9vw,118px); --ghost-stroke: rgba(251,191,36,.12); margin-bottom:48px;` with `.footer { overflow:hidden; }`. `.wordmark` → display 125% 700, letter-spacing 0. `.colTitle` weight 700. `.link` hover gains the nav's scaleX gold underline (`::after` partial, row 2 values). `.bottom`: keep border-top, add 4×4px gold square endcaps via `::before/::after` at the rule's ends; `font-variant-numeric: tabular-nums` on the © line. Link/contact text colors unchanged. |
| 15 | LoadingScreen | `components/LoadingScreen.module.css` (CSS only) | `.brandName` → display 125% 700 caps, letter-spacing 0. Everything else (≤700ms self-clear, sessionStorage skip, reduced-motion hide, progress strip) **untouched**. |
| 16 | FloatingCTA | — | **NO CHANGE.** The one deliberate round survivor (thumb target, human touchpoint). |
| 17 | Error surfaces | `app/error.js`, `app/not-found.js` (foundations owner) | Headings adopt display caps (stretch 118%, 700); status code/accent may use the ghost recipe; buttons per §6.3. Server/client status unchanged, no dependencies beyond React. |

---

## 8. Signature details (what makes it read "studio")

1. **The dimension-line system** — every gold rule is a CAD dimension line: 1px stroke, 5×5px square endcaps, frozen values, reused across kicker, section meta rules, card titles, process timeline, form seams, footer corners. One drawing convention, everywhere.
2. **Four ghost monuments from one recipe** (`.ghost`: transparent fill + 1px gold text-stroke + @supports fallback): the hero ticker, the 112px Process numerals, the giant WA, the footer COAST2COAST. Zero images, zero JS, all aria-hidden.
3. **The hero-base marquee** of the three service names in outlined expanded caps — the page's only perpetual motion; server-rendered, exact 2× run translating −50%, pauses on hover, frozen cleanly by reduced motion.
4. **The numbered drawing set** — index numerals 02–09 in every title block + decimal-leading-zero counters on FAQ questions, all tabular-nums, all silent to screen readers.
5. **Radius as worldview** — everything drafted sharpens to 2–4px; everything human (avatars, the floating phone bubble) stays round.
6. **The surveyor's title block** — hero stats as hairline-ruled columns: 46px expanded gold tabular numerals over 10px tracked caps, ~5:1 scale contrast in one component.

---

## 9. DO-NOTs (constraint reminders — violating any fails the task)

- **DO NOT** add, reword, or remove any client-facing string. Uppercase is CSS `text-transform` only; the DOM keeps approved sentence case. Decorative repetition (ticker, WA, COAST2COAST) reuses existing `site.config` strings verbatim and is always `aria-hidden="true"` + `pointer-events:none` + `user-select:none`.
- **DO NOT** create any new `"use client"` file, island, or npm dependency. The §8 grep of ARCHITECTURE.md must still match only the whitelist. Island JSX files (`BeforeAfterSlider`, `QuoteForm`, `InspectionForm`, `CountUp`, `Reveal`) are not edited at all.
- **DO NOT** animate anything except `transform` and `opacity` (existing simple color transitions may remain). Every new animation must die under the global reduced-motion kill-switch — verify the ticker freezes to a complete frame.
- **DO NOT** touch the contrast floors: `--text-muted` / `--text-faint` / `--text-light` assignments on real copy stay **byte-identical** (TrustBadges `.desc`, Process `.desc`, SectionHeader `.sub`, Areas `.more`, Contact `.rowLabel`, form placeholders/notes). Ghosts/indexes/ticker are decorative and contrast-exempt — real copy must NEVER adopt ghost colors. Gold-on-dark text only at large/bold sizes already approved (hero stats, labels).
- **DO NOT** change section order, anchor ids, landmarks, heading hierarchy, `cv-section` placement, or the API/email/config files (`lib/site.config.js`, `lib/email.js`, `lib/theme.js`, `app/api/**` untouched).
- **DO NOT** add a second display font, grain textures, foil gradients, blueprint grids, press shadows, or stamp seals. They were judged and cut. One face, one line language.
- **DO NOT** use `font-variation-settings` for width, and do not silently fall back to static Archivo weights — if `axes:["wdth"]` fails on next 14.2.35, stop and escalate.
- **DO NOT** square the round survivors (§6.2).

---

## 10. Contract amendment + QA gate

**Amendment (integrator, one commit, BEFORE component work merges):** append to
`docs/ARCHITECTURE.md`:

> **v2.1 addendum (2026-06):** `docs/DESIGN_SPEC.md` supersedes exactly two clauses:
> §1.2's "Inter" (a display face, Archivo variable, is added per DESIGN_SPEC §3 —
> Inter remains the body face) and §3's pinned type scale / letter-spacing (new scale
> in DESIGN_SPEC §5). All other clauses unchanged and binding.

**QA gate (definition of done for this pass):**
1. `npm run build` green; `grep -r '"use client"'` matches only the whitelist; `grep -rn "font-weight: 800" components app` returns nothing.
2. Visual QA at 320 / 375 / 768 / 1440: H1 never wraps mid-word or overflows (check the 480px stretch step); footer monument and WA ghost clip cleanly (overflow hidden); ticker seam invisible (exact 2× run); TrustBadges hairlines don't double against the frame at any wrap.
3. Reduced-motion pass: ticker static and complete, stagger static, reveals visible, no new motion survives.
4. Keyboard pass: nav/footer underline appears on `:focus-visible`; FAQ summary ring at 2px radius; slider still drags + arrow-keys.
5. Throttled-network eyeball of the hero during font swap (next/font fallback metrics) — no jarring reflow at 120px sizes.
6. View-source: all copy present and unchanged; every decorative element `aria-hidden`.
