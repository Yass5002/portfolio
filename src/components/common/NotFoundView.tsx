"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundView() {
  const router = useRouter();

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 88px)", overflow: "hidden" }}>
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-10 text-center">
        <div className="mb-[18px] flex items-center justify-center">
          <span
            className="font-main font-bold"
            style={{
              fontSize: "clamp(72px, 16vw, 180px)",
              lineHeight: 1,
              letterSpacing: "-4px",
              color: "var(--foreground)",
            }}
          >
            404
          </span>
        </div>

        <h1
          className="font-main mb-[14px] font-bold"
          style={{
            fontSize: "38px",
            letterSpacing: "-1px",
            color: "var(--foreground)",
          }}
        >
          Page not found
        </h1>
        <p
          className="max-w-[440px] leading-[1.7]"
          style={{ fontSize: "17px", color: "var(--muted-foreground)", marginBottom: "26px" }}
        >
          The requested page has been deleted, or the address was typed incorrectly.
          <br />
          Please return to the main page using the button below.
        </p>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            className="action-btn"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "16px 28px",
              borderRadius: "10px",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "none" }}
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
            </svg>
            Back to Home
          </Link>
          <button
            onClick={() => router.back()}
            className="action-btn"
            style={{
              cursor: "pointer",
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "16px 28px",
              borderRadius: "10px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            ← Go Back
          </button>
        </div>
      </main>
    </div>
  );
}
