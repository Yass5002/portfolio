import { HeroSliderSkeleton } from "@/components/ui/HeroSliderSkeleton";
import { ProjectMetaSkeleton } from "@/components/ui/ProjectMetaSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DetailLoading() {
  return (
    <main>
      <div className="detail-inner">
        <Skeleton
          style={{ width: "200px", height: "22px", marginBottom: "22px" }}
        />

        <HeroSliderSkeleton />

        <ProjectMetaSkeleton />

        <div style={{ marginTop: "56px" }}>
          <Skeleton
            style={{
              width: "220px",
              height: "30px",
              marginBottom: "24px",
              borderRadius: "12px",
            }}
          />

          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                padding: "26px 28px",
                background: "rgba(255,255,255,.5)",
                border: "1px solid rgba(255,255,255,.8)",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <Skeleton
                  variant="circle"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                />
                <Skeleton style={{ width: "45%", height: "22px" }} />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "9px" }}
              >
                <Skeleton style={{ width: "100%", height: "15px" }} />
                <Skeleton style={{ width: "88%", height: "15px" }} />
                <Skeleton style={{ width: "72%", height: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
