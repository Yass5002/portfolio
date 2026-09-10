import type { ProjectFeatureNotNumType } from "@/data/projectDetails";
import SubList from "./SubList";
import GlassCard from "./GlassCard";
import SectionHeading from "./SectionHeading";

function FeatureCard({ feature }: { feature: ProjectFeatureNotNumType }) {
  return (
    <GlassCard>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <SubList
          dotColor="var(--muted-foreground)"
          label="Key Contributions"
          items={feature.contributions}
        />

        <SubList dotColor="var(--muted-foreground)" label="Results" items={feature.result} />
      </div>
    </GlassCard>
  );
}

interface FeatureNotNumTypeSectionProps {
  features: ProjectFeatureNotNumType[];
}

export default function FeatureNotNumTypeSection({
  features,
}: FeatureNotNumTypeSectionProps) {
  if (features.length === 0) return null;

  return (
    <section style={{ marginTop: "56px" }}>
      <SectionHeading>Key Contributions & Results</SectionHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} />
        ))}
      </div>
    </section>
  );
}
