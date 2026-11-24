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

const MAX_MESSAGES = 12; // only the latest turns are sent upstream
const MAX_CONTENT_CHARS = 2000;
const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT = 10; // requests per minute per IP
const ALLOWED_ORIGIN_HOSTS = new Set(["yssn.tech", "www.yssn.tech", "localhost"]);

// Per-instance limiter. Vercel reuses warm instances, so this stops bursts.
const hits = new Map<string, { count: number; resetAt: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  let entry = hits.get(ip);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + 60_000 };
    hits.set(ip, entry);
  }
  entry.count += 1;
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (now >= v.resetAt) hits.delete(k);
    });
  }
  return entry.count > RATE_LIMIT;
}

function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_ORIGIN_HOSTS.has(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
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

    if (!originAllowed(req)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "You're sending messages too fast. Please wait a minute and try again 😊" },
        { status: 429 }
      );
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Message too long." }, { status: 413 });
    }
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }
    const messages =
      typeof body === "object" && body !== null
        ? (body as { messages?: unknown }).messages
        : undefined;

    if (!isValidMessages(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 400 }
      );
    }

    if (messages.some((m) => (m.role !== "user" && m.role !== "assistant") || m.content.length > MAX_CONTENT_CHARS)) {
      return NextResponse.json(
        { error: `Please keep messages under ${MAX_CONTENT_CHARS} characters.` },
        { status: 400 }
      );
    }

    const contents = messages.slice(-MAX_MESSAGES).map((m) => ({
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
