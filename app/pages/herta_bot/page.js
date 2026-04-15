"use client";

import { useEffect, useRef, useState } from "react";
import ProfileBar from "./components/ProfileBar";
import { Send } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Herta sibuk, apa yang kau inginkan?" },
  ]);
  const [isStreaming, setIsStreaming] = useState(false); // ← TAMBAH

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

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
        body: JSON.stringify({ message: userMsg }),
      });

      // Tambah placeholder bot kosong dulu
      setMessages((prev) => [...prev, { role: "bot", text: "" }]);
      setIsLoading(false);

      // ← Cek status response dulu
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
          await new Promise((resolve) => setTimeout(resolve, 15)); // 15, 30, 50
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

      setIsStreaming(false); // ← selesai streaming
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Terjadi kesalahan sistem. Herta tidak peduli." },
      ]);
    }
  }

  return (
    <>
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

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth px-3 md:px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                {/* Cursor kedip di pesan bot terakhir yang masih streaming */}
                {msg.text}
                {msg.role === "bot" &&
                  i === messages.length - 1 &&
                  isStreaming && // ← ganti kondisi ini
                  msg.text !== "Herta sibuk, apa yang kau inginkan?" && (
                    <span className="inline-block w-0.5 h-3.5 bg-gray-400 ml-0.5 align-middle animate-pulse" />
                  )}
              </div>
            </div>
          ))}

          {/* Loading dots — muncul sebelum stream mulai */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
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
              disabled={!input.trim() || isLoading}
              className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition
                ${
                  input.trim() && !isLoading
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

      <ProfileBar />
    </>
  );
}
