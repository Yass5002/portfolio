import { Skeleton } from "@/components/ui/Skeleton";

export function HeroSliderSkeleton() {
  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "var(--card)",
        border: "1px solid var(--border)",
        padding: "12px",
      }}
    >
      <Skeleton
        style={{
          borderRadius: "20px",
          height: "460px",
          width: "100%",
          background: "var(--border)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "9px",
          padding: "14px 0 6px",
        }}
      >
        {[26, 9, 9].map((w, i) => (
          <Skeleton
            key={i}
            style={{
              width: `${w}px`,
              height: "9px",
              borderRadius: "6px",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
