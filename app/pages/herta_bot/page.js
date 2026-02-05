"use client";

import { useEffect, useRef, useState } from "react";
import ProfileBar from "./components/ProfileBar";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

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
      {/* Tengah - Chat */}
      <section className="flex flex-col flex-1 mx-auto p-4 bg-gray-900 overflow-hidden">
        <h1 className="text-xl font-bold mb-4 text-center">
          🤖 Herta Support Unit
        </h1>

        {/* History chat */}
        <div className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth space-y-3 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
          backdrop-blur-md
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

        {/* Input chat */}
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanya Herta soal HSR..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            className="bg-black text-white px-4 rounded"
            onClick={sendMessage}
          >
            Kirim
          </button>
        </div>
      </section>

      {/* Kanan - Profile */}
      <ProfileBar />
    </>
  );
}
