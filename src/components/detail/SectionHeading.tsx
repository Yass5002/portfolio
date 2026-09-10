import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2
      style={{
        fontSize: "30px",
        fontWeight: 600,
        letterSpacing: "-.6px",
        color: "var(--foreground)",
        marginBottom: "24px",
      }}
    >
      {children}
    </h2>
  );
}
