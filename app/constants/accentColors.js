// ═══════════════════════════════════════════════════
// ACCENT COLOR MAP — single source of truth
// Tambah warna baru cukup tambah object di sini.
// Fields:
//   glow      → warna utama / glow effect
//   foil1–3   → gradient foil shimmer (gelap → terang)
//   badge     → background badge (rgba, low opacity)
//   badgeText → warna teks badge
//   border    → warna border badge
//   ring      → conic-gradient stops untuk avatar ring di chat page
// ═══════════════════════════════════════════════════

// bot profile border color
export const accentMap = {
  purple: {
    glow: "#a78bfa",
    foil1: "#7c3aed",
    foil2: "#a78bfa",
    foil3: "#c4b5fd",
    badge: "rgba(167,139,250,0.15)",
    badgeText: "#c4b5fd",
    border: "rgba(167,139,250,0.4)",
    ring: "#7c3aed, #a855f7, #22d3ee, #a855f7, #7c3aed",
    bg1: "#0d0520", // warna gelap base (tinted)
    bg2: "#160d30", // warna gelap sekunder
  },
  gold: {
    glow: "#fbbf24",
    foil1: "#b45309",
    foil2: "#f59e0b",
    foil3: "#fde68a",
    badge: "rgba(251,191,36,0.15)",
    badgeText: "#fde68a",
    border: "rgba(251,191,36,0.4)",
    ring: "#b45309, #f59e0b, #fde68a, #f59e0b, #b45309",
    bg1: "#1a0e00",
    bg2: "#251500",
  },
  blue: {
    glow: "#38bdf8",
    foil1: "#0369a1",
    foil2: "#38bdf8",
    foil3: "#bae6fd",
    badge: "rgba(56,189,248,0.15)",
    badgeText: "#bae6fd",
    border: "rgba(56,189,248,0.4)",
    ring: "#0369a1, #38bdf8, #bae6fd, #38bdf8, #0369a1",
    bg1: "#00111a",
    bg2: "#001a28",
  },
  teal: {
    glow: "#2dd4bf",
    foil1: "#0f766e",
    foil2: "#2dd4bf",
    foil3: "#99f6e4",
    badge: "rgba(45,212,191,0.15)",
    badgeText: "#99f6e4",
    border: "rgba(45,212,191,0.4)",
    ring: "#0f766e, #2dd4bf, #99f6e4, #2dd4bf, #0f766e",
    bg1: "#001a18",
    bg2: "#002520",
  },
  red: {
    glow: "#f87171",
    foil1: "#991b1b",
    foil2: "#f87171",
    foil3: "#fecaca",
    badge: "rgba(248,113,113,0.15)",
    badgeText: "#fecaca",
    border: "rgba(248,113,113,0.4)",
    ring: "#991b1b, #f87171, #fecaca, #f87171, #991b1b",
    bg1: "#1a0505",
    bg2: "#250808",
  },
  green: {
    glow: "#4ade80",
    foil1: "#166534",
    foil2: "#4ade80",
    foil3: "#bbf7d0",
    badge: "rgba(74,222,128,0.15)",
    badgeText: "#bbf7d0",
    border: "rgba(74,222,128,0.4)",
    ring: "#166534, #4ade80, #bbf7d0, #4ade80, #166534",
    bg1: "#021a08",
    bg2: "#04250d",
  },
  pink: {
    glow: "#f472b6",
    foil1: "#9d174d",
    foil2: "#f472b6",
    foil3: "#fbcfe8",
    badge: "rgba(244,114,182,0.15)",
    badgeText: "#fbcfe8",
    border: "rgba(244,114,182,0.4)",
    ring: "#9d174d, #f472b6, #fbcfe8, #f472b6, #9d174d",
    bg1: "#1a0510",
    bg2: "#250818",
  },
};

export const getAccent = (color) => accentMap[color] ?? accentMap.blue;
