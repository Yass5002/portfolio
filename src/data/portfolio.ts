export interface TimelineItem {
  period: string;
  company: string;
  dept: string;
  desc?: string;
  role?: string;
  works?: string[];
}

export interface Skill {
  name: string;
  c1: string;
  c2: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export type ProjectType = "Side Project" | "Open Source" | "Client Project" | "Personal";

export interface Project {
  title: string;
  en: string;
  thumb: string;
  desc: string;
  type?: ProjectType;
  path?: string;
  links?: ProjectLink[];
}

export const career: TimelineItem[] = [
  {
    period: "2026 - Present",
    company: "Freelance",
    dept: "Full-Stack & Mobile Developer",
    role: "Independent software development and client solutions",
    works: [
      "Designing and building custom mobile applications and responsive full-stack web platforms.",
      "Managing end-to-end delivery from architecture design and UI/UX implementation to backend APIs and deployment.",
      "Writing clean, maintainable code with a strong focus on security, performance, and responsive design.",
    ],
  },
];

export const education: TimelineItem[] = [
  {
    period: "2024 - 2026",
    company: "OFPPT - ISTAG Bab Tizimi",
    dept: "Specialized Degree in Digital Development (Mobile Applications)",
    desc: "Two-year technical degree focused on native Android development with Kotlin, cross-platform mobile engineering with Flutter & Dart, full-stack web architectures, database design, mobile security, and Agile workflows.",
  },
  {
    period: "2025",
    company: "OFPPT - ISTAG Bab Tizimi",
    dept: "Professional Certificate in Structured Python Programming",
    desc: "Intensive qualification covering structured programming methodologies, data stream processing, script automation, and algorithmic optimization in Python.",
  },
  {
    period: "2024",
    company: "John Ellis High School",
    dept: "High School Diploma in Physical Sciences",
    desc: "Rigorous scientific curriculum centered on advanced mathematics, classical and modern physics, and structured analytical problem-solving.",
  },
];

export const etc: TimelineItem[] = [
  {
    period: "",
    company: "Languages",
    dept: "Arabic · English · French",
    desc: "Arabic (Native), English (Full Professional Proficiency), French (Full Professional Proficiency).",
  },
];

export const skills: Skill[] = [
  { name: "Kotlin", c1: "#c4a0ff", c2: "#7f52ff" },
  { name: "Flutter", c1: "#a6d8ff", c2: "#027DFD" },
  { name: "Dart", c1: "#a0e8e0", c2: "#0175C2" },
  { name: "Android", c1: "#a8f5cc", c2: "#3DDC84" },
  { name: "Go", c1: "#a0e8e8", c2: "#00ADD8" },
  { name: "Python", c1: "#ffe79a", c2: "#3776AB" },
  { name: "Flask", c1: "#d0d0d0", c2: "#000000" },
  { name: "TypeScript", c1: "#9fb2ff", c2: "#3178C6" },
  { name: "React", c1: "#9fd8ff", c2: "#61DAFB" },
  { name: "Next.js", c1: "#cfd3da", c2: "#000000" },
  { name: "HTML5", c1: "#ffb4a2", c2: "#E34F26" },
  { name: "CSS3", c1: "#a2c4ff", c2: "#1572B6" },
  { name: "Tailwind CSS", c1: "#a6ecf0", c2: "#06B6D4" },
  { name: "PostgreSQL", c1: "#a6c8ff", c2: "#336791" },
  { name: "Redis", c1: "#ffb9a6", c2: "#DC382D" },
  { name: "SQLite", c1: "#a2c4ff", c2: "#003B57" },
  { name: "Supabase", c1: "#9ef0c8", c2: "#3ECF8E" },
  { name: "Firebase", c1: "#ffe082", c2: "#FFCA28" },
  { name: "Linux", c1: "#d0d0d0", c2: "#000000" },
  { name: "Docker", c1: "#a6d8ff", c2: "#2496ED" },
  { name: "Git", c1: "#ffab91", c2: "#F05032" },
  { name: "Postman", c1: "#ffab91", c2: "#FF6C37" },
  { name: "Figma", c1: "#ffab91", c2: "#F24E1E" },
  { name: "Notion", c1: "#d0d0d0", c2: "#000000" },
];

export const projectsFeatured: Project[] = [
  {
    title: "mehro-paste",
    en: "Encrypted Paste",
    thumb: "/assets/projects/mehropaste_thumbnail.png",
    desc: "Fast, zero-knowledge, end-to-end encrypted paste sharing with burn-on-read and auto-expiry. Built with Next.js, Libsodium WASM, and Redis.",
    type: "Side Project",
    path: "/portfolio/mehropaste",
    links: [
      { label: "Live ↗", href: "https://paste.mehro.me" },
      { label: "GitHub", href: "https://github.com/Yass5002/mehro-paste" },
    ],
  },
  {
    title: "Moroccan Educational System",
    en: "Open Data",
    thumb: "/assets/projects/moroccan_edu_thumbnail.png",
    desc: "Standardized JSON dataset of the Moroccan national curriculum, continuous assessments, and official unified exam frameworks.",
    type: "Open Source",
    path: "/portfolio/moroccanedu",
    links: [
      { label: "GitHub", href: "https://github.com/Yass5002/moroccan-educational-system" },
    ],
  },
  {
    title: "mehro",
    en: "Portfolio Website",
    thumb: "/assets/projects/mehro_thumbnail.png",
    desc: "A personal portfolio and interactive digital hub featuring live Discord presence streaming, Spotify listening activity via Discord RPC, and a self-hosted SQLite view counter.",
    type: "Personal",
    path: "/portfolio/mehro",
    links: [
      { label: "Live ↗", href: "https://mehro.me/" },
      { label: "GitHub", href: "https://github.com/Yass5002/mehro" },
    ],
  },
  {
    title: "Sentinel",
    en: "Dead Man's Switch",
    thumb: "/assets/projects/sentinel_thumbnail.png",
    desc: "A resilient Dead Man's Switch platform with a Go API backend and Flutter mobile client featuring real-time GPS tracking, passwordless OTP auth, and encrypted alert delivery.",
    type: "Side Project",
    path: "/portfolio/sentinel",
    links: [
      { label: "GitHub", href: "https://github.com/Yass5002/sentinel" },
    ],
  },
  {
    title: "ORA",
    en: "Countdown App",
    thumb: "/assets/projects/ora_thumbnail.png",
    desc: "An open-source Android countdown app with Material You design, home screen widget, custom notifications, and data import/export.",
    type: "Open Source",
    path: "/portfolio/ora",
    links: [
      { label: "GitHub", href: "https://github.com/Yass5002/Ora" },
    ],
  },
  {
    title: "Laboratoire AL AMAL",
    en: "Medical Lab Website",
    thumb: "/assets/projects/alamal_thumbnail.png",
    desc: "Trilingual production website for an accredited medical analysis laboratory in Meknes, featuring comprehensive clinical test catalogs, RTL Arabic support, and zero-framework performance.",
    type: "Client Project",
    path: "/portfolio/alamal",
    links: [
      { label: "GitHub", href: "https://github.com/Yass5002/alamal" },
    ],
  }
];
