# Coast2Coast Roofing WA

Premium marketing website for Coast2Coast Roofing — Western Australia's roofing specialists. Built with **Next.js 14 (App Router)** and React, with a fully componentised architecture, real photography, perfect technical SEO, and accessibility baked in.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## Updating business details (read this first)

**Every piece of business information lives in one file:**

```
lib/site.config.js
```

Phone, email, address, ABN, builder licence, opening hours, social links, the
domain, service list, testimonials, FAQs, service areas and portfolio copy are
all read from here. Values still needing the real Coast2Coast details are
marked with `TODO`. Edit this one file, redeploy, and the whole site (header,
footer, contact section, structured data / SEO) updates together.

## Swapping in your own photos

Photography is mapped in `lib/images.js`. Images currently load from the
Unsplash CDN. To use your own job photos instead:

1. Drop them into `public/photos/`
2. Change the relevant `src` to e.g. `"/photos/restoration1.jpg"`

If any image ever fails to load, the `<SmartImage>` component falls back to a
branded gradient — the layout never shows a broken image.

---

## Project structure

```
coast2coast/
├── app/
│   ├── layout.js              # <html>, fonts, metadata, JSON-LD injection
│   ├── page.js                # page composition (section order)
│   ├── globals.css            # base styles, a11y, reduced-motion, keyframes
│   ├── sitemap.js             # generated /sitemap.xml
│   ├── robots.js              # generated /robots.txt
│   ├── manifest.js            # generated /manifest.webmanifest (PWA)
│   ├── opengraph-image.js     # auto-generated 1200×630 social share image
│   └── twitter-image.js       # reuses the OG image for X/Twitter
│   └── api/
│       ├── quote/route.js     # POST endpoint for the "Get a free quote" form
│       └── inspection/route.js # POST endpoint for the "Book an inspection" form
├── components/
│   ├── ui/primitives.jsx      # hooks, Fade, Icon registry, SmartImage
│   ├── Navbar.jsx  Hero.jsx  Services.jsx  TrustBadges.jsx  Process.jsx
│   ├── BeforeAfter.jsx  BookInspection.jsx  Testimonials.jsx
│   ├── FAQ.jsx  Areas.jsx  Contact.jsx  Footer.jsx
│   ├── ScrollProgress.jsx  LoadingScreen.jsx  FloatingCTA.jsx
│   └── StructuredData.jsx     # schema.org JSON-LD (LocalBusiness, FAQ, etc.)
├── lib/
│   ├── site.config.js         # ⭐ single source of truth for all content
│   ├── theme.js               # design tokens (colours, spacing, radius)
│   ├── images.js              # photography map + alt text + fallbacks
│   └── email.js               # Resend helper used by the API routes
├── public/
│   └── icon.svg               # favicon / app icon
├── next.config.js             # image domains, security headers
└── jsconfig.json              # "@/..." path alias
```

---

## SEO checklist (already implemented)

- Per-site metadata with title template, canonical URL and rich keywords
- `RoofingContractor` (LocalBusiness) structured data with `aggregateRating`,
  `areaServed`, opening hours and a service catalogue
- `FAQPage` and `WebSite` JSON-LD
- Auto-generated `sitemap.xml`, `robots.txt` and PWA manifest
- Auto-generated Open Graph + Twitter share images
- Semantic landmarks (`<main>`, `<nav>`, `<footer>`, `<figure>`), descriptive
  `alt` text, keyboard-accessible interactive components and visible focus rings
- `prefers-reduced-motion` support, lazy-loaded images, security headers

**Before launch:** replace every `TODO` in `lib/site.config.js`, then verify
the homepage in Google's [Rich Results Test](https://search.google.com/test/rich-results).

---

## Lead emails (contact forms)

Both forms POST JSON to internal API routes (`/api/quote`, `/api/inspection`)
which validate, screen for spam (hidden honeypot field + server-side checks)
and forward a formatted notification to the business via [Resend](https://resend.com).

**Setup (one-time):**

1. Create a free Resend account at <https://resend.com> and copy an API key.
2. Copy `.env.example` to `.env.local` (for local dev) and add the same keys to
   Vercel → Project Settings → Environment Variables (for production):

   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   LEAD_NOTIFY_TO=info@coast2coastroofing.com.au
   ```

3. Until the domain is verified in Resend, leads are sent from
   `onboarding@resend.dev`. To send from `quotes@coast2coastroofing.com.au`
   instead, verify the domain at <https://resend.com/domains>, then set:

   ```
   RESEND_FROM="Coast2Coast Roofing <quotes@coast2coastroofing.com.au>"
   ```

The customer's email is set as the `Reply-To` header, so simply replying to
the notification gets you straight back to the lead.

---

## Deployment

Optimised for **Vercel**. Push to a Git repo and import it, or use the Vercel
CLI (`vercel`). Set the environment variables above in the Vercel dashboard
before launching — without them the contact forms return a 502.
