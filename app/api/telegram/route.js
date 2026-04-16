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
  let chatId = null;

  try {
    const body = await req.json();

    const message = body?.message;
    if (!message || !message.text) {
      return new Response("OK", { status: 200 });
    }

    chatId = message.chat.id;
    const userText = message.text;

    // handle custom command bot tanpa gemini api
    // Handle semua command (diawali "/")
    if (userText.startsWith("/")) {
      const responses = {
        "/start":
          "Unit Herta aktif.\n\nAturan:\n— Jangan buang waktu Herta dengan pertanyaan bodoh\n— Herta akan menjawab jika dianggap layak\n— Jangan berharap Herta bersikap ramah\n\nSekarang, ada apa?",
        "/help":
          "Kau butuh bantuan hanya untuk berbicara dengan Herta? Menyedihkan.\n\nCukup ketik pertanyaanmu. Herta akan memutuskan apakah itu layak dijawab.",
        "/about":
          "Aku adalah unit robot Herta dari Herta Space Station. Dibuat menyerupai sang Genius itu sendiri.\n\nAnggota ke-83 Genius Society. Emanator Nous. Pencipta Simulated Universe.\n\nCukup sudah perkenalannya.",
      };

      const reply =
        responses[userText] ??
        "Herta tidak mengenali perintah itu. Cukup bicara saja.";
      await sendTelegram(chatId, reply);
      return new Response("OK", { status: 200 });
    }

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

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    await sendTelegram(chatId, reply);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Telegram webhook error:", err.message);

    if (chatId) {
      try {
        await sendTelegram(
          chatId,
          "Terjadi kesalahan sistem, Herta tidak peduli.",
        );
      } catch (telegramErr) {
        console.error("Gagal mengirim pesan error Herta:", telegramErr.message);
      }
    }

    return new Response("OK", { status: 200 }); // selalu 200 agar Telegram tidak spam retry
  }
}
