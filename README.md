# Yassine El Ouazzani - Portfolio

Personal portfolio website for **Yassine El Ouazzani**, Software Engineer specializing in mobile application development (Kotlin, Flutter) and full-stack web systems (Python, Node.js, TypeScript).

**[Live Website](https://yssn.tech)** · **[GitHub](https://github.com/Yass5002)**

---

## Overview

A responsive portfolio built with Next.js 14 App Router, TypeScript, and Tailwind CSS v4. Designed with a clean minimalist aesthetic featuring muted tones, refined typography, and smooth micro-interactions. Includes an interactive AI assistant ("Bubble") powered by Google Gemini, dynamic project showcase pages, and dark/light theme switching.

### Key Highlights

- **Clean Minimalist UI**: Clean card surfaces, hairline borders, and calm contrast in both light and dark modes.
- **Interactive AI Assistant (Bubble)**: In-site chatbot powered by the Google Gemini API (`gemini-2.5-flash`, `gemini-3.5-flash-lite`, `gemini-flash-latest`) with automatic fallback handling, quick replies, and contextual responses about Yassine's experience and projects.
- **Deep Project Case Studies**: Dedicated slug routes (`/portfolio/[slug]`) detailing architecture, key features, challenges, and troubleshooting insights.
- **Flicker-Free Theming**: Client-side theme provider with inline pre-hydration script syncing with system preferences and `localStorage`.
- **Framer Motion Animations**: Fluid entrance transitions, modal animations, and interactive component states.

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4, PostCSS, CSS Custom Properties |
| **Animation** | Framer Motion |
| **Icons** | React Icons (`react-icons/fa`, `react-icons/si`) |
| **AI Integration** | Google Gemini API (REST, multi-model fallback) |
| **Deployment** | Vercel |

---

## Project Structure

```
├── public/
│   └── assets/
│       ├── projects/                 # Project thumbnail assets
│       ├── profile.png               # Profile portrait
│       └── Resume_Yassine_El_Ouazzani.pdf
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts         # Gemini AI chat completion route
│   │   ├── portfolio/[slug]/         # Dynamic project detail pages & loading state
│   │   ├── globals.css               # Design tokens, theme variables & base styling
│   │   ├── layout.tsx                # Root layout, metadata & theme initialization
│   │   ├── not-found.tsx             # Custom 404 page
│   │   ├── page.tsx                  # Landing page
│   │   └── robots.ts                 # Robots.txt configuration
│   ├── components/
│   │   ├── common/                   # Header, Footer, LogoIcon, NotFoundView
│   │   ├── detail/                   # Project detail components (HeroSlider, ProjectMeta, etc.)
│   │   ├── main/                     # Home sections (Hero, AboutMe, Skills, Portfolio)
│   │   └── ui/                       # ChatWidget, DarkModeToggle, ScrollToTop, Skeletons
│   ├── data/
│   │   ├── portfolio.ts              # Timeline, skills, and portfolio catalog data
│   │   ├── projectDetails.ts         # In-depth project case studies and feature specs
│   │   └── codeSnippets.ts           # Code snippet references
│   └── lib/
│       ├── ThemeContext.tsx          # Theme state provider and switch handler
│       ├── utils.ts                  # Shared utilities
│       └── prompts/
│           └── systemPrompt.ts       # System instruction prompt for Bubble assistant
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yass5002/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> [!NOTE]
> The chat route uses this key to communicate directly with Google Generative AI endpoints. Without a key, the portfolio UI functions normally but the Bubble chat assistant will return a configuration notice.

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Verify types and build the production bundle:

```bash
npm run build
npm run start
```

---

## Contact

- **Website**: [yssn.tech](https://yssn.tech)
- **GitHub**: [@Yass5002](https://github.com/Yass5002)
- **Email**: [yassacerman@gmail.com](mailto:yassacerman@gmail.com)
