/**
 * Image library — centralised photography map.
 *
 * Photos are served from the Unsplash CDN (free, commercial-use licence).
 * Every image carries descriptive, keyword-rich `alt` text for SEO + a11y,
 * and a `fallback` brand colour used by <SmartImage> if the photo ever fails
 * to load — so the layout NEVER shows a broken image.
 *
 * 👉 To use your own job photos later: drop them in /public/photos and change
 *    the `src` here to e.g. "/photos/restoration1.jpg". Nothing else changes.
 *
 * 👉 EVERY Unsplash ID below has been visually inspected to confirm the photo
 *    matches its alt text. Do not swap blindly.
 */

const U = "https://images.unsplash.com/";

// Build an optimised, responsive Unsplash URL.
const ux = (id, w = 1200, q = 70) =>
  `${U}${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  // HERO — roofer on a residential roof actively working
  hero: {
    src: ux("photo-1632759145351-1d592919f522", 1920, 72),
    alt: "Professional roofer working on a residential roof",
    fallback: "#3a4a5c",
  },

  // ── Service cards ──
  // REPAIRS — roofer in hi-vis fastening shingles with a nail gun
  serviceRepairs: {
    src: ux("photo-1633759593085-1eaeb724fc88", 900),
    alt: "Roofer in hi-vis securing shingles on a residential roof",
    fallback: "#8b5c3a",
  },
  // CLEANING — terracotta tile roof choked with moss & lichen (clearly the
  // BEFORE state that high-pressure roof cleaning targets)
  serviceCleaning: {
    src: ux("photo-1564783679669-f5391270417b", 900),
    alt: "Terracotta roof tiles covered in moss and lichen, in need of high-pressure cleaning",
    fallback: "#3a6b3a",
  },
  // RESTORATION — clean, vibrant terracotta tile roof against a blue sky
  // (the AFTER / restored look)
  serviceRestoration: {
    src: ux("photo-1563993356056-b23a9cd265ad", 900),
    alt: "Freshly restored terracotta tile roof against a blue sky",
    fallback: "#a04b2a",
  },

  // BEFORE / AFTER — the same restored tile roof; the BEFORE layer gets a
  // CSS filter applied at render time so the slider genuinely shows the
  // same roof, weathered vs. restored.
  beforeAfterRoof: {
    src: ux("photo-1563993356056-b23a9cd265ad", 1400),
    alt: "Terracotta tile roof — before and after comparison",
    fallback: "#a04b2a",
  },
};

export default images;
