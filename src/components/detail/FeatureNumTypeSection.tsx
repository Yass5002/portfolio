import Image from "next/image";
import type {
  ProjectFeatureNumType,
  DetailItem,
  DetailItemCode,
  DetailItemImage,
} from "@/data/projectDetails";
import PrBadge from "./PrBadge";
import SectionHeading from "./SectionHeading";

function CodeBlock({ item }: { item: DetailItemCode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "13px 18px",
            background: "#141521",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginRight: "6px",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ff5f57",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ffbd2e",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#28c840",
                flexShrink: 0,
              }}
            />
          </span>
          <span
            style={{
              padding: "4px 14px",
              borderRadius: "7px",
              background: "rgba(255,255,255,.08)",
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,.6)",
              fontFamily: "'SFMono-Regular', ui-monospace, monospace",
              letterSpacing: ".3px",
            }}
          >
            {item.language}
          </span>
        </div>

        <pre
          className="detail-feat-code"
          style={{
            margin: 0,
            padding: "22px 24px",
            background: "#1a1b2e",
            color: "#c8d3f5",
            fontFamily:
              "'SFMono-Regular', ui-monospace, 'Cascadia Code', monospace",
            fontSize: "13.5px",
            lineHeight: 1.75,
            whiteSpace: "pre",
            tabSize: 2,
          }}
        >
          <code>{item.code}</code>
        </pre>
      </div>

      <div
        style={{
          marginTop: "12px",
          padding: "14px 16px",
          borderRadius: "16px",
          background: "var(--card)",
          borderLeft: "3px solid var(--border)",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.7,
            color: "var(--muted-foreground)",
            wordBreak: "keep-all",
          }}
        >
          {item.alt}
        </p>
      </div>
    </div>
  );
}

function ImageBlock({ item }: { item: DetailItemImage }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--card)",
          padding: "6px",
        }}
      >
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            background: "var(--card)",
          }}
        >
          <Image
            src={item.src}
            width={1440}
            height={900}
            alt={item.alt}
            className="detail-feat-img"
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          padding: "0 4px",
        }}
      >
        <span
          style={{
            flexShrink: 0,
            marginTop: "5px",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--muted-foreground)",
            display: "inline-block",
          }}
        />
        <p
          style={{
            fontSize: "13.5px",
            lineHeight: 1.65,
            color: "var(--muted-foreground)",
            wordBreak: "keep-all",
          }}
        >
          {item.alt}
        </p>
      </div>
    </div>
  );
}

function FeatureNumTypeSection({ details }: { details: DetailItem[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        marginTop: "22px",
        paddingTop: "22px",
        borderTop: "1px solid var(--border)",
      }}
    >
      {details.map((item, i) =>
        item.type === "code" ? (
          <CodeBlock key={i} item={item} />
        ) : (
          <ImageBlock key={i} item={item} />
        ),
      )}
    </div>
  );
}

interface FeatureSectionProps {
  features: ProjectFeatureNumType[];
}

export default function FeatureSection({ features }: FeatureSectionProps) {
  if (features.length === 0) return null;

  return (
    <section style={{ marginTop: "56px" }}>
      <SectionHeading>Key Features</SectionHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              borderRadius: "20px",
              padding: "26px 28px",
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "var(--foreground)",
                  wordBreak: "keep-all",
                }}
              >
                {f.title}
              </h3>
              {f.pr &&
                (Array.isArray(f.pr) ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    {f.pr.map((href) => (
                      <PrBadge key={href} href={href} />
                    ))}
                  </div>
                ) : (
                  <PrBadge href={f.pr} />
                ))}
            </div>

            {f.details && f.details.length > 0 && (
              <FeatureNumTypeSection details={f.details} />
            )}

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "11px",
              }}
            >
              {f.items.map((item, j) => (
                <li
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "11px",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "8px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--muted-foreground)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "15.5px",
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
        ))}
      </div>
    </section>
  );
}
