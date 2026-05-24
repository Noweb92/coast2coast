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
 */

const U = "https://images.unsplash.com/";

// Build an optimised, responsive Unsplash URL.
const ux = (id, w = 1200, q = 70) =>
  `${U}${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  hero: {
    src: ux("photo-1632759145351-1d592919f522", 1920, 72),
    alt: "Professional roofer working on a tiled residential roof in Western Australia",
    fallback: "#3a4a5c",
  },

  // Service cards
  serviceRepairs: {
    src: ux("photo-1605276374104-dee2a0ed3cd6", 900),
    alt: "Roofer repairing storm-damaged roof tiles in Perth",
    fallback: "#8b5c3a",
  },
  serviceCleaning: {
    src: ux("photo-1558618666-fcd25c85cd64", 900),
    alt: "High-pressure roof cleaning removing moss and grime",
    fallback: "#3a6b8b",
  },
  serviceRestoration: {
    src: ux("photo-1600585154340-be6161a56a0c", 900),
    alt: "Fully restored modern home roof in Western Australia",
    fallback: "#4a7c59",
  },
  serviceGutters: {
    src: ux("photo-1601121141461-9d6647bca1ed", 900),
    alt: "Clean guttering and downpipe on a residential home",
    fallback: "#6b5c8b",
  },

  // Before / after
  beforeAfterBefore: {
    src: ux("photo-1632759145351-1d592919f522", 1200),
    alt: "Weathered, stained roof before restoration",
    fallback: "#4a3f34",
  },
  beforeAfterAfter: {
    src: ux("photo-1600585154340-be6161a56a0c", 1200),
    alt: "Clean, restored and protected roof after professional work",
    fallback: "#2d5a3f",
  },

  // Portfolio / gallery (keyed by `image` field in site.config projects)
  restoration1: {
    src: ux("photo-1600585154340-be6161a56a0c", 1200),
    alt: "Full concrete tile roof restoration project in Perth CBD",
    fallback: "#4a7c59",
  },
  repair1: {
    src: ux("photo-1605276374104-dee2a0ed3cd6", 1200),
    alt: "Emergency storm damage roof repair in Mandurah",
    fallback: "#8b5c3a",
  },
  cleaning1: {
    src: ux("photo-1558618666-fcd25c85cd64", 1200),
    alt: "High-pressure Colorbond roof cleaning in Joondalup",
    fallback: "#3a6b8b",
  },
  gutters1: {
    src: ux("photo-1601121141461-9d6647bca1ed", 1200),
    alt: "Gutter guard installation on a Bunbury home",
    fallback: "#6b5c8b",
  },
  repair2: {
    src: ux("photo-1593604340846-4fbe9763a8f3", 1200),
    alt: "Terracotta tile roof repair and re-pointing in Fremantle",
    fallback: "#8b5c3a",
  },
  restoration2: {
    src: ux("photo-1570129477492-45c003edd2be", 1200),
    alt: "Colorbond roof re-coat in Surfmist, Rockingham",
    fallback: "#4a7c59",
  },

  // CTA / about band
  team: {
    src: ux("photo-1581094794329-c8112a89af12", 1600),
    alt: "Coast2Coast Roofing crew on a Western Australian job site",
    fallback: "#26262d",
  },
};

export default images;
