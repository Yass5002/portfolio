import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import type {
  ProjectDetailData,
  ProjectDetailLink,
} from "@/data/projectDetails";

interface ProjectMetaProps {
  project: ProjectDetailData;
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: string;
  accent?: "blue" | "coral";
}) {
  const chipStyle: React.CSSProperties = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    color: "var(--muted-foreground)",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
      <span
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "68px",
          padding: "6px 12px",
          borderRadius: "10px",
          fontSize: "12.5px",
          fontWeight: 600,
          ...chipStyle,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "15px",
          color: "var(--muted-foreground)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function LinkChip({ link }: { link: ProjectDetailLink }) {
  const isGitHub = link.label.toLowerCase().includes("github");
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`detail-link-chip ${isGitHub ? "github" : "live"}`}
    >
      {isGitHub && <FaGithub size={14} />}
      {link.label}
    </Link>
  );
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div style={{ marginTop: "34px" }}>
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 600,
          letterSpacing: "-1px",
          color: "var(--foreground)",
          marginBottom: "20px",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          marginBottom: "20px",
        }}
      >
        <MetaRow label="Period" value={project.period} />
        <MetaRow label="Team" value={project.members} />
        {project.contribution && (
          <MetaRow label="Contribution" value={project.contribution} />
        )}
        {project.role && (
          <MetaRow label="Role" value={project.role} />
        )}
      </div>

      <p
        style={{
          fontSize: "17px",
          lineHeight: 1.75,
          color: "var(--muted-foreground)",
          maxWidth: "680px",
          marginBottom: "22px",
          wordBreak: "keep-all",
        }}
      >
        {project.description}
      </p>

      {project.siteNote && (
        <p
          style={{
            fontSize: "13px",
            color: "var(--muted-foreground)",
            marginTop: "-14px",
            marginBottom: "22px",
          }}
        >
          {project.siteNote}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
          marginBottom: "22px",
        }}
      >
        {project.stacks.map((stack) => (
          <span
            key={stack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 15px",
              borderRadius: "10px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            {stack}
          </span>
        ))}
      </div>

      {project.links && project.links.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {project.links.map((link) => (
            <LinkChip key={link.label} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
