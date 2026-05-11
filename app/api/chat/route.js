import { BOT_CONFIGS, DEFAULT_CONFIG } from "@/app/libs/botConfigs";
import { GoogleGenerativeAI } from "@google/generative-ai";

function hasKeyword(message, keywords) {
  if (!keywords || keywords.length === 0) return false;
  const lower = message.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export async function POST(req) {
  let config = DEFAULT_CONFIG;

  try {
    const body = await req.json();
    const { message, botId, history = [] } = body;

    // Pilih config berdasarkan botId, fallback ke default
    config = BOT_CONFIGS[botId] ?? DEFAULT_CONFIG;

    // Ambil context tambahan kalau relevan
    const needsContext = hasKeyword(message, config.keywords);
    const context =
      needsContext && config.getContext
        ? await config.getContext(message)
        : null;

    // Init Gemini
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    );
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_GEMINI_VERSION,
      systemInstruction: config.systemPrompt,
    });

    // Susun history, pastikan mulai dari "user"
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

    const prompt = context
      ? `KONTEN DATA (gunakan ini jika relevan):\n${context}\n\nPERTANYAAN USER:\n${message}`
      : message;

    const result = await chat.sendMessageStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err.message);
    return new Response(config.errorMessage, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
