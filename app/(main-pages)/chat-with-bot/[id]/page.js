"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Send } from "lucide-react";
import { bots } from "@/app/constants/botList";
import { useAccent } from "@/app/context/accentContext";
import { getAccent } from "@/app/constants/accentColors";
import "../style.css";
import { BOT_CONFIGS } from "@/app/libs/botConfigs";

// Ambil 2 huruf kapital dari nama bot, misal "Himeko" → "HI"
function getInitials(name = "") {
  const firstWord = name.trim().split(/[\s-]+/)[0] || "";
  return firstWord.slice(0, 2).toUpperCase();
}

// Komponen avatar: tampilkan gambar atau initial sebagai fallback
function BotAvatar({ bot, accent, size = 116, className = "", style = {} }) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(bot.name);
  const hasImage = bot.image && !imgError;

  if (hasImage) {
    return (
      <img
        src={bot.image}
        alt={bot.name}
        className={className}
        style={style}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: accent.badge,
        color: accent.glow,
        fontFamily: "'Orbitron', monospace",
        fontWeight: 700,
        fontSize: size * 0.28,
        letterSpacing: "0.08em",
        userSelect: "none",
        ...style,
      }}
    >
      {initials}
    </div>
  );
}

export default function ChatPage() {
  const { id } = useParams();
  const bot = bots.find((b) => b.id === id);
  const accent = getAccent(bot?.color);

  const { setAccentKey } = useAccent();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: BOT_CONFIGS[id]?.greetingMessage ?? `Halo, aku ${bot?.name}.`,
    },
  ]);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Set accent saat masuk halaman, reset saat keluar
  useEffect(() => {
    if (bot?.color) setAccentKey(bot.color);
    return () => setAccentKey("purple"); // reset ke default
  }, [bot?.color]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => inputRef.current?.focus(), 100);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          botId: id,
          history: messages.slice(-10),
        }),
      });

      setMessages((prev) => [...prev, { role: "bot", text: "" }]);
      setIsLoading(false);

      if (!res.ok) {
        const errText = await res.text();
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "bot", text: errText };
          return updated;
        });
        return;
      }

      setIsStreaming(true);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const char of chunk) {
          await new Promise((r) => setTimeout(r, 15));
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "bot",
              text: updated[updated.length - 1].text + char,
            };
            return updated;
          });
        }
      }
      setIsStreaming(false);
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Koneksi terputus dari jalur bintang." },
      ]);
    }
  }

  if (!bot) {
    return (
      <div className="cx__not-found">
        Unit tidak ditemukan dalam database Astral Express.
      </div>
    );
  }

  // CSS variables yang di-inject sekali di root, jadi CSS bisa pakai var(--cx-*)
  const cssVars = {
    "--cx-glow": accent.glow,
    "--cx-foil1": accent.foil1,
    "--cx-foil2": accent.foil2,
    "--cx-foil3": accent.foil3,
    "--cx-badge": accent.badge,
    "--cx-badge-text": accent.badgeText,
    "--cx-border": accent.border,
    "--cx-bg1": accent.bg1,
    "--cx-bg2": accent.bg2,
  };

  return (
    <div className="cx__root" style={cssVars}>
      {/* Background stars (static) */}
      <div className="cx__stars" />

      {/* Accent glow overlay — warna dari bot */}
      <div
        className="cx__accent-bg"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 25% 10%, ${accent.glow}22 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 85% 85%, ${accent.glow}14 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 10% 90%, ${accent.foil1}33 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Chat Column ── */}
      <div className="cx__main">
        {/* Header */}
        <div className="cx__header">
          <div className="cx__header-avatar-wrap">
            <BotAvatar
              bot={bot}
              accent={accent}
              size={34}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <div>
            <div className="cx__header-name">{bot.name}</div>
            <div className="cx__header-status">
              <span className="cx__status-dot" />
              Online
            </div>
          </div>
          <span className="cx__header-label">
            Astral Express · Secure Channel
          </span>
        </div>

        {/* Chat Messages */}
        <div className="cx__chat">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`cx__msg-row ${msg.role === "user" ? "cx__msg-row--user" : "cx__msg-row--bot"}`}
            >
              {msg.role === "bot" && (
                <div className="cx__msg-avatar-wrap">
                  <BotAvatar
                    bot={bot}
                    accent={accent}
                    size={28}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              <div
                className={`cx__bubble ${msg.role === "user" ? "cx__bubble--user" : "cx__bubble--bot"}`}
              >
                {msg.text}
                {msg.role === "bot" &&
                  i === messages.length - 1 &&
                  isStreaming && <span className="cx__cursor" />}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="cx__msg-row cx__msg-row--bot">
              <div className="cx__msg-avatar-wrap">
                <BotAvatar
                  bot={bot}
                  accent={accent}
                  size={28}
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </div>
              <div className="cx__loading">
                <span className="cx__dot" />
                <span className="cx__dot" />
                <span className="cx__dot" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="cx__input-wrap">
          <div className="cx__input-inner">
            <input
              ref={inputRef}
              className="cx__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Kirim pesan ke ${bot.name}...`}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              style={{ fontSize: "16px" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className={`cx__send ${input.trim() && !isLoading ? "cx__send--active" : "cx__send--inactive"}`}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Profile Sidebar ── */}
      <aside className="cx__profile">
        <div className="cx__avatar-wrap">
          <div
            className="cx__avatar-ring"
            style={{ background: `conic-gradient(from 0deg, ${accent.ring})` }}
          />
          <div className="cx__avatar-bg" />
          <div className="cx__avatar-inner">
            <BotAvatar
              bot={bot}
              accent={accent}
              size={112}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="cx__avatar-glow" />
        </div>

        <p className="cx__profile-name">{bot.name}</p>
        <div className="cx__divider" />

        <div className="cx__badge">
          <span className="cx__badge-label">Designation</span>
          <span className="cx__badge-value cx__badge-value--accent">
            {bot.title}
          </span>
        </div>

        <div className="cx__badge">
          <span className="cx__badge-label">Affiliation</span>
          <span className="cx__badge-value">{bot.affil}</span>
        </div>

        <div className="cx__divider" />

        <p className="cx__profile-footer">
          ✦ Astral Express ✦<br />
          Communication Unit
        </p>
      </aside>
    </div>
  );
}
