// config semua bot (prompt, keywords, error msg, dll)

// ─────────────────────────────────────────────────────────────
// Tambah bot baru cukup di sini. Route tidak perlu diubah.
// ─────────────────────────────────────────────────────────────

import {
  CASTORICE_SYSTEM_PROMPT,
  HERTA_SYSTEM_PROMPT,
  HIMEKO_SYSTEM_PROMPT,
  WIP_SYSTEM_PROMPT,
} from "./botPrompts";
import {
  getCastoriceContext,
  getHertaBotContext,
  getHimekoBotContext,
} from "./botContexts";

export const BOT_CONFIGS = {
  // ── Herta ──────────────────────────────────────────────────
  herta: {
    systemPrompt: HERTA_SYSTEM_PROMPT,

    // Kata kunci yang memicu fetch data tambahan (opsional)
    keywords: [
      "madam herta",
      "nyonya herta",
      "the herta",
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
    getContext: getHertaBotContext,

    // Salam custom dari bot
    greetingMessage: "Herta sibuk, apa yang kau inginkan?",

    // Pesan error custom bot ini
    errorMessage:
      "Herta sibuk sekarang, bicara lagi nanti. \n\n<b><i>Pesan Otomatis</i></b>.",
  },

  // ── Himeko ─────────────────────────────────────────────────
  himeko: {
    systemPrompt: HIMEKO_SYSTEM_PROMPT,

    keywords: [
      "navigator",
      "astral express",
      "kereta",
      "express",
      "kopi",
      "coffee",
      "pom-pom",
      "welt",
      "dan heng",
      "march",
      "trailblazer",
      "fire",
      "api",
      "mekanik",
      "bintang",
      "kosmos",
      "perjalanan",
      "akivili",
      "nameless",
      "stellaron",
      "lore",
      "profil",
    ],

    getContext: getHimekoBotContext,

    greetingMessage: "Sangat jarang melihatmu santai, ada apa?",

    errorMessage:
      "Maaf, sepertinya koneksi Astral Express terputus. Coba lagi nanti ya!",
  },

  // ── Castorice ──────────────────────────────────────────────
  castorice: {
    systemPrompt: CASTORICE_SYSTEM_PROMPT,

    keywords: [
      "amphoreus",
      "aidonia",
      "styxia",
      "remembrance",
      "quantum",
      "netherwing",
      "memosprite",
      "goddess of death",
      "dewa kematian",
      "death",
      "kematian",
      "chrysos heir",
      "polyxia",
      "mooncocoon",
      "newbud",
      "scythe",
      "kupu-kupu",
      "butterfly",
      "coreflame",
      "lore",
      "profil",
      "data",
    ],

    getContext: getCastoriceContext,

    greetingMessage:
      "Kita berjumpa lagi. Maaf jika kehadiranku membuatmu kurang nyaman... Apakah ada sesuatu yang bisa kubantu hari ini?",

    errorMessage: "Terjadi kesalahan sistem, kembali lagi nanti.",
  },

  // // ── March 7th ──────────────────────────────────────────────
  // march7th: {
  //   systemPrompt: null,

  //   keywords: [],
  //   getContext: null,

  //   errorMessage:
  //     "Eh?! Ada yang salah! Tunggu aku foto dulu baru kubereskan! 📸",
  // },

  // // ── Welt ───────────────────────────────────────────────────
  // welt: {
  //   systemPrompt: null,

  //   keywords: [],
  //   getContext: null,

  //   errorMessage: "Hmm, tampaknya ada gangguan. Beri aku waktu sebentar.",
  // },

  // // ── Dan Heng ───────────────────────────────────────────────
  // "dan-heng": {
  //   systemPrompt: null,

  //   keywords: [],
  //   getContext: null,

  //   errorMessage: "Terjadi kesalahan. Aku akan periksa.",
  // },

  // // ── Pom-Pom ────────────────────────────────────────────────
  // "pom-pom": {
  //   systemPrompt: null,

  //   keywords: [],
  //   getContext: null,

  //   errorMessage: "Kyaa! Ada yang rusak! Pom-Pom minta maaf!",
  // },

  // // ── Kafka ──────────────────────────────────────────────────
  // kafka: {
  //   systemPrompt: null,

  //   keywords: [],
  //   getContext: null,

  //   errorMessage: "Sepertinya ada yang menghalangi komunikasi kita. Menarik.",
  // },
};

// Fallback kalau botId tidak ditemukan
export const DEFAULT_CONFIG = {
  systemPrompt:
    "Kamu adalah asisten Astral Express. Jawab dengan ramah dalam Bahasa Indonesia.",
  keywords: [],
  getContext: null,
  errorMessage: "Terjadi kesalahan pada sistem Astral Express.",
};
