import { GoogleGenerativeAI } from "@google/generative-ai";
import { HERTA_SYSTEM_PROMPT } from "@/app/libs/hertaBotPrompt";
import { getMadamHertaProfile } from "@/app/libs/getMadamHertaProfile";

const HERTA_KEYWORDS = [
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
];

function isHertaRelated(message) {
  const lower = message.toLowerCase();
  return HERTA_KEYWORDS.some((keyword) => lower.includes(keyword));
}

async function sendTelegram(chatId, text) {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown", // opsional, kalau Herta balas pakai formatting
    }),
  });
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Ambil pesan dari update Telegram
    const message = body?.message;
    if (!message || !message.text) {
      return new Response("OK", { status: 200 }); // abaikan non-text (sticker, foto, dll)
    }

    const chatId = message.chat.id;
    const userText = message.text;

    // Proses sama seperti route chat biasa
    const needsData = isHertaRelated(userText);
    const context = needsData ? await getMadamHertaProfile(userText) : null;

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    );
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_GEMINI_VERSION,
      systemInstruction: HERTA_SYSTEM_PROMPT,
    });

    const prompt = context
      ? `KONTEN DATA (gunakan ini jika relevan):\n${context}\n\nPERTANYAAN USER:\n${userText}`
      : `PERTANYAAN USER:\n${userText}`;

    // Telegram tidak support streaming, pakai generateContent biasa
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    await sendTelegram(chatId, reply);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Telegram webhook error:", err.message);
    return new Response("OK", { status: 200 }); // selalu 200 ke Telegram
  }
}
