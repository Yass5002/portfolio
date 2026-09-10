import type { ComponentType } from 'react';
import type { IconBaseProps } from 'react-icons';
import {
  SiKotlin,
  SiFlutter,
  SiDart,
  SiAndroid,
  SiGo,
  SiPython,
  SiFlask,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiTailwindcss,
  SiPostgresql,
  SiRedis,
  SiSqlite,
  SiSupabase,
  SiFirebase,
  SiLinux,
  SiDocker,
  SiGit,
  SiPostman,
  SiFigma,
  SiNotion,
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';
import { skills } from '@/data/portfolio';
import type { Skill } from '@/data/portfolio';

const SKILL_ICONS: Record<string, ComponentType<IconBaseProps>> = {
  Kotlin: SiKotlin,
  Flutter: SiFlutter,
  Dart: SiDart,
  Android: SiAndroid,
  Go: SiGo,
  Python: SiPython,
  Flask: SiFlask,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,
  "Tailwind CSS": SiTailwindcss,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  SQLite: SiSqlite,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Linux: SiLinux,
  Docker: SiDocker,
  Git: SiGit,
  Postman: SiPostman,
  Figma: SiFigma,
  Notion: SiNotion,
};

function SkillPill({ skill }: { skill: Skill }) {
  const Icon = SKILL_ICONS[skill.name];

  return (
    <div className="skill-pill">
      {Icon ? (
        <Icon size={18} className="shrink-0 text-foreground" />
      ) : (
        <span className="skill-dot" />
      )}
      <span className="skill-name">{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  const track1: Skill[] = [...skills, ...skills];
  const track2: Skill[] = [...[...skills].reverse(), ...[...skills].reverse()];

  return (
    <section id="skills">
      <div className="skills-header">
        <div className="section-label">Skills</div>
        <h2 className="section-title">Tech Stack</h2>
      </div>
      <div className="marquee-track-wrap">
        <div className="marquee-track">
          {track1.map((skill, i) => (
            <SkillPill key={i} skill={skill} />
          ))}
        </div>
      </div>
      <div className="marquee-track-wrap">
        <div className="marquee-track reverse">
          {track2.map((skill, i) => (
            <SkillPill key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
