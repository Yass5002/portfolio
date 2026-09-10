import Image from "next/image";
import { FiMail, FiGithub, FiGlobe, FiPhone } from "react-icons/fi";

const contactInfo = [
  {
    icon: FiMail,
    label: "yassacerman@gmail.com",
    href: "mailto:yassacerman@gmail.com",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/Yass5002",
  },
  {
    icon: FiGlobe,
    label: "Blog",
    href: "https://blog.yssn.tech",
  },
  {
    icon: FiPhone,
    label: "+212649646196",
    href: "tel:+212649646196",
  },
];

export default function Hero() {
  return (
    <section id="hero" className="p-6 lg:p-12 max-w-6xl mx-auto scroll-mt-24">
      <div className="space-y-12 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-[345px] lg:h-[345px] bg-[var(--surface)] rounded-2xl flex items-center justify-center shadow-lg border border-[var(--border)] overflow-hidden">
              <Image
                src="/assets/profile.png"
                width={345}
                height={345}
                className="w-full h-full object-cover object-[50%_16%] rounded-2xl"
                alt="Yassine El Ouazzani"
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--foreground)] leading-tight">
                Yassine El Ouazzani
              </h1>
              <div className="space-y-3">
                <p className="text-lg lg:text-xl xl:text-2xl text-[var(--foreground)] font-light leading-relaxed">
                  Across mobile and web,
                  <br />
                  <span className="text-[var(--foreground)] font-bold">
                    I build systems that are built to last.
                  </span>
                </p>
                <p className="text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed">
                  Rather than indiscriminately scaling features, I focus on a stable core, clean architecture, and code that holds up in production, not just in a demo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center space-x-3 p-4 rounded-lg hover:bg-[var(--surface)] transition-colors group justify-center lg:justify-start !no-underline"
                >
                  <contact.icon
                    className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors flex-shrink-0"
                    size={20}
                  />
                  <span className="text-[var(--foreground)] font-medium text-sm sm:text-base">
                    {contact.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[var(--border)] mt-8 lg:mt-12" />
    </section>
  );
}
