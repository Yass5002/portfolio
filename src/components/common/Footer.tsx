import Link from "next/link";
import LogoIcon from "@/components/common/LogoIcon";
import { FaGithub, FaDownload } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="#top" className="logo">
            <LogoIcon size={34} className="logo-dot" />
            <span className="logo-text">
              yassine<span>.</span>
            </span>
          </Link>
          <span className="footer-copy">
            © 2026 Yassine El Ouazzani. Software Engineer.
          </span>
        </div>
        <div className="footer-contact">
          <Link
            className="footer-github-link"
            href="https://github.com/Yass5002"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={18} />
            GitHub
          </Link>
          <div className="footer-divider" />
          <a
            className="btn-email"
            href="/assets/Resume_Yassine_El_Ouazzani.pdf"
            download="Resume_Yassine_El_Ouazzani.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDownload size={15} />
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
