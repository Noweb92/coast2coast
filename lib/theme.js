/**
 * Design tokens — single source of truth for the Coast2Coast visual language.
 * Every colour, spacing step and shadow used across the site lives here so the
 * brand can be re-skinned from one file. Do not hardcode colours in components.
 */

export const colors = {
  // Surfaces
  dark: "#1e1e24",
  darkDeep: "#161619",
  darkSoft: "#26262d",
  darkCard: "#2a2a32",

  // Warm light surfaces
  warm: "#f5f2ed",
  warmLight: "#faf8f5",
  warmMid: "#ede9e2",
  white: "#ffffff",

  // Brand gold
  gold: "#fbbf24",
  goldDark: "#b8860b",
  goldDeep: "#92710a",
  goldLight: "#fde68a",
  goldMuted: "rgba(251,191,36,0.08)",
  goldBorder: "rgba(251,191,36,0.18)",

  // Text on dark
  textWhite: "#f5f5f4",
  textLight: "#d6d3d1",
  textMuted: "#a8a29e",
  textDim: "#8c867f", // raised from #78716c to clear WCAG AA (4.5:1) on dark surfaces
  textFaint: "#57534e",

  // Text on light
  textDark: "#292524",
  textDarkMuted: "#57534e",

  // Borders
  border: "#333338",
  borderLight: "#e8e2d9",

  // Status
  success: "#22c55e",
  successBg: "rgba(34,197,94,0.1)",
  successBorder: "rgba(34,197,94,0.2)",
};

// Backwards-compatible short alias used throughout the component tree.
export const C = colors;

export const layout = {
  maxWidth: 1140,
  pagePadX: 28,
  sectionPadY: 110,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 100,
};

export const shadow = {
  card: "0 16px 40px rgba(30,30,36,0.12)",
  cardHover: "0 16px 40px rgba(30,30,36,0.18)",
  gold: "0 4px 20px rgba(251,191,36,0.2)",
  goldHover: "0 8px 30px rgba(251,191,36,0.3)",
  float: "0 12px 40px rgba(0,0,0,0.4)",
};

export const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
