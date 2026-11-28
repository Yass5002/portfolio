export type DetailItemImage = {
  src: string;
  alt: string;
  type?: never;
  language?: never;
  code?: never;
};

export type DetailItemCode = {
  src?: never;
  alt: string;
  type: "code";
  language: string;
  code: string;
};

export type DetailItem = DetailItemImage | DetailItemCode;

export interface ProjectFeatureNumType {
  title: string;
  pr?: string | string[];
  details?: DetailItem[];
  items: string[];
}

export interface ProjectFeatureNotNumType {
  contributions: string[];
  result: string[];
}

export interface ProjectTroubleshooting {
  title: string;
  pr?: string;
  image?: { src: string; alt: string };
  found: string[];
  process: string[];
  code?: { language: string; code: string };
  result: string[];
  lesson: string[];
}

export interface ProjectDetailLink {
  label: string;
  url: string;
}

export interface ProjectDetailData {
  title: string;
  period: string;
  members: string;
  contribution?: string;
  role?: string;
  description: string;
  siteNote?: string;
  stacks: string[];
  links?: ProjectDetailLink[];
  images: string[];
  features?: ProjectFeatureNumType[] | ProjectFeatureNotNumType[];
  troubleshooting?: ProjectTroubleshooting[];
}

export const PROJECT_DETAIL_DATA: Record<string, ProjectDetailData> = {
  sentinel: {
    title: "Sentinel",
    period: "2025 - 2026",
    members: "Solo developer (API + Mobile client)",
    contribution: "100%",
    role: "Full-stack & mobile developer: engineered the system architecture, Go backend API, and Flutter mobile client.",
    description: "Sentinel is a safety dead man's switch platform engineered for high-risk situations (solo travel, remote fieldwork, personal safety). Users initiate timed safety check-in events accompanied by emergency contacts, GPS coordinates, and file attachments. If the user fails to check in before the timer elapses, the backend automatically dispatches alert notifications via AWS SES with the user's last known location and uploaded documents.",
    stacks: ["Go 1.24", "Gin", "PostgreSQL", "GORM", "Redis 7", "Flutter", "Dart", "Riverpod", "AWS SES", "AWS S3"],
    links: [
      { label: "GitHub (Mobile)", url: "https://github.com/Yass5002/sentinel" },
      { label: "GitHub (API)", url: "https://github.com/Yass5002/sentinel-core-api" },
    ],
    images: [
      "/assets/projects/sentinel_thumbnail.png",
    ],
    features: [
      {
        title: "Resilient Go Backend & High-Availability Timers",
        items: [
          "Dual-trigger timer scheduling: utilizes Redis Keyspace Notifications (notify-keyspace-events Ex) for real-time sub-second expiration triggers.",
          "Secondary fallback polling worker sweeps PostgreSQL every 30 seconds to recover any missed expiration events in case of Redis restart.",
          "Each expired event is claimed with a single atomic database update, so concurrent workers do not send the same alert twice.",
        ],
      },
      {
        title: "Persistent Mobile Safety & Background GPS Sync",
        items: [
          "Native Android Foreground Service maintains the local countdown and persistent GPS location polling even when the application is swiped from memory or the device is locked.",
          "Reactive state management implemented with Riverpod and immutable state models for rock-solid UI synchronization.",
          "Automatic network reconnect and offline queuing for check-ins and location updates.",
        ],
      },
      {
        title: "Passwordless Authentication & Emergency Contacts Pipeline",
        items: [
          "Frictionless email OTP authentication generating HMAC-SHA256 signed JWTs with zero password storage vulnerability.",
          "Reusable emergency address book supporting 1 to 10 contacts per safety event with automatic deduplication.",
          "Alert dispatch engine backed by AWS SES with automated exponential backoff and up to 3 delivery retries per contact.",
        ],
      },
      {
        title: "Secure File Attachment Ingestion via S3",
        items: [
          "Pre-signed S3 upload pipelines allowing users to pre-attach emergency documents, medical instructions, or credentials.",
          "Automated 24-hour cleanup worker purges orphaned staged uploads that were never linked to an active safety event.",
          "Attachments are securely bundled and relayed to emergency contacts exclusively upon timer expiration.",
        ],
      },
    ] as ProjectFeatureNumType[],
    troubleshooting: [
      {
        title: "Preventing Android OS from Terminating Critical Background Safety Timers",
        found: [
          "Standard Flutter background tasks and timers were aggressively killed by Android's Doze Mode and OEM battery optimizations within 3 to 10 minutes of screen lock.",
        ],
        process: [
          "Investigated Android lifecycle constraints, WorkManager limitations, and Foreground Service requirements for continuous background tracking.",
          "Engineered a dedicated Android Foreground Service with a persistent ongoing notification and partial wake lock (WAKE_LOCK).",
          "Configured precise location updates via FusedLocationProviderClient with balanced battery/accuracy power intervals.",
        ],
        result: [
          "Safety countdowns and background GPS location sync continue reliably uninterrupted across extended multi-hour events.",
        ],
        lesson: [
          "Mission-critical mobile applications cannot rely on standard app lifecycles; native platform foreground services with explicit user transparency are essential for life-safety systems.",
        ],
      },
      {
        title: "Mitigating Missed Expirations in Redis Keyspace Notifications",
        found: [
          "Redis keyspace notifications operate over Pub/Sub, which is strictly fire-and-forget without message durability. If the API server restarted or suffered temporary network partitions, expired event triggers were lost.",
        ],
        process: [
          "Designed a dual-layer timer architecture pairing Redis keyspace notifications with a persistent PostgreSQL event status store.",
          "Implemented a background reconciliation worker running on a 30-second ticker that queries for expired events where status = 'active' AND expires_at <= NOW().",
          "Applied database transaction locks to ensure idempotent alert firing between the Redis subscriber and the polling reconciler.",
        ],
        result: [
          "Zero missed alerts with immediate trigger execution under normal operations and guaranteed 30-second recovery under catastrophic Redis failures.",
        ],
        lesson: [
          "In-memory pub/sub must always be backed by durable, transactional storage when coordinating critical irreversible side-effects.",
        ],
      },
    ],
  },
  ora: {
    title: "ORA",
    period: "2025",
    members: "Solo developer",
    contribution: "100%",
    role: "Android developer: designed UI/UX, built complete native Kotlin codebase, and published open-source.",
    description: "ORA is an open-source native Android countdown and event-tracking application built with Kotlin, ViewBinding, and Material Design 3. It features interactive home screen widgets with adaptive frequency throttling, custom canvas countdown animations, exact alarm notifications, and local Room SQLite persistence with full JSON export/import.",
    stacks: ["Kotlin", "Android SDK", "ViewBinding", "Material Design 3", "Room SQLite", "LiveData", "Coroutines", "AppWidgets", "AlarmManager"],
    links: [
      { label: "GitHub", url: "https://github.com/Yass5002/Ora" },
    ],
    images: [
      "/assets/projects/ora_thumbnail.png",
    ],
    features: [
      {
        title: "MVVM Architecture & Room SQLite Persistence",
        items: [
          "Structured MVVM pattern with ViewModel, LiveData, Repository, and Room DAO delivering robust local state management.",
          "Local SQLite storage with automatic schema migrations and full JSON export/import via Gson for complete user data portability.",
          "Zero network permissions: all event data remains strictly on the user's physical device.",
        ],
      },
      {
        title: "Interactive Home Screen Widget with Frequency Throttling",
        items: [
          "Native AppWidgetProvider rendering real-time countdown progress directly on the Android launcher via RemoteViews.",
          "Adaptive frequency throttling: updates once per minute under normal conditions, and automatically ramps up to per-second updates when a timer deadline approaches.",
          "Pinned event prioritization ensuring the user's most critical event is always highlighted.",
        ],
      },
      {
        title: "Reliable Alarm Scheduling & Reboot Persistence",
        items: [
          "Precise reminder notifications scheduled using Android AlarmManager with exact alarm capabilities.",
          "BootReceiver broadcast receiver automatically queries Room and reschedules all pending alarms and widget tickers after device reboots.",
          "CountdownNotificationService managing optional persistent live countdown notifications in the status bar.",
        ],
      },
      {
        title: "Custom Canvas Graphics & Material Design 3 Theming",
        items: [
          "Custom Canvas drawing view (CountdownProgressBorderView) animating countdown progress along dynamic circular and rounded rectangular borders with custom glow and shimmer effects.",
          "Integrated color picker allowing custom accent color configuration per countdown event.",
          "Fluid swipe-to-action gestures with integrated haptic feedback, and Light/Dark/System theme switching via AppCompatDelegate.",
        ],
      },
    ] as ProjectFeatureNumType[],
    troubleshooting: [
      {
        title: "Navigating Strict Android 12+ / 13+ Exact Alarm & Notification Restrictions",
        found: [
          "On Android 12+ (API 31) and Android 13+ (API 33), apps cannot set exact alarms or post notifications without explicit runtime permissions, causing reminders to fail silently on newer devices.",
        ],
        process: [
          "Implemented runtime permission handling for POST_NOTIFICATIONS on Android 13+.",
          "Integrated AlarmManager.canScheduleExactAlarms() verification with graceful degradation to inexact windowed alarms if exact alarm permissions are restricted.",
          "Designed a non-intrusive onboarding dialog that directs users to the system Settings screen when exact alarms are required.",
        ],
        result: [
          "Reliable reminder delivery across Android 8 through Android 15 without crashes or permission violations.",
        ],
        lesson: [
          "Modern Android development requires defensive permission architectures where core features gracefully adapt to evolving OS power and privacy policies.",
        ],
      },
    ],
  },
  mehropaste: {
    title: "mehro-paste",
    period: "2025 - 2026",
    members: "Solo developer",
    contribution: "100%",
    role: "Full-stack developer: architected zero-knowledge encryption protocols, built client-side cryptography worker, and deployed serverless Redis infrastructure.",
    description: "mehro-paste is a high-speed, zero-knowledge, end-to-end encrypted paste sharing platform. Plaintext content is encrypted locally in the browser using WebAssembly-powered Libsodium (XChaCha20-Poly1305, Argon2id). The master decryption key is embedded solely in the URL fragment (#key), which is never transmitted over HTTP, ensuring the server stores only opaque ciphertext. Features include atomic burn-on-read, crawler defense shields, and customizable TTL expiration.",
    siteNote: "Live at paste.mehro.me",
    stacks: ["Next.js (App Router)", "React 19", "TypeScript", "Redis (ioredis)", "Libsodium WebAssembly", "Comlink", "Material UI", "jose (JWT)"],
    links: [
      { label: "Live ↗", url: "https://paste.mehro.me" },
      { label: "GitHub", url: "https://github.com/Yass5002/mehro-paste" },
    ],
    images: [
      "/assets/projects/mehropaste_thumbnail.png",
      "/assets/projects/mehropaste_1_editor.png",
      "/assets/projects/mehropaste_2_options.png",
      "/assets/projects/mehropaste_3_created.png",
      "/assets/projects/mehropaste_4_decrypted.png",
      "/assets/projects/mehropaste_5_burned.png",
    ],
    features: [
      {
        title: "Zero-Knowledge Cryptographic Architecture",
        items: [
          "Client-side encryption using Libsodium compiled to WebAssembly via libsodium-wrappers-sumo running inside a dedicated Web Worker via Comlink.",
          "Symmetric encryption via crypto_secretstream_xchacha20poly1305 and crypto_secretbox_easy for authenticated, tamper-proof ciphertext.",
          "Key isolation: the master decryption key is stored strictly within the URL fragment (#key). Standard HTTP specifications dictate that browsers never transmit fragment identifiers to the server, preventing server-side key exposure.",
        ],
      },
      {
        title: "Atomic Burn-on-Read & Native Redis Expiration",
        items: [
          "One-time pastes are atomically destroyed upon first read using Redis DEL inside the consume endpoint, rendering subsequent reads impossible.",
          "Configurable auto-expiration from 5 minutes to 7 days backed by native Redis key Time-To-Live (TTL).",
          "Strict zero-persistence guarantee: destroyed or expired pastes leave no lingering data in memory or disk.",
        ],
      },
      {
        title: "Anti-Bot & Link Preview Crawler Shield",
        items: [
          "Prevents chat applications (Discord, Slack, WhatsApp, Telegram, iMessage) from prematurely burning one-time pastes when generating link previews.",
          "Two-stage verification handshake: inspection of crawler headers (purpose, sec-purpose, preview User-Agents) returns static Open Graph metadata without touching ciphertext.",
          "Human consumption requires an x-paste-consume: 1 header and an HttpOnly JWT cookie (paste_guard) bound to the SHA-256 hash of the client User-Agent.",
        ],
      },
      {
        title: "Argon2id Passphrase Key Derivation",
        items: [
          "Optional secondary password protection utilizing memory-hard Argon2id (crypto_pwhash_ALG_ARGON2ID13).",
          "Resistant to GPU/ASIC-accelerated brute-force attacks by requiring substantial memory and CPU operations during key derivation.",
          "Dynamic QR code generation with styled download capabilities for mobile sharing.",
        ],
      },
    ] as ProjectFeatureNumType[],
    troubleshooting: [
      {
        title: "Preventing Chat Crawlers from Prematurely Destroying Burn-on-Read Pastes",
        found: [
          "When a user shared a burn-on-read link in Discord, Slack, or WhatsApp, the platform's link unfurler bot made an automated GET request to fetch Open Graph metadata. This triggered the read action and destroyed the paste before the intended recipient ever opened it.",
        ],
        process: [
          "Analyzed incoming crawler headers, identifying Purpose: prefetch, Sec-Purpose: preview, and platform-specific User-Agent signatures.",
          "Separated link metadata serving from paste consumption: metadata endpoints serve generic preview cards without accessing the stored ciphertext.",
          "Created an anti-bot guard handshake requiring human browser execution: the browser requests a short-lived signed JWT cookie (paste_guard), then submits a POST request with confirmation headers to atomically consume the paste.",
        ],
        result: [
          "Zero premature paste burns when sharing links across all major messaging platforms.",
        ],
        lesson: [
          "Zero-knowledge and one-time systems must account for modern web ecosystem behaviors like automatic pre-fetching and metadata scraping.",
        ],
      },
    ],
  },
  alamal: {
    title: "Laboratoire AL AMAL",
    period: "2025",
    members: "Solo developer",
    contribution: "100%",
    role: "Web developer: designed UI/UX, built complete production website, and implemented trilingual localization for a medical analysis laboratory.",
    description: "The official website for Laboratoire AL AMAL, an accredited medical analysis laboratory located in Meknes, Morocco. Engineered from scratch without framework overhead to maximize loading speed and accessibility on mobile devices. Features comprehensive medical test catalogs, home sampling inquiries, interactive Google Maps location integration, and full Arabic/French/English localization.",
    stacks: ["HTML5", "CSS3", "JavaScript", "Schema.org JSON-LD", "RTL / Localization", "Web Performance"],
    links: [
      { label: "GitHub", url: "https://github.com/Yass5002/alamal" },
    ],
    images: [
      "/assets/projects/alamal_thumbnail.png",
    ],
    features: [
      {
        contributions: [
          "Engineered a lightweight, dependency-free architecture using semantic HTML5, modern CSS3 variables, and vanilla JavaScript for minimal bundle size and near-instant load times.",
          "Implemented comprehensive trilingual localization across French (index.html), English (en.html), and native Arabic (ar.html) with complete Right-To-Left (RTL) layout switching and typography.",
          "Constructed an organized clinical catalog detailing specialized medical analysis departments including Hematology, Biochemistry, Immunology, Microbiology, and Hormonology.",
          "Built a patient contact and home blood sampling request flow with integrated interactive Google Maps directions.",
          "Integrated Schema.org MedicalBusiness structured JSON-LD metadata and Open Graph tags for high local search visibility.",
        ],
        result: [
          "Delivered a fast, professional digital presence for the laboratory in Meknes, enabling patients to easily consult test requirements and request home sample collection.",
          "Maintained 100/100 performance and accessibility scores with sub-second page loads on 3G/4G mobile connections.",
        ],
      },
    ] as ProjectFeatureNotNumType[],
    troubleshooting: [
      {
        title: "Bidirectional Layout Switching & Dynamic Viewport Rendering for Multilingual Arabic RTL",
        found: [
          "Standard LTR CSS positioning broke when switching to the Arabic version (ar.html). Absolute positioning on mobile navigation, asymmetric hero radial gradients, and inline margin/padding caused horizontal overflow and visual misalignment in RTL mode.",
        ],
        process: [
          "Implemented modern CSS logical properties (margin-inline, padding-inline, border-inline-start/end) to support automatic flow reversal.",
          "Mirrored hero decorative radial gradients using [dir='rtl'] .hero selectors to anchor visual balance appropriately.",
          "Adjusted mobile off-canvas drawer transforms from translateX(110%) to translateX(-110%) to properly anchor the slide-in menu to the right viewport edge.",
        ],
        result: [
          "Seamless layout parity across English, French, and Arabic with zero CSS regressions or horizontal scrolling defects.",
        ],
        lesson: [
          "Building for internationalization from the start using CSS logical properties avoids expensive layout refactors when adding RTL language support.",
        ],
      },
    ],
  },
  magiskhub: {
    title: "Magisk Hub",
    period: "2026",
    members: "Solo developer",
    contribution: "100%",
    role: "Full-stack developer: built the site, the release sync pipeline, and the download-based ranking.",
    description: "Magisk Hub is a directory of modules for Magisk, KernelSU and APatch. It is a static site that keeps itself current: a scheduled job checks releases on GitHub, picks up new versions and removes projects that are archived or abandoned. Visitors clicked download about 4,600 times in the past month.",
    siteNote: "Live at magisk.yssn.tech",
    stacks: ["Astro", "TypeScript", "Tailwind CSS", "Python", "GitHub Actions", "GitHub GraphQL API", "Umami"],
    links: [
      { label: "Live ↗", url: "https://magisk.yssn.tech" },
      { label: "GitHub", url: "https://github.com/Yass5002/magisk-hub" },
    ],
    images: [
      "/assets/projects/magiskhub_thumbnail.png",
      "/assets/projects/magiskhub_1_module.png",
      "/assets/projects/magiskhub_2_categories.png",
    ],
    features: [
      {
        title: "A Catalog That Maintains Itself",
        items: [
          "Every six hours, a GitHub Actions job asks GitHub's GraphQL API for the latest release of each module.",
          "A module is removed when its repository is archived, has had no pushes for about 18 months, or no longer offers a working download.",
          "New release tags, file names and star counts are written back to each module's record.",
        ],
      },
      {
        title: "Ranked by What People Download",
        items: [
          "The same job reads the last seven days of download clicks from a self-hosted Umami instance.",
          "The default order puts the most downloaded modules first and sorts the rest by GitHub stars.",
          "A module needs at least three recent download clicks to be ranked by popularity.",
        ],
      },
      {
        title: "No Server, No Database",
        items: [
          "Each module is a JSON file in the repository, checked against a schema in CI.",
          "Astro builds the whole site from those files into static pages.",
          "Release and ranking updates arrive as commits, so every data change is recorded in Git.",
        ],
      },
      {
        title: "Finding the Right Module",
        items: [
          "Search covers module names, authors, release file names, categories and known aliases.",
          "A typo-tolerant fallback based on edit distance catches close spellings.",
          "Modules can be filtered by platform and category, and the filters are kept in the URL.",
        ],
      },
    ] as ProjectFeatureNumType[],
    troubleshooting: [
      {
        title: "A Failed Link Check Could Remove a Working Module",
        found: [
          "The sync deleted any module whose download link failed its check, and a timeout or server error on a single request was enough. CorePatch was removed this way.",
        ],
        process: [
          "Added a second attempt and a one-byte GET request as a fallback when the HEAD request fails.",
          "Kept immediate failure for responses that show the file is gone (404 and 410).",
          "Added a limit that stops a run before it deletes more than a quarter of the modules.",
        ],
        result: [
          "CorePatch was restored, and a single temporary error no longer removes a module.",
        ],
        lesson: [
          "An automated job that deletes data should need more than one failed request as evidence.",
        ],
      },
    ],
  },
  moroccanedu: {
    title: "Moroccan Educational System",
    period: "2025",
    members: "Solo developer",
    contribution: "100%",
    role: "Data engineer: collected, cleaned, structured, and validated Morocco's national curriculum and exam frameworks into open-source JSON datasets.",
    description: "A standardized, developer-ready JSON dataset of the Moroccan national educational curriculum, covering continuous assessments (Devoirs Surveillés) and official certifying unified exam frameworks for both Collège and Lycée levels. Released as open-source under the MIT license to empower EdTech applications, study planners, and GPA calculators.",
    stacks: ["Python", "JSON", "Data Modeling", "Web Scraping", "Automation", "MIT Open Source"],
    links: [
      { label: "GitHub", url: "https://github.com/Yass5002/moroccan-educational-system" },
    ],
    images: ["/assets/projects/moroccan_edu_thumbnail.png"],
    features: [
      {
        contributions: [
          "Consolidated over 680 lessons across Moroccan middle and high school streams (including standard MEN tracks and International French Option / BIOF).",
          "Structured three core relational JSON datasets: curriculum.json (lesson-by-lesson subject hierarchy), devoirs.json (continuous assessment exam breakdowns for DS1-DS3), and exams.json (national and regional exam specifications).",
          "Codified official certifying exam rules, including coefficients, testing durations, and the Baccalaureate grade weighting algorithm (50% National + 25% Regional + 25% Continuous Assessment).",
          "Added a Python script (validate.py) that runs in CI and checks that the data files are present and valid JSON.",
        ],
        result: [
          "An open-source, machine-readable dataset eliminating manual syllabus scraping for educational developers building revision apps, GPA tools, and learning management systems.",
        ],
      },
    ] as ProjectFeatureNotNumType[],
    troubleshooting: [
      {
        title: "Normalizing Disparate Ministry Syllabi into Structured JSON Datasets",
        found: [
          "Moroccan Ministry of National Education (MEN) curriculum guidelines existed only in non-standardized PDF formats with conflicting subject terminology between standard Arabic streams and International Option (BIOF) French curricula. Inconsistent coefficient definitions risked incorrect GPA calculations in downstream apps.",
        ],
        process: [
          "Designed three structured JSON datasets (curriculum.json, devoirs.json, exams.json).",
          "Recorded the Baccalaureate formula weights (50% National + 25% Regional + 25% Continuous Assessment) alongside the exam data.",
          "Set up a CI workflow that runs a Python script (validate.py) to check the JSON files.",
        ],
        result: [
          "A clean open-source dataset with automated CI checks, covering all high school streams.",
        ],
        lesson: [
          "Open data needs automated checks before publishing so that people building on it can rely on it.",
        ],
      },
    ],
  },
};
