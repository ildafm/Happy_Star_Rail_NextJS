"use client";

import { useEffect, useRef, useState } from "react";
import ProfileBar from "./components/ProfileBar";
import { Send } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Apa yang kau inginkan?" }, // pesan awal dari bot
  ]);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // Kembalikan fokus ke input setelah kirim (penting di mobile)
    setTimeout(() => inputRef.current?.focus(), 100);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();

    setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
  }

  return (
    <>
      {/* ===== KOLOM CHAT ===== */}
      <section
        className="flex flex-col flex-1 bg-gray-900 overflow-hidden
        h-[calc(100dvh-4rem)]
        md:h-screen
      "
      >
        {/* Header */}
        <div className="shrink-0 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-base md:text-xl font-bold text-white flex items-center gap-2 my-4">
            🤖 <span>Herta Support Unit</span>
          </h1>

          <img
            src="https://pbs.twimg.com/media/GhJ_shQW8AAC8LA.jpg"
            alt="Herta"
            className="w-16 h-16 rounded-full object-cover md:hidden"
          />
        </div>

        {/* Area History Chat */}
        <div className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth px-3 md:px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[85%] md:max-w-[75%]
                  px-4 py-2.5 rounded-2xl text-sm leading-relaxed backdrop-blur-md
                  ${
                    msg.role === "user"
                      ? "bg-blue-500/80 text-white rounded-br-sm"
                      : "bg-white/10 text-gray-100 rounded-bl-sm"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 px-3 md:px-4 py-3 border-t border-white/10 bg-gray-900">
          <div className="flex items-center gap-2 bg-white/5 rounded-2xl px-3 py-2 border border-white/10 focus-within:border-blue-500/50 transition">
            <input
              ref={inputRef}
              className="flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none py-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya Herta..."
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
              disabled={!input.trim()}
              className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition
                ${
                  input.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-400"
                    : "bg-white/5 text-gray-600"
                }
              `}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== KOLOM PROFIL — hanya desktop ===== */}
      <ProfileBar />
    </>
  );
}
