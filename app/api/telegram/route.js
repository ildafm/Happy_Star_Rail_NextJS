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
      parse_mode: "Markdown",
    }),
  });
}

// ← Simpan history per chatId, max 10 pesan (5 pasang)
const conversationHistory = new Map();
const MAX_HISTORY = 10;

function getHistory(chatId) {
  return conversationHistory.get(chatId) || [];
}

function addToHistory(chatId, role, text) {
  const history = getHistory(chatId);
  history.push({ role, text });

  // Potong jika lebih dari MAX_HISTORY
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }

  conversationHistory.set(chatId, history);
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

    // Handle command — tidak perlu masuk history
    if (userText.startsWith("/")) {
      const responses = {
        "/start":
          "Unit Herta aktif.\n\nAturan:\n— Jangan buang waktu Herta dengan pertanyaan bodoh\n— Herta akan menjawab jika dianggap layak\n— Jangan berharap Herta bersikap ramah\n\nSekarang, ada apa?",
        "/help":
          "Kau butuh bantuan hanya untuk berbicara dengan Herta? Menyedihkan.\n\nCukup ketik pertanyaanmu. Herta akan memutuskan apakah itu layak dijawab.",
        "/about":
          "Aku adalah unit robot Herta dari Herta Space Station. Dibuat menyerupai sang Genius itu sendiri.\n\nAnggota ke-83 Genius Society. Emanator Nous. Pencipta Simulated Universe.\n\nCukup sudah perkenalannya.",
        "/ping":
          "[Peringatan Sistem] Terjadi kesalahan sistem. Dan tebak? Herta tidak peduli.",
        "/reset": null, // ← khusus, tangani di bawah
      };

      // Command reset — hapus history user ini
      if (userText === "/reset") {
        conversationHistory.delete(chatId);
        await sendTelegram(
          chatId,
          "Memori percakapan dihapus. Herta tidak mengingatmu lagi.",
        );
        return new Response("OK", { status: 200 });
      }

      const reply =
        responses[userText] ??
        "Herta tidak mengenali perintah itu. Cukup bicara saja.";
      await sendTelegram(chatId, reply);
      return new Response("OK", { status: 200 });
    }

    // Ambil history user ini
    const history = getHistory(chatId);

    const needsData = isHertaRelated(userText);
    const context = needsData ? await getMadamHertaProfile(userText) : null;

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    );
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_GEMINI_VERSION,
      systemInstruction: HERTA_SYSTEM_PROMPT,
    });

    // Konversi history ke format Gemini
    const geminiHistory = history
      .filter((msg) => msg.text.trim() !== "")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

    const chat = model.startChat({ history: geminiHistory });

    const prompt = context
      ? `KONTEN DATA (gunakan ini jika relevan):\n${context}\n\nPERTANYAAN USER:\n${userText}`
      : userText;

    const result = await chat.sendMessage(prompt);
    const reply = result.response.text();

    // Simpan ke history setelah dapat balasan
    addToHistory(chatId, "user", userText);
    addToHistory(chatId, "bot", reply);

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
        console.error("Gagal mengirim pesan error:", telegramErr.message);
      }
    }
    return new Response("OK", { status: 200 });
  }
}
