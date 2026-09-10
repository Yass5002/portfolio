import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PROJECT_DETAIL_DATA } from "@/data/projectDetails";
import type {
  ProjectFeatureNumType,
  ProjectFeatureNotNumType,
} from "@/data/projectDetails";
import HeroSlider from "@/components/detail/HeroSlider";
import ProjectMeta from "@/components/detail/ProjectMeta";
import FeatureSection from "@/components/detail/FeatureNumTypeSection";
import FeatureNotNumTypeSection from "@/components/detail/FeatureNotNumTypeSection";
import TroubleshootingSection from "@/components/detail/TroubleshootingSection";
import { FadeIn } from "@/components/ui/FadeIn";

function isNumType(
  features: ProjectFeatureNumType[] | ProjectFeatureNotNumType[],
): features is ProjectFeatureNumType[] {
  return features.length === 0 || "title" in features[0];
}

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAIL_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = PROJECT_DETAIL_DATA[params.slug];
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Yassine El Ouazzani`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Yassine El Ouazzani`,
      description: project.description,
      images: project.images[0] ? [project.images[0]] : [],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = PROJECT_DETAIL_DATA[params.slug];
  if (!project) notFound();

  return (
    <main>
      <div className="detail-inner">
        <Link href="/#portfolio" className="detail-back">
          <span className="detail-back-icon">←</span>
          Back to Projects
        </Link>

        <FadeIn>
          <HeroSlider images={project.images} title={project.title} />
        </FadeIn>

        <FadeIn delay={0.1}>
          <ProjectMeta project={project} />
        </FadeIn>

        {project.features &&
          project.features.length > 0 &&
          (isNumType(project.features) ? (
            <FadeIn delay={0.1}>
              <FeatureSection features={project.features} />
            </FadeIn>
          ) : (
            <FadeIn delay={0.1}>
              <FeatureNotNumTypeSection features={project.features} />
            </FadeIn>
          ))}

        {project.troubleshooting && project.troubleshooting.length > 0 && (
          <FadeIn delay={0.1}>
            <TroubleshootingSection troubleshooting={project.troubleshooting} />
          </FadeIn>
        )}

        <FadeIn>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            <Link href="/#portfolio" className="detail-btn-back">
              ← Back to Projects
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
