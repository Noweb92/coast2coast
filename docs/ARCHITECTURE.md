# Coast2Coast — Flagship Rebuild Contract (v2)

This document is **binding** for every engineer/agent working on the rebuild.
Read it fully before writing a single line. When in doubt, this file wins.

## 0. Mission

Rebuild the implementation of the Coast2Coast Roofing site to flagship quality:
server-first rendering, near-zero client JS for static content, CSS-driven
interactions, flawless a11y/SEO — **without changing the approved content,
brand or page structure**.

## 1. Non-negotiables

1. **Content is frozen.** All copy, data and ordering come from
   `lib/site.config.js` — render it EXACTLY. Never invent, reword, or add
   client-facing claims. (The client has already approved this copy.)
2. **Brand is frozen.** Dark `#1e1e24` + gold `#fbbf24`, Inter, premium and
   minimal. The rebuilt site must look like a refined version of the current
   one, not a different site.
3. **Structure is frozen.** Single page, sections in this order:
   Hero → Services → TrustBadges → Process → BeforeAfter → BookInspection →
   Testimonials → FAQ → Areas → Contact → Footer. In-page anchors keep their
   ids: `#hero #services #process #booking #faq #areas #contact`.
4. **API contract is frozen.** `/api/quote` and `/api/inspection` request and
   response shapes unchanged. `lib/email.js`, `app/api/**` are NOT touched.
5. **SEO: every word of copy must be present in the initial server-rendered
   HTML.** Nothing indexable behind `ssr:false` or client-only rendering.
6. `npm run build` must pass. No new dependencies without approval.

## 2. Architecture: RSC-first with client islands

- **Server Components by default.** `"use client"` is allowed ONLY in the
  island whitelist below. Everything else renders on the server.
- A client island may receive server-rendered `children` — use this pattern
  to keep content in RSC while the wrapper adds behaviour.

### Island whitelist (the ONLY files allowed to carry `"use client"`)

| File | Role |
|---|---|
| `components/islands/Reveal.jsx` | Scroll-reveal wrapper (IntersectionObserver). Props: `{ as = "div", delay = 0, className, children }`. Renders children (server-rendered) inside a wrapper with class `reveal` (+ inline `transitionDelay` when `delay`); adds class `is-revealed` when intersecting (once, threshold 0.12). MUST render children visible immediately when `prefers-reduced-motion`. |
| `components/islands/CountUp.jsx` | Hero stat counter. Props `{ end, suffix, duration = 2000 }`. Animates 0→end with rAF when scrolled into view; reduced-motion → renders final value statically. |
| `components/islands/BeforeAfterSlider.jsx` | The draggable before/after comparison figure (owns its two images, pointer + keyboard handling). |
| `components/islands/Tilt.jsx` | Pointer-tracked 3D tilt wrapper for cards (rAF, transform-only, server children pass through; disabled on touch + reduced-motion). |
| `components/islands/QuoteForm.jsx` | Contact form (state, fetch to `/api/quote`, honeypot, success/error UI). |
| `components/islands/InspectionForm.jsx` | Booking form (state, fetch to `/api/inspection`, honeypot, success/error UI). |
| `components/Navbar.jsx` | Fixed nav: scrolled style (rAF-throttled), mobile menu toggle. |
| `components/ScrollProgress.jsx` | Top scroll progress bar (rAF-throttled). |
| `components/FloatingCTA.jsx` | Floating phone/quote bubble (appears after 400px scroll). |
| `components/LoadingScreen.jsx` | Brand intro veil. NON-BLOCKING overlay: page content renders underneath from the first byte; veil fades out ≤700ms; skipped entirely on repeat visit (sessionStorage `c2c_intro_seen`) and on reduced-motion. It must NOT gate rendering of `<main>` — no `loaded` state in page.js. |
| `components/ui/SmartImage.jsx` | next/image wrapper with brand-colour fallback on error. Keep current props API: `{ image, style, imgStyle, overlay, overlayStrength, priority, sizes, children }`. |

### Server components (NO `"use client"`)

`app/page.js`, `app/layout.js`, `Hero`, `Services`, `TrustBadges`, `Process`,
`BeforeAfter` (shell; renders heading + `<BeforeAfterSlider/>`),
`BookInspection` (shell + `<InspectionForm/>`), `Testimonials`,
`FAQ`, `Areas`, `Contact` (shell + `<QuoteForm/>`), `Footer`,
`StructuredData`, `components/ui/Icon.jsx`, `components/ui/SectionHeader.jsx`.

- `FAQ` uses native `<details>/<summary>` — zero JS, accessible by default.
  Style the marker/chevron with CSS (`details[open] .chevron { rotate: 180deg }`).
- `app/page.js` is a plain server component assembling sections in order.

## 3. Styling: CSS Modules + design tokens

- **No inline style objects** except truly dynamic values (slider position,
  transition delays). Everything else lives in a co-located
  `<Component>.module.css`.
- **Tokens** are CSS custom properties defined once in `app/globals.css`
  `:root`, mirroring `lib/theme.js` (which stays, for og-image + email):

```css
:root {
  --dark:#1e1e24; --dark-deep:#161619; --dark-soft:#26262d; --dark-card:#2a2a32;
  --warm:#f5f2ed; --warm-light:#faf8f5; --warm-mid:#ede9e2; --white:#fff;
  --gold:#fbbf24; --gold-dark:#b8860b; --gold-deep:#92710a; --gold-light:#fde68a;
  --gold-muted:rgba(251,191,36,.08); --gold-border:rgba(251,191,36,.18);
  --text-white:#f5f5f4; --text-light:#d6d3d1; --text-muted:#a8a29e;
  --text-dim:#8c867f; --text-faint:#57534e; --text-dark:#292524; --text-dark-muted:#57534e;
  --border:#333338; --border-light:#e8e2d9;
  --success:#22c55e; --error:#f87171;
  --ease:cubic-bezier(.16,1,.3,1);
  --shadow-card:0 16px 40px rgba(30,30,36,.12); --shadow-float:0 12px 40px rgba(0,0,0,.4);
  --radius-sm:6px; --radius-md:8px; --radius-lg:12px; --radius-xl:16px; --radius-pill:100px;
  --max-w:1140px; --pad-x:28px; --section-y:110px;
}
```

- **Hover/focus are CSS-only** (`:hover`, `:focus-visible`). No
  onMouseEnter/onMouseLeave style mutation anywhere.
- **Type scale** via clamp, as today (h1 `clamp(44px,7vw,80px)`, h2
  `clamp(28px,4vw,46px)`, body 14–15px). Keep current letter-spacing rhythm.
- **Breakpoints:** 640 / 768 / 1024. Mobile-first inside modules.
- **Reveal classes** (defined in `globals.css`, used by `Reveal`):

```css
.reveal { opacity:0; transform:translateY(28px);
  transition:opacity .8s var(--ease), transform .8s var(--ease); }
.reveal.is-revealed { opacity:1; transform:none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity:1; transform:none; transition:none; } }
```

- **Offscreen rendering:** every below-the-fold `<section>` gets class
  `cv-section`:

```css
.cv-section { content-visibility:auto; contain-intrinsic-size:auto 800px; }
section[id] { scroll-margin-top: 90px; }
```

  NOT on `#hero`. Anchors must still scroll correctly (scroll-margin handles
  the fixed nav).

## 4. Performance rules

- Hero image is the LCP candidate: `priority`, `sizes="100vw"`, self-hosted
  `/photos/hero.jpg` (already done in `lib/images.js` — local files exist:
  `hero.jpg repairs.jpg cleaning.jpg restored.jpg`).
- H1 text must paint fast: the letter-stagger animation is implemented in
  pure CSS (keyframes + per-span `animation-delay`), total ≤0.9s, and must
  not require JS/hydration to become visible. Reduced-motion shows it static.
- Service card images: `sizes="(max-width:768px) 100vw, 360px"`. Slider
  images: `sizes="(max-width:900px) 100vw, 900px"`.
- All scroll listeners rAF-throttled and `{ passive:true }`.
- `next.config.js`: add `experimental: { optimizePackageImports: ["lucide-react"] }`,
  `images.minimumCacheTTL: 2678400`, drop the Unsplash `remotePatterns`
  (images are local now). Keep security headers; add
  `Cache-Control: public, max-age=31536000, immutable` for `/photos/:path*`
  and `/icon.svg`.
- `app/opengraph-image.js`: switch `runtime` from `"edge"` to `"nodejs"` so
  the route can be statically generated at build time (`twitter-image.js`
  re-exports — update both).

## 5. Accessibility (WCAG 2.1 AA)

- Landmarks: `header` (nav) / `main` / `footer`; exactly one `h1` (hero);
  sections use `h2`; cards use `h3`. Keep skip-link → `#main`.
- Focus ring: gold `:focus-visible` outline (already in globals — keep).
- Contrast: smallest text on dark uses `--text-dim` (#8c867f) or lighter.
- Forms: every input keeps `aria-label` (or visible label), errors use
  `role="alert"`, buttons have disabled/loading states.
- Slider: `role="slider"` + `aria-valuenow/min/max` + arrow-key support.
- `prefers-reduced-motion` disables: reveal animations, counters (show final
  value), letter stagger, the intro veil, pulse animations.

## 6. Error surfaces

- `app/not-found.js` (server): branded 404, link back to `/`.
- `app/error.js` (client — required by Next): branded error with reset().
- Both minimal, dark brand styling, no dependencies beyond React.

## 7. File ownership map (rebuild)

| Owner | Files |
|---|---|
| foundations-core | `app/globals.css` `app/layout.js` `next.config.js` `app/error.js` `app/not-found.js` `app/opengraph-image.js` `app/twitter-image.js` |
| foundations-primitives | `components/ui/Icon.jsx` `components/ui/SectionHeader.jsx` `components/ui/SmartImage.jsx` `components/ui/ui.module.css` `components/islands/Reveal.jsx` `components/islands/CountUp.jsx` |
| sec-chrome | `components/Navbar.jsx` + `Navbar.module.css`, `components/ScrollProgress.jsx`, `components/FloatingCTA.jsx` + `FloatingCTA.module.css`, `components/LoadingScreen.jsx` + `LoadingScreen.module.css` |
| sec-hero | `components/Hero.jsx` + `Hero.module.css` |
| sec-services | `components/Services.jsx` + `Services.module.css`, `components/TrustBadges.jsx` + `TrustBadges.module.css`, `components/Process.jsx` + `Process.module.css` |
| sec-results | `components/BeforeAfter.jsx` + `BeforeAfter.module.css`, `components/islands/BeforeAfterSlider.jsx`, `components/Testimonials.jsx` + `Testimonials.module.css` |
| sec-faq-areas | `components/FAQ.jsx` + `FAQ.module.css`, `components/Areas.jsx` + `Areas.module.css` |
| sec-forms-footer | `components/Contact.jsx` + `Contact.module.css`, `components/islands/QuoteForm.jsx`, `components/BookInspection.jsx` + `BookInspection.module.css`, `components/islands/InspectionForm.jsx`, `components/Footer.jsx` + `Footer.module.css`, shared `components/islands/forms.module.css` |
| integrator | `app/page.js`, delete `components/ui/primitives.jsx`, build-fix anywhere |

Untouched: `lib/site.config.js` `lib/email.js` `lib/theme.js`
`app/api/**` `app/sitemap.js` `app/robots.js` `app/manifest.js`
`components/StructuredData.jsx` `public/**` `.env.example`

Note: `lib/images.js` was updated by the architect before the rebuild —
`src` switched to self-hosted `/photos/*.jpg` per §4; alt text and fallback
colours are frozen..

`SectionHeader` (server) renders the repeated pattern: gold line + uppercase
label + h2 (+ optional sub paragraph), props
`{ label, title, sub, dark = true, center = false }` — port the visual from
the current `GoldLine`/`SectionLabel` primitives.

## 8. Definition of done

- `npm run build` green; `grep -r '"use client"'` matches ONLY the whitelist.
- View-source contains all copy (FAQ answers included — `<details>` content
  is in the HTML even when closed).
- No inline hover handlers; no `style={{...}}` except dynamic values.
- Anchors scroll correctly under the fixed nav; forms submit; slider drags
  and responds to arrow keys; mobile menu works at 375px.
- Visual parity-or-better with the current design at 375px / 768px / 1440px.
