import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { systemPrompt } from "@/lib/prompts/systemPrompt";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isValidMessages(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as ChatMessage).role === "string" &&
        typeof (item as ChatMessage).content === "string"
    )
  );
}

const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-flash-latest",
];

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is currently not configured." },
        { status: 500 }
      );
    }

    const body: unknown = await req.json();
    const messages =
      typeof body === "object" && body !== null
        ? (body as { messages?: unknown }).messages
        : undefined;

    if (!isValidMessages(messages)) {
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 400 }
      );
    }

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    let reply: string | null = null;
    let lastError: string | null = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            contents,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            reply = text;
            break;
          }
        } else {
          const status = res.status;
          const errText = await res.text();
          lastError = `Model ${model} returned ${status}: ${errText}`;
          console.warn(lastError);
        }
      } catch (err) {
        lastError = String(err);
        console.warn(`Failed calling ${model}:`, err);
      }
    }

    if (!reply) {
      return NextResponse.json(
        {
          error:
            "Bubble is currently receiving high traffic. Please try again shortly or contact Yassine at yassacerman@gmail.com 😊",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "A temporary error occurred. Please try again shortly." },
      { status: 500 }
    );
  }
}
