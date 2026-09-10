"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { projectsFeatured } from "@/data/portfolio";
import type { Project, ProjectLink, ProjectType } from "@/data/portfolio";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaGithub } from "react-icons/fa";

const TYPE_CLASS: Record<ProjectType, string> = {
  "Side Project": "project-type-side",
  "Open Source": "project-type-bootcamp",
  "Client Project": "project-type-company",
  "Personal": "project-type-personal",
};

function ProjectCard({ project }: { project: Project }) {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const cardHref = project.path ?? project.links?.[0]?.href;
  const isExternal = !project.path;
  const externalProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const thumb = (
    <div className="project-thumb">
      {!thumbLoaded && (
        <Skeleton
          style={{ position: "absolute", inset: 0, borderRadius: 0 }}
        />
      )}
      <Image
        src={project.thumb}
        fill
        sizes="(max-width: 900px) 100vw, 548px"
        style={{
          objectFit: "cover",
          objectPosition: "top",
          opacity: thumbLoaded ? 1 : 0,
          transition: "opacity .3s ease",
        }}
        className="object-cover object-top"
        alt={project.title}
        onLoad={() => setThumbLoaded(true)}
      />
    </div>
  );

  return (
    <div className="project-card">
      {cardHref ? (
        <Link
          href={cardHref}
          className="project-card-link"
          aria-hidden="true"
          tabIndex={-1}
          {...externalProps}
        >
          {thumb}
        </Link>
      ) : (
        thumb
      )}
      <div className="project-body">
        {project.type && (
          <div className={`project-type-badge ${TYPE_CLASS[project.type]}`}>
            {project.type}
          </div>
        )}
        <div className="project-title-row">
          <span className="project-title">{project.title}</span>
          <span className="project-en">{project.en}</span>
        </div>
        <p className="project-desc">{project.desc}</p>
        <div className="project-links">
          {project.path && (
            <Link className="project-detail-btn" href={project.path}>
              View Details →
            </Link>
          )}
          {project.links?.map((link: ProjectLink, i: number) => {
            const isGitHub = link.label.toLowerCase().includes("github");
            return (
              <Link
                key={i}
                className="project-link no-underline text-inherit"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isGitHub && <FaGithub size={14} />}
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio">
      <div className="portfolio-inner">
        <div className="portfolio-header">
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projectsFeatured.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
