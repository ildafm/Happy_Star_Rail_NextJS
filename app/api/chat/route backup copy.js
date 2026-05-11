// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { HERTA_SYSTEM_PROMPT } from "@/app/libs/hertaBotPrompt";
// import { getMadamHertaProfile } from "@/app/libs/getMadamHertaProfile";

// const HERTA_KEYWORDS = [
//   "herta",
//   "madam",
//   "nyonya",
//   "stasiun",
//   "space station",
//   "genius society",
//   "simulated universe",
//   "boneka",
//   "doll",
//   "erudition",
//   "nous",
//   "emanator",
//   "kuru",
//   "asta",
//   "ruan mei",
//   "screwllum",
//   "kemampuan",
//   "skill",
//   "ability",
//   "element",
//   "elemen",
//   "path",
//   "lore",
//   "profil",
//   "karakter",
// ];

// function isHertaRelated(message) {
//   const lower = message.toLowerCase();
//   return HERTA_KEYWORDS.some((keyword) => lower.includes(keyword));
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const message = body.message;
//     const history = body.history || [];

//     const needsData = isHertaRelated(message);
//     const context = needsData ? await getMadamHertaProfile(message) : null;

//     const genAI = new GoogleGenerativeAI(
//       process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//     );
//     const model = genAI.getGenerativeModel({
//       model: process.env.NEXT_PUBLIC_GEMINI_VERSION,
//       systemInstruction: HERTA_SYSTEM_PROMPT,
//     });

//     const geminiHistory = history
//       .filter((msg) => msg.text.trim() !== "")
//       .map((msg) => ({
//         role: msg.role === "user" ? "user" : "model",
//         parts: [{ text: msg.text }],
//       }));

//     // Potong dari depan sampai role pertama adalah "user"
//     while (geminiHistory.length > 0 && geminiHistory[0].role !== "user") {
//       geminiHistory.shift();
//     }

//     // Buat chat session dengan history
//     const chat = model.startChat({
//       history: geminiHistory,
//     });

//     const prompt = context
//       ? `KONTEN DATA (gunakan ini jika relevan):\n${context}\n\nPERTANYAAN USER:\n${message}`
//       : message;

//     const result = await chat.sendMessageStream(prompt);

//     const stream = new ReadableStream({
//       async start(controller) {
//         for await (const chunk of result.stream) {
//           const text = chunk.text();
//           if (text) {
//             controller.enqueue(new TextEncoder().encode(text));
//           }
//         }
//         controller.close();
//       },
//     });

//     return new Response(stream, {
//       status: 200,
//       headers: {
//         "Content-Type": "text/plain; charset=utf-8",
//         "Transfer-Encoding": "chunked",
//         "X-Content-Type-Options": "nosniff",
//       },
//     });
//   } catch (err) {
//     console.error("Herta API error:", err.message);
//     return new Response("Terjadi kesalahan sistem. Herta tidak peduli.", {
//       status: 500,
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });
//   }
// }
