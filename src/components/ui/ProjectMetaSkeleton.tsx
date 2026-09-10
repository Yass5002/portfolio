import { Skeleton } from "@/components/ui/Skeleton";

function MetaRowSkeleton() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
      <Skeleton
        style={{
          width: "68px",
          height: "32px",
          borderRadius: "10px",
          flexShrink: 0,
        }}
      />
      <Skeleton style={{ width: "160px", height: "16px" }} />
    </div>
  );
}

export function ProjectMetaSkeleton() {
  return (
    <div style={{ marginTop: "34px" }}>
      <Skeleton
        style={{
          width: "55%",
          height: "42px",
          marginBottom: "24px",
          borderRadius: "12px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          marginBottom: "22px",
        }}
      >
        <MetaRowSkeleton />
        <MetaRowSkeleton />
        <MetaRowSkeleton />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          marginBottom: "24px",
        }}
      >
        <Skeleton style={{ width: "100%", height: "17px" }} />
        <Skeleton style={{ width: "92%", height: "17px" }} />
        <Skeleton style={{ width: "68%", height: "17px" }} />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "9px",
          marginBottom: "24px",
        }}
      >
        {[72, 60, 88, 64].map((w, i) => (
          <Skeleton
            key={i}
            style={{ width: `${w}px`, height: "38px", borderRadius: "10px" }}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <Skeleton
          style={{ width: "110px", height: "38px", borderRadius: "10px" }}
        />
        <Skeleton
          style={{ width: "90px", height: "38px", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
}
