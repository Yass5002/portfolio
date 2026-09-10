import Image from "next/image";
import type { ProjectTroubleshooting } from "@/data/projectDetails";
import PrBadge from "./PrBadge";
import SubList from "./SubList";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";

function TroubleshootingCard({ trouble }: { trouble: ProjectTroubleshooting }) {
  return (
    <GlassCard>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        <h3
          style={{
            fontSize: "21px",
            fontWeight: 600,
            color: "var(--foreground)",
            margin: 0,
            lineHeight: 1.4,
            wordBreak: "keep-all",
          }}
        >
          {trouble.title}
        </h3>
        {trouble.pr && <PrBadge href={trouble.pr} />}
      </div>

      {trouble.image && (
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "22px",
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <Image
            src={trouble.image.src}
            width={1440}
            height={720}
            alt={trouble.image.alt}
            className="detail-feat-img"
          />
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <SubList dotColor="var(--muted-foreground)" label="Problem Discovery" items={trouble.found} />
        <SubList dotColor="var(--muted-foreground)" label="Solution Process" items={trouble.process} />

        {trouble.code && (
          <pre
            style={{
              margin: "2px 0",
              padding: "18px 20px",
              borderRadius: "20px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
              fontFamily: "'SFMono-Regular', ui-monospace, monospace",
              fontSize: "13px",
              lineHeight: 1.7,
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
            <code>{trouble.code.code}</code>
          </pre>
        )}

        <SubList dotColor="var(--muted-foreground)" label="Result" items={trouble.result} />

        <div
          style={{
            borderRadius: "20px",
            padding: "16px 18px",
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "9px",
            }}
          >
            <span style={{ fontSize: "14px" }}>💡</span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--foreground)",
              }}
            >
              Lessons Learned
            </span>
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {trouble.lesson.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "8px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--muted-foreground)",
                  }}
                />
                <span
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.65,
                    color: "var(--foreground)",
                    wordBreak: "keep-all",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}

interface TroubleshootingSectionProps {
  troubleshooting: ProjectTroubleshooting[];
}

export default function TroubleshootingSection({
  troubleshooting,
}: TroubleshootingSectionProps) {
  if (troubleshooting.length === 0) return null;

  return (
    <section style={{ marginTop: "56px" }}>
      <SectionHeading>Troubleshooting</SectionHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {troubleshooting.map((t, i) => (
          <TroubleshootingCard key={i} trouble={t} />
        ))}
      </div>
    </section>
  );
}
