// config semua bot (prompt, keywords, error msg, dll)

// ─────────────────────────────────────────────────────────────
// Tambah bot baru cukup di sini. Route tidak perlu diubah.
// ─────────────────────────────────────────────────────────────

import { HERTA_SYSTEM_PROMPT } from "./botPrompts";
import { getMadamHertaProfile } from "./botContexts";

export const BOT_CONFIGS = {
  // ── Herta ──────────────────────────────────────────────────
  herta: {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    // Kata kunci yang memicu fetch data tambahan (opsional)
    keywords: [
      "herta",
      "madam",
      "nyonya",
      "stasiun",
      "space station",
      "genius society",
      "simulated universe",
      "boneka",
      "doll",
      "erudition",
      "nous",
      "emanator",
      "kuru",
      "asta",
      "ruan mei",
      "screwllum",
      "kemampuan",
      "skill",
      "ability",
      "element",
      "elemen",
      "path",
      "lore",
      "profil",
      "karakter",
    ],

    // Fungsi untuk mengambil context tambahan (null = tidak perlu)
    getContext: getMadamHertaProfile,

    // Pesan error custom bot ini
    errorMessage: "Terjadi kesalahan sistem. Herta tidak peduli.",
  },

  // ── Himeko ─────────────────────────────────────────────────
  himeko: {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    keywords: [], // kosong = tidak ada keyword fetch

    getContext: null, // tidak ada data tambahan

    errorMessage:
      "Maaf, sepertinya koneksi Astral Express terputus. Coba lagi ya!",
  },

  // ── March 7th ──────────────────────────────────────────────
  "march-7th": {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    keywords: [],
    getContext: null,

    errorMessage:
      "Eh?! Ada yang salah! Tunggu aku foto dulu baru kubereskan! 📸",
  },

  // ── Welt ───────────────────────────────────────────────────
  welt: {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    keywords: [],
    getContext: null,

    errorMessage: "Hmm, tampaknya ada gangguan. Beri aku waktu sebentar.",
  },

  // ── Dan Heng ───────────────────────────────────────────────
  "dan-heng": {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    keywords: [],
    getContext: null,

    errorMessage: "Terjadi kesalahan. Aku akan periksa.",
  },

  // ── Pom-Pom ────────────────────────────────────────────────
  "pom-pom": {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    keywords: [],
    getContext: null,

    errorMessage: "Kyaa! Ada yang rusak! Pom-Pom minta maaf!",
  },

  // ── Kafka ──────────────────────────────────────────────────
  kafka: {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    keywords: [],
    getContext: null,

    errorMessage: "Sepertinya ada yang menghalangi komunikasi kita. Menarik.",
  },
};

// Fallback kalau botId tidak ditemukan
export const DEFAULT_CONFIG = {
  systemPrompt:
    "Kamu adalah asisten Astral Express. Jawab dengan ramah dalam Bahasa Indonesia.",
  keywords: [],
  getContext: null,
  errorMessage: "Terjadi kesalahan pada sistem Astral Express.",
};
