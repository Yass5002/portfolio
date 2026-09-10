import type { CSSProperties, ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function GlassCard({ children, style }: GlassCardProps) {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "30px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
