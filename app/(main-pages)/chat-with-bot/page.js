"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ═══════════════════════════════════════════════════
// 🔧 STEP 1 — DATA CONFIGURATION
// Tambah bot baru cukup tambah object baru di array ini.
// Fields:
//   id       → string unik, dipakai untuk URL /chat-with-bot/[id]
//   name     → nama bot yang tampil di card
//   title    → jabatan / role bot
//   affil    → afiliasi atau nama project/team
//   image    → path ke foto (taruh di /public/bots/) atau URL
//   color    → accent color: "blue"|"gold"|"purple"|"teal"|"red"|"green"
// ═══════════════════════════════════════════════════
const bots = [
  {
    id: "herta",
    name: "Herta",
    title: "Genius Society #83",
    affil: "Herta Station Space",
    image: "/img/herta-profile.jpg",
    color: "purple",
  },
  {
    id: "himeko",
    name: "Himeko",
    title: "Trailblazer",
    affil: "Astral Express",
    image: "/img/himeko-profile.jpg",
    color: "red",
  },
  {
    id: "march-7th",
    name: "March 7th",
    title: "Trailblazer",
    affil: "Astral Express",
    image: "/img/march-7th.jpg",
    color: "teal",
  },
  {
    id: "welt",
    name: "Welt",
    title: "Trailblazer",
    affil: "Astral Express",
    image: "/img/welt.jpg",
    color: "gold",
  },
  {
    id: "dan-heng",
    name: "Dan Heng",
    title: "Trailblazer",
    affil: "Astral Express",
    image: "/img/dan-heng.jpg",
    color: "green",
  },
  {
    id: "pom-pom",
    name: "Pom Pom",
    title: "Trailblazer",
    affil: "Astral Express",
    image: "/img/pompom-icon.ico",
    color: "red",
  },
  {
    id: "kafka",
    name: "Kafka",
    title: "Stellaron Hunter",
    affil: "Stellaron Hunter",
    image: "/img/kafka-profile.jpg",
    color: "purple",
  },
];

// ═══════════════════════════════════════════════════
// 🔧 STEP 2 — PAGINATION CONFIG
// ⚠️  Pagination hanya muncul kalau jumlah bot > ITEMS_PER_PAGE.
//     DESKTOP: 5 bot per halaman, MOBILE: 4 bot per halaman.
//     Ubah ke angka yang sesuai kebutuhan kamu.
// ═══════════════════════════════════════════════════
const ITEMS_PER_PAGE_DESKTOP = 5;
const ITEMS_PER_PAGE_MOBILE = 4;

// ═══════════════════════════════════════════════════
// 🔧 STEP 3 — COLOR ACCENT MAP
// ✅ FIX: Tambah "green" yang sebelumnya hilang dan bikin crash
// ═══════════════════════════════════════════════════
const accentMap = {
  purple: {
    glow: "#a78bfa",
    foil1: "#7c3aed",
    foil2: "#a78bfa",
    foil3: "#c4b5fd",
    badge: "rgba(167,139,250,0.15)",
    badgeText: "#c4b5fd",
    border: "rgba(167,139,250,0.4)",
  },
  gold: {
    glow: "#fbbf24",
    foil1: "#b45309",
    foil2: "#f59e0b",
    foil3: "#fde68a",
    badge: "rgba(251,191,36,0.15)",
    badgeText: "#fde68a",
    border: "rgba(251,191,36,0.4)",
  },
  blue: {
    glow: "#38bdf8",
    foil1: "#0369a1",
    foil2: "#38bdf8",
    foil3: "#bae6fd",
    badge: "rgba(56,189,248,0.15)",
    badgeText: "#bae6fd",
    border: "rgba(56,189,248,0.4)",
  },
  teal: {
    glow: "#2dd4bf",
    foil1: "#0f766e",
    foil2: "#2dd4bf",
    foil3: "#99f6e4",
    badge: "rgba(45,212,191,0.15)",
    badgeText: "#99f6e4",
    border: "rgba(45,212,191,0.4)",
  },
  red: {
    glow: "#f87171",
    foil1: "#991b1b",
    foil2: "#f87171",
    foil3: "#fecaca",
    badge: "rgba(248,113,113,0.15)",
    badgeText: "#fecaca",
    border: "rgba(248,113,113,0.4)",
  },
  // ✅ BARU — warna yang hilang sebelumnya
  green: {
    glow: "#4ade80",
    foil1: "#166534",
    foil2: "#4ade80",
    foil3: "#bbf7d0",
    badge: "rgba(74,222,128,0.15)",
    badgeText: "#bbf7d0",
    border: "rgba(74,222,128,0.4)",
  },
};

const getAccent = (color) => accentMap[color] ?? accentMap.blue;

// ═══════════════════════════════════════════════════
// DESKTOP CARD — card vertikal seperti semula
// ═══════════════════════════════════════════════════
function BotCardDesktop({ bot, onClick }) {
  const accent = getAccent(bot.color);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(bot.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(bot.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 16,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #08041a 0%, #0f0720 50%, #08041a 100%)",
        border: `1px solid ${hovered ? accent.glow + "90" : accent.border}`,
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        transform: hovered
          ? "translateY(-6px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 40px rgba(0,0,0,0.7), 0 0 28px ${accent.glow}50, inset 0 1px 0 ${accent.foil3}30`
          : `0 4px 16px rgba(0,0,0,0.4), inset 0 0 40px rgba(88,28,255,0.04)`,
      }}
    >
      {/* Foil shimmer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(115deg,
            transparent 0%, transparent 25%,
            ${accent.foil1}33 35%, ${accent.foil2}55 45%,
            ${accent.foil3}33 55%, transparent 65%, transparent 100%)`,
          backgroundSize: "200% 200%",
          backgroundPosition: hovered ? "0% 100%" : "100% 0%",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease, background-position 0.5s ease",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: 16,
        }}
      />

      {/* Scan line */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accent.glow}, transparent)`,
            zIndex: 4,
            animation: "scanAnim 1.5s linear infinite",
          }}
        />
      )}

      {/* Corner brackets */}
      {[
        { top: 8, left: 8, borderWidth: "2px 0 0 2px" },
        { top: 8, right: 8, borderWidth: "2px 2px 0 0" },
        { bottom: 8, left: 8, borderWidth: "0 0 2px 2px" },
        { bottom: 8, right: 8, borderWidth: "0 2px 2px 0" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            borderColor: accent.glow,
            borderStyle: "solid",
            borderWidth: pos.borderWidth,
            opacity: hovered ? 1 : 0.35,
            transition: "opacity 0.3s",
            zIndex: 2,
            ...pos,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: "24px 20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            padding: 3,
            background: `linear-gradient(135deg, ${accent.foil1}, ${accent.foil3})`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: "#08041a",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={bot.image}
              alt={bot.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<span style="font-family:Orbitron,monospace;font-size:22px;font-weight:900;color:${accent.glow}">${bot.name.slice(0, 2).toUpperCase()}</span>`;
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", width: "100%" }}>
          <p
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 15,
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: "0.05em",
              margin: "0 0 4px",
              textTransform: "uppercase",
            }}
          >
            {bot.name}
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: accent.badgeText,
              margin: "0 0 8px",
              letterSpacing: "0.02em",
            }}
          >
            {bot.title}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: accent.badge,
              border: `1px solid ${accent.border}`,
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 11,
              color: accent.badgeText,
              letterSpacing: "0.04em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            ⬡ {bot.affil}
          </span>
        </div>

        <div
          style={{
            width: "80%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${accent.glow}60, transparent)`,
            marginTop: 4,
          }}
        />

        <span
          style={{
            fontSize: 11,
            color: accent.glow,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
        >
          ▶ Enter Chat
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MOBILE CARD — card horizontal: avatar kiri, info kanan
// ═══════════════════════════════════════════════════
function BotCardMobile({ bot, onClick }) {
  const accent = getAccent(bot.color);
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onClick={() => onClick(bot.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(bot.id)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 14,
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #08041a 0%, #0f0720 60%, #08041a 100%)",
        border: `1px solid ${pressed ? accent.glow + "90" : accent.border}`,
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        boxShadow: pressed
          ? `0 4px 24px rgba(0,0,0,0.8), 0 0 16px ${accent.glow}40`
          : `0 2px 10px rgba(0,0,0,0.5)`,
        display: "flex",
        alignItems: "center",
        gap: 0,
        minHeight: 80,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: 4,
          alignSelf: "stretch",
          background: `linear-gradient(180deg, ${accent.foil1}, ${accent.foil3})`,
          flexShrink: 0,
        }}
      />

      {/* Avatar */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          padding: 2,
          background: `linear-gradient(135deg, ${accent.foil1}, ${accent.foil3})`,
          flexShrink: 0,
          margin: "0 14px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "#08041a",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={bot.image}
            alt={bot.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `<span style="font-family:Orbitron,monospace;font-size:16px;font-weight:900;color:${accent.glow}">${bot.name.slice(0, 2).toUpperCase()}</span>`;
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div
        style={{ flex: 1, paddingRight: 14, paddingTop: 2, paddingBottom: 2 }}
      >
        <p
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 13,
            fontWeight: 700,
            color: "#e2e8f0",
            letterSpacing: "0.05em",
            margin: "0 0 2px",
            textTransform: "uppercase",
          }}
        >
          {bot.name}
        </p>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: accent.badgeText,
            margin: "0 0 6px",
            letterSpacing: "0.02em",
          }}
        >
          {bot.title}
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            background: accent.badge,
            border: `1px solid ${accent.border}`,
            borderRadius: 5,
            padding: "3px 8px",
            fontSize: 10,
            color: accent.badgeText,
            letterSpacing: "0.04em",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          ⬡ {bot.affil}
        </span>
      </div>

      {/* Arrow indicator */}
      <div
        style={{
          paddingRight: 16,
          color: accent.glow,
          fontSize: 18,
          opacity: 0.7,
          flexShrink: 0,
        }}
      >
        ›
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// PAGINATION
// ═══════════════════════════════════════════════════
function PaginationBtn({ children, onClick, disabled, active }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: active
          ? "1px solid #818cf8"
          : "1px solid rgba(129,140,248,0.2)",
        background: active
          ? "linear-gradient(135deg, #2e1065, #4f46e5)"
          : hovered
            ? "rgba(46,16,101,0.5)"
            : "rgba(10,4,26,0.8)",
        color: active ? "#e0e7ff" : hovered ? "#c4b5fd" : "#6b7280",
        fontFamily: "'Orbitron', monospace",
        fontSize: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        opacity: disabled ? 0.3 : 1,
        boxShadow: active ? "0 0 14px rgba(129,140,248,0.4)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingTop: 16,
      }}
      aria-label="Pagination"
    >
      <PaginationBtn
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </PaginationBtn>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationBtn
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </PaginationBtn>
      ))}
      <PaginationBtn
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </PaginationBtn>
    </nav>
  );
}

// ═══════════════════════════════════════════════════
// SEARCH BAR — satu kolom, search by nama/title/afiliasi
// ═══════════════════════════════════════════════════
function SearchBar({ value, onChange, isMobile }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: isMobile ? "100%" : "min(420px, 100%)",
        margin: "0 auto",
      }}
    >
      {/* Search icon */}
      <span
        style={{
          position: "absolute",
          left: 13,
          top: "50%",
          transform: "translateY(-50%)",
          color: focused ? "#a78bfa" : "#4b5563",
          fontSize: 14,
          pointerEvents: "none",
          transition: "color 0.2s",
          zIndex: 1,
        }}
      >
        ⌕
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search by name, role, or affiliation…"
        style={{
          width: "100%",
          height: isMobile ? 38 : 42,
          paddingLeft: 36,
          paddingRight: value ? 36 : 14,
          background: focused ? "rgba(15,7,32,0.95)" : "rgba(8,4,26,0.8)",
          border: `1px solid ${focused ? "rgba(167,139,250,0.6)" : "rgba(129,140,248,0.2)"}`,
          borderRadius: 10,
          color: "#e2e8f0",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: isMobile ? 13 : 14,
          fontWeight: 500,
          letterSpacing: "0.02em",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          boxShadow: focused
            ? "0 0 0 3px rgba(167,139,250,0.12), 0 4px 16px rgba(0,0,0,0.4)"
            : "0 2px 8px rgba(0,0,0,0.3)",
          boxSizing: "border-box",
        }}
      />

      {/* Clear button — muncul kalau ada teks */}
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: 16,
            lineHeight: 1,
            padding: "2px 4px",
            borderRadius: 4,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#c4b5fd")}
          onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════
export default function BotListPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");

  // Deteksi ukuran layar
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Substring search: query harus muncul berurutan di salah satu field.
  // Contoh: "iko" → cocok "Himeko" ✓ | "k" saja tidak cukup match "Kafka"
  //         jika querynya "iko" dan Kafka tidak punya substring "iko".
  const filteredBots =
    search.trim() === ""
      ? bots
      : bots.filter(({ name, title, affil }) => {
          const q = search.toLowerCase();
          return (
            name.toLowerCase().includes(q) ||
            title.toLowerCase().includes(q) ||
            affil.toLowerCase().includes(q)
          );
        });

  const itemsPerPage = isMobile
    ? ITEMS_PER_PAGE_MOBILE
    : ITEMS_PER_PAGE_DESKTOP;
  const totalPages = Math.ceil(filteredBots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleBots = filteredBots.slice(startIndex, startIndex + itemsPerPage);

  const handleBotClick = (id) => router.push(`/chat-with-bot/${id}`);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset ke halaman 1 kalau switch layout dan halaman melebihi total
  useEffect(() => {
    const newTotal = Math.ceil(filteredBots.length / itemsPerPage);
    if (currentPage > newTotal) setCurrentPage(1);
  }, [isMobile, itemsPerPage, currentPage, filteredBots.length]);

  // Reset ke halaman 1 setiap kali search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

        @keyframes scanAnim {
          0%   { top: 0; }
          100% { top: 100%; }
        }
      `}</style>

      <main
        style={{
          /*
           * Ngepas tepat di area konten (bukan seluruh viewport).
           * Pakai height: 100% bukan 100vw/100dvh supaya tidak
           * menimpa layout sidebar dari Next.js / parent wrapper.
           */
          height: "100%",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",

          background: "#06020f",
          backgroundImage: `
            radial-gradient(ellipse at 15% 15%, rgba(88,28,255,0.13) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 85%, rgba(109,40,217,0.11) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 0%, rgba(76,29,149,0.15) 0%, transparent 40%),
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(139,92,246,0.018) 40px, rgba(139,92,246,0.018) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(139,92,246,0.018) 40px, rgba(139,92,246,0.018) 41px)
          `,
        }}
      >
        {/* ── HEADER ── */}
        <header
          style={{
            textAlign: "center",
            padding: isMobile ? "18px 20px 12px" : "28px 24px 16px",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? 9 : 11,
              letterSpacing: "0.3em",
              color: "#818cf8",
              textTransform: "uppercase",
              marginBottom: isMobile ? 6 : 10,
            }}
          >
            Interastral Navigation System
          </p>

          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? 22 : "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "#e2e8f0",
              letterSpacing: "0.05em",
              textShadow:
                "0 0 60px rgba(139,92,246,0.6), 0 0 20px rgba(167,139,250,0.3)",
              marginBottom: isMobile ? 4 : 8,
            }}
          >
            MY{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #818cf8, #a78bfa, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BOT
            </span>{" "}
            FLEET
          </h1>

          {!isMobile && (
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: 14,
                color: "#7c3aed",
                letterSpacing: "0.05em",
                opacity: 0.9,
                marginBottom: 10,
              }}
            >
              Select a unit to initiate communication protocol
            </p>
          )}

          <div
            style={{
              width: 80,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #818cf8, transparent)",
              margin: `${isMobile ? 8 : 12}px auto`,
            }}
          />

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(129,140,248,0.08)",
              border: "1px solid rgba(129,140,248,0.2)",
              borderRadius: 20,
              padding: isMobile ? "3px 10px" : "4px 14px",
              fontFamily: "'Orbitron', monospace",
              fontSize: isMobile ? 9 : 11,
              color: "#818cf8",
              letterSpacing: "0.1em",
            }}
          >
            ◈ {bots.length} UNIT{bots.length !== 1 ? "S" : ""} REGISTERED
          </span>

          {/* Search bar */}
          <div style={{ marginTop: isMobile ? 12 : 16 }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              isMobile={isMobile}
            />
          </div>
        </header>

        {/* ── BOT LIST — scrollable bila perlu ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? "8px 16px" : "8px 24px",
            /* Sembunyikan scrollbar tapi tetap bisa scroll */
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`main .bot-scroll::-webkit-scrollbar { display: none; }`}</style>

          <div
            className="bot-scroll"
            style={{
              maxWidth: isMobile ? "100%" : 1100,
              margin: "0 auto",

              /* Desktop: grid multi-kolom */
              /* Mobile: list vertikal 1 kolom */
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(190px, 1fr))",
              gap: isMobile ? 10 : 18,
            }}
          >
            {visibleBots.length === 0 ? (
              // Kosong — tampilkan pesan "tidak ditemukan"
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "48px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 32, opacity: 0.3, color: "#818cf8" }}>
                  ⌕
                </span>
                <p
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: 13,
                    color: "#4b5563",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  No units found
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#374151",
                    fontFamily: "'Rajdhani', sans-serif",
                  }}
                >
                  Coba kata lain — search by nama, role, atau afiliasi
                </p>
              </div>
            ) : (
              visibleBots.map((bot) =>
                isMobile ? (
                  <BotCardMobile
                    key={bot.id}
                    bot={bot}
                    onClick={handleBotClick}
                  />
                ) : (
                  <BotCardDesktop
                    key={bot.id}
                    bot={bot}
                    onClick={handleBotClick}
                  />
                ),
              )
            )}
          </div>
        </div>

        {/* ── PAGINATION — selalu di bawah ── */}
        {totalPages > 1 && (
          <div
            style={{
              flexShrink: 0,
              padding: isMobile ? "10px 16px 16px" : "12px 24px 20px",
            }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </>
  );
}
