/**
 * Image library — centralised photography map.
 *
 * Photos are SELF-HOSTED in /public/photos (sourced from Unsplash under the
 * free commercial-use licence, art-directed pass 2026-06: every shot was
 * reviewed against the brand brief — clean composition, no clutter, tile
 * roofs that read Australian-residential). Served through next/image
 * (responsive AVIF/WebP) and unified by the SmartImage brand colour grade.
 *
 * Each entry: `src` (public path), `alt` (descriptive, keyword-rich for
 * SEO + a11y), `fallback` (brand colour painted while loading / on error),
 * and optional `position` (CSS object-position — art-directed crop focus
 * applied by <SmartImage>).
 *
 * 👉 To use real job photos later: drop them in /public/photos and update
 *    the `src` here. Nothing else changes.
 */

export const images = {
  // HERO — drone view over a leafy Australian-style suburb: hundreds of the
  // exact tile rooftops Coast2Coast services. Calm sky top-left gives the
  // headline room under the dark scrim.
  hero: {
    src: "/photos/hero-suburb.jpg",
    alt: "Aerial view of tiled rooftops across a leafy Australian suburb",
    fallback: "#33424f",
    position: "center 65%",
  },

  // ── Service cards ──
  // REPAIRS — two roofers laying dark tiles on a fresh battened roof; the
  // action lives in the right two-thirds of frame.
  serviceRepairs: {
    src: "/photos/repairs-tiling.jpg",
    alt: "Roofers laying new roof tiles on a residential roof",
    fallback: "#3d3a36",
    position: "65% center",
  },
  // CLEANING — water sheeting off freshly washed terracotta tiles; crop to
  // the cascade at the eave (top of frame).
  serviceCleaning: {
    src: "/photos/cleaning-wash.jpg",
    alt: "Water rinsing freshly cleaned terracotta roof tiles",
    fallback: "#7a4a32",
    position: "center 30%",
  },
  // RESTORATION — crisp roof edge with new white fascia and gutter against
  // blue sky: the finished-job money shot.
  serviceRestoration: {
    src: "/photos/restored-edge.jpg",
    alt: "Restored tile roof with new white fascia and gutters against a blue sky",
    fallback: "#7d6248",
    position: "center 38%",
  },

  // BEFORE / AFTER — a real image pair with identical geometry. The AFTER is
  // the clean full-frame tile shot; the BEFORE is the same photograph put
  // through a realistic weathering pass (patchy grime, olive moss hugging
  // the tile grooves, sparse lichen, water streaks — generated procedurally,
  // not a flat CSS filter). Same roof, believable wipe.
  beforeAfterAfter: {
    src: "/photos/beforeafter-tiles.jpg",
    alt: "Freshly cleaned terracotta tile roof — after",
    fallback: "#9c5a3c",
  },
  beforeAfterBefore: {
    src: "/photos/beforeafter-before.jpg",
    alt: "Weathered terracotta tile roof with moss and grime — before",
    fallback: "#5a4a3c",
  },
};

export default images;
