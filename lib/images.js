/**
 * Image library — centralised photography map.
 *
 * Photos are SELF-HOSTED in /public/photos (downloaded from Unsplash under
 * the free commercial-use licence) and served through next/image, which
 * generates responsive AVIF/WebP variants at request time. Self-hosting
 * removes the runtime dependency on the Unsplash CDN — faster LCP, no
 * third-party availability risk.
 *
 * Every image carries descriptive, keyword-rich `alt` text for SEO + a11y,
 * and a `fallback` brand colour painted behind the photo while it loads
 * (and shown if it ever fails) — the layout NEVER shows a broken image.
 *
 * 👉 To use real job photos later: drop them in /public/photos and update
 *    the `src` here. Nothing else changes.
 */

export const images = {
  // HERO — roofer on a residential roof actively working
  hero: {
    src: "/photos/hero.jpg",
    alt: "Professional roofer working on a residential roof",
    fallback: "#3a4a5c",
  },

  // ── Service cards ──
  // REPAIRS — roofer in hi-vis fastening shingles with a nail gun
  serviceRepairs: {
    src: "/photos/repairs.jpg",
    alt: "Roofer in hi-vis securing shingles on a residential roof",
    fallback: "#8b5c3a",
  },
  // CLEANING — terracotta tile roof choked with moss & lichen (clearly the
  // BEFORE state that high-pressure roof cleaning targets)
  serviceCleaning: {
    src: "/photos/cleaning.jpg",
    alt: "Terracotta roof tiles covered in moss and lichen, in need of high-pressure cleaning",
    fallback: "#3a6b3a",
  },
  // RESTORATION — clean, vibrant terracotta tile roof against a blue sky
  // (the AFTER / restored look)
  serviceRestoration: {
    src: "/photos/restored.jpg",
    alt: "Freshly restored terracotta tile roof against a blue sky",
    fallback: "#a04b2a",
  },

  // BEFORE / AFTER — the same restored tile roof; the BEFORE layer gets a
  // CSS filter applied at render time so the slider genuinely shows the
  // same roof, weathered vs. restored.
  beforeAfterRoof: {
    src: "/photos/restored.jpg",
    alt: "Terracotta tile roof — before and after comparison",
    fallback: "#a04b2a",
  },
};

export default images;
