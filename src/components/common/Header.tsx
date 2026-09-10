"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/components/common/LogoIcon";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="logo">
          <LogoIcon size={30} className="logo-dot" />
          <span className="logo-text">
            yassine<span>.</span>
          </span>
        </Link>
        <div className="header-right">
          {pathname === "/" && (
            <nav>
              <Link href="#hero">About</Link>
              <Link href="#learning">Learning</Link>
              <Link href="#skills">Skills</Link>
              <Link href="#portfolio">Projects</Link>
            </nav>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
