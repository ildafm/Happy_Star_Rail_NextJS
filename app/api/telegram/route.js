// api for bot herta on telegram

import { BOT_CONFIGS } from "@/app/libs/botConfigs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const config = BOT_CONFIGS.herta;

function hasKeyword(message, keywords) {
  if (!keywords || keywords.length === 0) return false;
  const lower = message.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

async function sendTelegram(chatId, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}

// ===== MEMORY + TTL =====
const MAX_HISTORY = 10;
const TTL_MS = 30 * 60 * 1000;

const conversationStore = new Map();

function getSession(key) {
  const session = conversationStore.get(key);
  if (!session) return [];
  return session.history;
}

function addToSession(key, role, text) {
  const now = Date.now();
  const session = conversationStore.get(key) || {
    history: [],
    lastActive: now,
  };

  session.history.push({ role, text });
  if (session.history.length > MAX_HISTORY) {
    session.history.splice(0, session.history.length - MAX_HISTORY);
  }
  session.lastActive = now;

  conversationStore.set(key, session);
}

function deleteSession(key) {
  conversationStore.delete(key);
}

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [key, session] of conversationStore.entries()) {
    if (now - session.lastActive > TTL_MS) {
      conversationStore.delete(key);
    }
  }
}

function getSessionKey(message) {
  const chatType = message.chat.type;
  const chatId = message.chat.id;
  const userId = message.from?.id;

  if (chatType === "private") {
    return `private_${chatId}`;
  } else {
    return `group_${chatId}_${userId}`;
  }
}

// ===== BARU: Ambil file dari Telegram lalu convert ke base64 =====
async function getImageAsBase64(fileId) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  // 1. Dapatkan path file dari Telegram
  const fileRes = await fetch(
    `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`,
  );
  const fileData = await fileRes.json();

  if (!fileData.ok) throw new Error("Gagal mendapatkan file dari Telegram");

  const filePath = fileData.result.file_path;

  // 2. Download file sebagai buffer
  const imageRes = await fetch(
    `https://api.telegram.org/file/bot${token}/${filePath}`,
  );

  if (!imageRes.ok) throw new Error("Gagal mendownload file dari Telegram");

  // 3. Convert ke base64 — tidak disimpan ke disk, langsung dipakai
  const arrayBuffer = await imageRes.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  // Deteksi MIME type dari ekstensi file
  const ext = filePath.split(".").pop().toLowerCase();
  const mimeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
  };
  const mimeType = mimeMap[ext] || "image/jpeg";

  return { base64, mimeType };
}

export async function POST(req) {
  let chatId = null;

  cleanupExpiredSessions();

  try {
    const body = await req.json();

    const message = body?.message;

    // ===== BARU: Cek apakah ada teks, photo, atau document =====
    const hasText = message?.text;
    const hasPhoto = message?.photo;
    const hasDocument =
      message?.document && message.document.mime_type?.startsWith("image/");

    if (!message || (!hasText && !hasPhoto && !hasDocument)) {
      return new Response("OK", { status: 200 });
    }

    chatId = message.chat.id;
    const userText = message.text || message.caption || ""; // caption = teks saat kirim foto
    const sessionKey = getSessionKey(message);
    const isGroup = message.chat.type !== "private";

    // ===== HANDLE COMMANDS =====
    if (userText.startsWith("/")) {
      const responses = {
        "/start":
          "Unit Herta aktif.\n\nAturan:\n— Jangan buang waktu Herta dengan pertanyaan bodoh\n— Herta akan menjawab jika dianggap layak\n— Jangan berharap Herta bersikap ramah\n\nSekarang, ada apa?",
        "/help":
          "Kau butuh bantuan hanya untuk berbicara dengan Herta? Menyedihkan.\n\nCukup ketik pertanyaanmu. Herta akan memutuskan apakah itu layak dijawab.",
        "/about":
          "Aku adalah unit robot Herta dari Herta Space Station. Dibuat menyerupai sang Genius itu sendiri.\n\nAnggota ke-83 Genius Society. Emanator Nous. Pencipta Simulated Universe.\n\nCukup sudah perkenalannya.",
        "/ping":
          "[Peringatan Sistem] Terjadi kesalahan sistem. Dan tebak? Herta tidak peduli. Kembali lagi nanti.",
        "/reset": null,
      };

      if (userText === "/reset") {
        deleteSession(sessionKey);
        const resetMsg = isGroup
          ? "Memori percakapanmu di group ini dihapus. Herta tidak mengingatmu lagi."
          : "Memori percakapan dihapus. Herta tidak mengingatmu lagi.";
        await sendTelegram(chatId, resetMsg);
        return new Response("OK", { status: 200 });
      }

      const reply =
        responses[userText] ??
        "Herta tidak mengenali perintah itu. Cukup bicara saja.";
      await sendTelegram(chatId, reply);
      return new Response("OK", { status: 200 });
    }

    // ===== DI GROUP: hanya respon jika di-mention atau reply ke bot =====
    if (isGroup) {
      const botUsername = process.env.TELEGRAM_BOT_USERNAME;
      const isMentioned = botUsername && userText.includes(`@${botUsername}`);
      const isReplyToBot = message.reply_to_message?.from?.is_bot === true;

      if (!isMentioned && !isReplyToBot) {
        return new Response("OK", { status: 200 });
      }
    }

    // ===== PROSES KE GEMINI =====
    const history = getSession(sessionKey);

    const needsContext = hasKeyword(userText, config.keywords);
    const context =
      needsContext && config.getContext
        ? await config.getContext(userText)
        : null;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_VERSION,
      systemInstruction: config.systemPrompt,
      generationConfig: {
        thinkingConfig: {
          thinkingBudget: 0, // 0 = thinking dimatikan (lebih cepat & hemat token)
          // thinkingBudget: 1024 // aktifkan kalau mau bot lebih "dalam" mikir
        },
      },
    });

    const geminiHistory = history
      .filter((msg) => msg.text.trim() !== "")
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

    while (geminiHistory.length > 0 && geminiHistory[0].role !== "user") {
      geminiHistory.shift();
    }

    const chat = model.startChat({ history: geminiHistory });

    // ===== BARU: Susun prompt — bisa teks saja, image saja, atau keduanya =====
    const promptParts = [];

    // Tambahkan image jika ada
    if (hasPhoto || hasDocument) {
      // Telegram selalu kirim array foto dengan resolusi berbeda; ambil yang terbesar (terakhir)
      const fileId = hasPhoto
        ? message.photo[message.photo.length - 1].file_id
        : message.document.file_id;

      const { base64, mimeType } = await getImageAsBase64(fileId);

      promptParts.push({
        inlineData: {
          mimeType,
          data: base64, // langsung pakai, tidak disimpan
        },
      });
    }

    // Tambahkan teks / context
    let textPrompt = userText || "Deskripsikan gambar ini.";
    if (context) {
      textPrompt = `KONTEN DATA (gunakan ini jika relevan):\n${context}\n\nPERTANYAAN USER:\n${textPrompt}`;
    }
    promptParts.push({ text: textPrompt });

    const result = await chat.sendMessage(promptParts);
    const reply = result.response.text();

    // Simpan ke history hanya teksnya (image tidak perlu disimpan)
    const historyText =
      hasPhoto || hasDocument
        ? `[mengirim gambar] ${userText || ""}`.trim()
        : userText;

    addToSession(sessionKey, "user", historyText);
    addToSession(sessionKey, "bot", reply);

    await sendTelegram(chatId, reply);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Telegram webhook error:", err.message);
    if (chatId) {
      try {
        await sendTelegram(chatId, config.errorMessage);
      } catch (telegramErr) {
        console.error("Gagal mengirim pesan error:", telegramErr.message);
      }
    }
    return new Response("OK", { status: 200 });
  }
}
