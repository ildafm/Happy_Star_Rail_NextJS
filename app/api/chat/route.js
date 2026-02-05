import { GoogleGenerativeAI } from "@google/generative-ai";
import { HERTA_SYSTEM_PROMPT } from "@/app/libs/hertaBotPrompt";
import { getHSRContext } from "@/app/libs/getHSRContext";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;

    const context = await getHSRContext(message);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_VERSION,
      systemInstruction: HERTA_SYSTEM_PROMPT,
    });

    const result = await model.generateContent(`
KONTEN DATA:
${context}

PERTANYAAN USER:
${message}
`);

    return new Response(
      JSON.stringify({
        reply: result.response.text(),
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        reply: "Terjadi kesalahan sistem. Herta tidak peduli.",
      }),
      { status: 500 }
    );
  }
}
