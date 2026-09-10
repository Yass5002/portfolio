import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { ThemeProvider } from "@/lib/ThemeContext";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://yssn.tech"),
  title: "Yassine El Ouazzani | Software Engineer",
  description:
    "Software engineer specializing in mobile application development with Kotlin and Flutter, alongside full-stack web systems built with Python, Node.js, and TypeScript.",
  alternates: {
    canonical: "https://yssn.tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Yassine El Ouazzani | Software Engineer",
    description:
      "Software engineer specializing in mobile application development with Kotlin and Flutter, alongside full-stack web systems built with Python, Node.js, and TypeScript.",
    url: "https://yssn.tech",
    siteName: "Yassine El Ouazzani Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassine El Ouazzani | Software Engineer",
    description:
      "Software engineer specializing in mobile application development with Kotlin and Flutter, alongside full-stack web systems built with Python, Node.js, and TypeScript.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yassine El Ouazzani",
              url: "https://yssn.tech",
              jobTitle: "Software Engineer",
              description: "Software engineer specializing in mobile application development with Kotlin and Flutter, alongside full-stack web systems built with Python, Node.js, and TypeScript.",
              sameAs: [
                "https://github.com/Yass5002",
              ]
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="page">
            <Header />
            <ScrollToTop />
            <ChatWidget />
            {children}
            <FadeIn>
              <Footer />
            </FadeIn>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
