export type TrackKey = "ai" | "ba";

export type Project = {
  id: string;
  title: string;
  category: string;
  context: string;
  summary: string;
  impact: string;
  tags: string[];
  /** Heading for the deliverables list, e.g. "What I produced" or "Under the hood" */
  listTitle?: string;
  deliverables?: string[];
  /** Big-number panel shown in place of a screenshot */
  stats?: { value: string; label: string }[];
  /** Ordered journey steps, shown as a flow when there is no screenshot */
  flow?: string[];
  metrics?: string[];
  liveUrl?: string;
  image?: string;
  /** Height / width of a full-page screenshot; when set, the frame scrolls it on hover */
  tall?: number;
  accent?: [string, string, string];
};

export const CONTACT = {
  name: "Temitope Ajayi",
  email: "jaztemi04@gmail.com",
  phone: "+234 906 066 8794",
  phoneHref: "tel:+2349060668794",
  whatsapp: "https://wa.me/2349060668794",
  linkedin: "https://www.linkedin.com/in/olaoluwa-ajayi-32b020418",
  linkedinLabel: "linkedin.com/in/olaoluwa-ajayi",
};

export const SITE_URL = "https://temitopeajayi-portfolio.vercel.app";

export const trackMeta = {
  ai: {
    label: "AI Engineer",
    badge: "Open to Work",
    headline: "Systems that make work lighter.",
    sub: "AI engineer building automation, chat and voice tools that teams actually use.",
    intro:
      "I’m a product-minded AI Engineer with hands-on experience designing intelligent workflows, automation tools, and user-centered digital experiences that improve operational efficiency and decision-making.",
    statement:
      "I combine AI engineering, business analysis, and product thinking to design systems that are practical, human-centred, and ready for real-world use.",
    typed: [
      "automate repetitive work",
      "ship AI-powered products",
      "build voice and chat bots",
      "turn ideas into live apps",
    ],
    portfolioTitle: "AI engineer portfolio",
    closing: "Let’s build something useful.",
  },
  ba: {
    label: "Business Analyst",
    badge: "Open to Work",
    headline: "Clarity for complex business.",
    sub: "Business analyst turning tangled processes into requirements teams can build from.",
    intro:
      "I’m a Business Analyst focused on solving operational pain points through requirements gathering, stakeholder alignment, process improvement, and delivery planning that keeps teams moving with clarity.",
    statement:
      "I help teams work out what they actually need, then write it down so it can be built, tested and used.",
    typed: [
      "map messy processes",
      "align stakeholders",
      "write sharp requirements",
      "turn complexity into action",
    ],
    portfolioTitle: "Business analyst portfolio",
    closing: "Let’s make the complex clear.",
  },
} as const;

export const skillGroups = {
  ai: [
    { title: "Build", items: ["Python", "TypeScript", "Next.js", "React", "API integration"] },
    { title: "AI & automation", items: ["AI automation", "NLP", "Prompt design", "Workflow design"] },
    { title: "Data", items: ["SQL", "Power BI", "Data handling"] },
    { title: "Product", items: ["Product thinking", "User-centred design"] },
  ],
  ba: [
    {
      title: "Elicitation & analysis",
      items: ["Stakeholder interviews", "Requirements workshops", "Gap analysis", "Root cause analysis", "SWOT", "MoSCoW prioritisation"],
    },
    {
      title: "Modelling & documentation",
      items: ["Process mapping (swimlane, BPMN)", "User stories & acceptance criteria", "Use cases", "BRD / FRD", "Traceability matrix", "Wireframes"],
    },
    {
      title: "Delivery",
      items: ["Agile / Scrum", "Backlog refinement", "UAT planning", "Change requests", "Risk assessment", "RACI"],
    },
    { title: "Tools", items: ["Jira", "Confluence", "SQL", "Power BI", "Excel"] },
  ],
} as const;

export const services = {
  ai: [
    {
      title: "Workflow & AI automation",
      body: "Turn repetitive intake, follow-up and coordination work into reliable automated flows.",
    },
    {
      title: "Chat & voice bots",
      body: "WhatsApp and voice assistants that take orders, answer questions and hand off cleanly to people.",
    },
    {
      title: "Custom web apps",
      body: "Fast, responsive Next.js products, from check-in systems to audit dashboards.",
    },
    {
      title: "Data & dashboards",
      body: "SQL and Power BI views that make performance and risk visible at a glance.",
    },
  ],
  ba: [
    {
      title: "Requirements elicitation & documentation",
      body: "Interviews and workshops turned into clear, testable requirements, BRDs and user stories.",
    },
    {
      title: "Process modelling & gap analysis",
      body: "Current-state and future-state swimlane maps that show handoffs, gaps and risks.",
    },
    {
      title: "Backlog & delivery support",
      body: "User stories with acceptance criteria, prioritised and tracked in Jira, with error paths covered.",
    },
    {
      title: "Stakeholder alignment & UAT",
      body: "Keeping business and delivery teams agreed on scope, and coordinating acceptance testing.",
    },
  ],
} as const;

export const processSteps = {
  ai: [
    { title: "Discover", body: "Understand the people, the pain and what success looks like before anything is built." },
    { title: "Map", body: "Make the current flow visible (handoffs, gaps and risks) and agree on the target state." },
    { title: "Build", body: "Ship in small, usable slices, with the right people reviewing early and often." },
    { title: "Measure", body: "Track response time, accuracy and adoption, then refine until the change sticks." },
  ],
  ba: [
    { title: "Elicit", body: "Interviews, workshops and document review to understand the problem and who it affects." },
    { title: "Analyse", body: "Map the current process, find the gaps and root causes, and size the options." },
    { title: "Specify", body: "Write requirements and user stories with acceptance criteria, including the error paths." },
    { title: "Validate", body: "Review with stakeholders, support UAT, and trace each requirement through to delivery." },
  ],
} as const;

export const principles = {
  ai: [
    { title: "Product-minded", body: "I start from the user and the outcome, not the tech." },
    { title: "Execution-focused", body: "Clear scope, visible progress, things that actually ship." },
    { title: "Human-centred", body: "Systems that are intelligent, but also practical to use." },
  ],
  ba: [
    { title: "Start with the problem", body: "Understand the need and the people before proposing a solution." },
    { title: "Write it to be tested", body: "Every requirement has acceptance criteria and a clear owner." },
    { title: "Keep everyone aligned", body: "Stakeholders agree on scope, trade-offs and what done means." },
  ],
} as const;

/** Real artefacts from the Learning Loft and Guardrail Financials work, shown in the Business Analyst view. */
export const baArtefacts = {
  acceptance: {
    title: "Acceptance matrix",
    note: "Learning Loft Phase 1. Every criterion in the requirements document maps to automated tests; the last one is confirmed by hand at handover. Run on 2026-10-17.",
    rows: [
      { n: "1", criterion: "A new user registers, verifies and sees only permitted features", result: "Pass", tests: "70" },
      { n: "2", criterion: "A learner gets access only after verified or admin-recorded payment, and receives a receipt", result: "Pass", tests: "72" },
      { n: "3", criterion: "A learner watches a lesson, takes a quiz and sees progress", result: "Pass", tests: "49" },
      { n: "4", criterion: "A session is requested and recorded, and double booking is blocked", result: "Pass", tests: "61" },
      { n: "5", criterion: "A tutor manages availability and sees hours and itemised earnings", result: "Pass", tests: "51" },
      { n: "6", criterion: "Admin reconciles payments and records payouts with an audit history", result: "Pass", tests: "119" },
      { n: "7", criterion: "Only learners with a completed booking can review it", result: "Pass", tests: "26" },
      { n: "8", criterion: "No role can read or change data outside its permissions", result: "Pass", tests: "107" },
      { n: "9", criterion: "Core journeys work on mobile and desktop", result: "Pass", tests: "84" },
      { n: "10", criterion: "Client receives code, credentials, documents and ownership of paid services", result: "Manual", tests: "n/a" },
    ],
  },
  brief: {
    title: "Client brief against what was built",
    note: "A sample from the traceability sheet. Each line of the client's brief is marked Done, Partly, Not built or Phase 2.",
    rows: [
      { item: "Learner dashboard: courses, progress, sessions, receipts, notifications", status: "Done" },
      { item: "Learner dashboard: saved content", status: "Not built (not in the agreed scope)" },
      { item: "Teacher wallet: gross, commission, deductions, refunds, net, payout states", status: "Done" },
      { item: "Live class platform integration", status: "Phase 2 (admin pastes a meeting link for now)" },
    ],
  },
  rootCauses: {
    title: "Root-cause analysis",
    note: "From the Guardrail Financials foundation audit, which read nine layers of the product and fixed what it found.",
    rows: [
      {
        issue: "Transactions loaded in a block capped at 5,000 rows",
        impact: "Audits with more rows were silently cut short",
      },
      {
        issue: "Bank files use different column names (Trans Date, Narration, Withdrawals, Deposits, DR, CR)",
        impact: "Amounts were never read, so every row was flagged and the outflow showed NGN 0.00",
      },
      {
        issue: "Ledger running balance calculated newest-first",
        impact: "The balance accumulated backwards through the ledger",
      },
      {
        issue: "Currency shown in two formats on the same page",
        impact: "The same figure read differently depending on which code path drew it",
      },
    ],
  },
  swimlane: {
    src: "/artefacts/guardrail-registration-swimlane.png",
    tall: 2.015,
    alt: "Swimlane diagram of the Guardrail registration and email verification flow",
    caption: "Registration and email verification flow (swimlane)",
  },
  backlog: {
    src: "/guardrail-backlog.svg",
    alt: "Guardrail product backlog in Jira",
    caption: "Product backlog in Jira",
  },
  stories: [
    { key: "SCRUM-5", epic: "User auth", story: "User can register with email and password" },
    { key: "SCRUM-9", epic: "Transactions", story: "Admin can flag a suspicious transaction" },
    { key: "SCRUM-22", epic: "Transactions", story: "Handle date filtering error due to an invalid date range" },
    { key: "SCRUM-23", epic: "Transactions", story: "Input and log a transaction manually" },
    { key: "SCRUM-25", epic: "Transactions", story: "Flag an individual entry as suspicious" },
  ],
} as const;

export const aiProjects: Project[] = [
  {
    id: "sophia-academy",
    title: "Sophia Academy",
    category: "Web Apps",
    context: "Learning platform for an 8-week Bible school",
    summary:
      "Built the full Sophia Academy platform: a public site, email-only student sign-in, an 8-week class dashboard with live-session links and embedded replays, and an admin area for attendance and progress.",
    listTitle: "Under the hood",
    deliverables: [
      "Passwordless sign-in that only works for students an admin has added",
      "Replay tracking: it warns when a student skips ahead, saves progress as they watch, and completes a class at 95% watched",
      "Plays YouTube and Google Drive recordings, including Google Meet recordings",
      "Admin dashboard to tick live attendance, override completion and see progress",
      "Row-level security in Supabase, plus terms, privacy, cookie consent and download or delete my data",
    ],
    impact:
      "Students have one place to attend live, catch up on replays and track their progress, and admins have a clear attendance record.",
    tags: ["Next.js", "TypeScript", "Supabase", "Resend", "Vercel"],
    liveUrl: "https://www.sophiaacademy.net/",
    image: "/shots/sophia-full.jpg",
    tall: 2.216,
    accent: ["#22c55e", "#1d9bf0", "#fbbf24"],
  },
  {
    id: "mayoher",
    title: "Mayoher",
    category: "Web Apps",
    context: "Music, books and events website",
    summary:
      "Built the Mayoher website: a fast static site with no build step, covering music, books, devotionals and the Burn Conference, with photo and video galleries and email sign-ups that save straight to a Google Sheet.",
    listTitle: "Under the hood",
    deliverables: [
      "Newsletter and waitlist form posts to a Google Apps Script that writes to a Sheet, skips duplicate emails and ignores bots with a hidden honeypot field",
      "Free songs and books unlock when a visitor leaves their email",
      "Burn Conference photo gallery and highlight videos",
      "Plain HTML, CSS and JavaScript on Vercel, so pages load quickly",
    ],
    impact:
      "Gave the brand a polished home online and a simple way to grow its mailing list without a database or monthly fees.",
    tags: ["HTML, CSS, JavaScript", "Google Apps Script", "Google Sheets", "Vercel"],
    liveUrl: "https://www.mayoher.com/",
    image: "/shots/mayoher-full.jpg",
    tall: 5.382,
    accent: ["#f472b6", "#8b5cf6", "#1d9bf0"],
  },
  {
    id: "guardrail",
    title: "Guardrail Financials",
    category: "Fintech",
    context: "Bookkeeping audit platform for SMEs",
    summary:
      "Built an audit platform where an SME uploads a bank statement or spreadsheet and gets cleaned data, flagged problems, an audit score and a PDF report, without needing a full-time auditor.",
    listTitle: "Under the hood",
    deliverables: [
      "Reads Nigerian bank exports, including varied column names, DR and CR suffixes, bracketed negatives and day-first dates",
      "Checks that debits equal credits, finds duplicates, flags invalid dates and missing amounts, and assigns categories",
      "Nigerian tax engine, multi-station business view, and spending goals with variance warnings",
      "Supabase with row-level security on every table; PDF reports delivered through signed links",
      "Phase-by-phase test checklists and a nine-layer foundation audit",
    ],
    impact:
      "Makes book audits faster, more visible and easier to act on for small businesses and freelancers.",
    tags: ["JavaScript", "Supabase", "Vercel", "Fintech", "PDF reports"],
    liveUrl: "https://guardrail-ashen.vercel.app/",
    image: "/shots/guardrail-full.jpg",
    tall: 5.16,
    accent: ["#1d9bf0", "#8b5cf6", "#34d399"],
  },
  {
    id: "nexavoice",
    title: "NexaVoice",
    category: "AI & Automation",
    context: "Multilingual voice AI for African contact centers",
    summary:
      "Built an AI overlay platform that upgrades customer service at African contact centers without replacing existing systems, adding multilingual voice AI across Yoruba, Igbo, Hausa, and Pidgin with real-time translation to English.",
    impact:
      "Cut average handling time to under five minutes by unifying CRM, core banking, and ticketing data in one agent workspace, while automated call scoring kept every interaction aligned with NDPR and CBN compliance.",
    tags: ["Voice AI", "NLP", "Compliance", "Fintech", "Integration"],
    liveUrl: "https://nexavoice-delta.vercel.app/",
    image: "/shots/nexavoice-full.jpg",
    tall: 3.413,
    accent: ["#6366f1", "#22d3ee", "#f59e0b"],
  },
  {
    id: "whatsapp-bot",
    title: "WhatsApp Ordering Bot",
    category: "AI & Automation",
    context: "Order taking and payment for a bakery",
    summary:
      "Built a WhatsApp assistant for a bakery. Customers choose a category, item, size and quantity in chat, share a delivery location and pay through Paystack, and the baker approves or declines each request by replying on WhatsApp.",
    listTitle: "Under the hood",
    deliverables: [
      "A 34-step n8n workflow behind a self-hosted WhatsApp gateway (Evolution API), run with Docker",
      "A guided menu with saved session state, plus an AI agent (Groq or Gemini) for free-text questions",
      "Stock, sizes, prices and lead times read live from a Google Sheet",
      "Delivery location understood by Gemini; payment link created through Paystack",
    ],
    impact:
      "Turns order taking, payment and baker approval into one automated WhatsApp flow instead of back-and-forth messages.",
    tags: ["n8n", "WhatsApp", "Paystack", "Gemini", "Docker", "Google Sheets"],
    image: "/whatsapp-bot-architecture.svg",
    accent: ["#34d399", "#1d9bf0", "#8b5cf6"],
  },
  {
    id: "hiyame",
    title: "Hiyame",
    category: "Web Apps",
    context: "Two-sided recruiting marketplace (private)",
    summary:
      "Built solo: companies post roles, candidates build verified profiles, and a matching engine scores candidates out of 100 and produces a shortlist. One Expo codebase runs on iOS, Android and the web.",
    listTitle: "Under the hood",
    deliverables: [
      "Weighted matching engine with hard exclusions, scores saved and re-runnable, weights kept in one place",
      "38 database migrations with row-level security; the service role never reaches the client",
      "21 unit tests and 20 end-to-end tests against the real backend, including accessibility checks",
      "Scheduled jobs in Postgres, email and web push notifications, and identity verification with Smile ID",
    ],
    impact:
      "A working hiring marketplace with privacy, verification and tested matching built in from the start.",
    tags: ["Expo", "React Native", "TypeScript", "Supabase", "Vercel"],
    accent: ["#34d399", "#1d9bf0", "#8b5cf6"],
  },
  {
    id: "learning-loft",
    title: "Learning Loft Platform",
    category: "Web Apps",
    context: "Learning and tutoring platform for a client (private)",
    summary:
      "Built a platform where learners and parents buy courses and book tutors, tutors manage availability and earnings, and admins reconcile payments and run the business.",
    listTitle: "Under the hood",
    deliverables: [
      "Students, parents, tutors and admins, with access rules enforced in the database",
      "Payments through Monnify and Paystack with webhooks, a ledger, payout records and an audit trail",
      "Double-booking protection and itemised tutor earnings",
      "639 automated acceptance tests across nine criteria, all passing",
    ],
    impact:
      "Covers the whole money-to-learning path: find a course, pay, learn, and track progress.",
    tags: ["Next.js", "Supabase", "Monnify", "Paystack", "Testing"],
    accent: ["#22c55e", "#1d9bf0", "#fbbf24"],
  },
  {
    id: "recruit-crm",
    title: "Recruitment CRM",
    category: "Operations",
    context: "Agency management system (confidential)",
    summary:
      "Built a recruitment agency system for candidates, clients and the hiring pipeline, with role-based access, CV uploads, scheduling emails and AI-assisted screening.",
    listTitle: "Under the hood",
    deliverables: [
      "Real-time pipeline on Firestore for team leads, client managers and recruiters",
      "CV uploads, interview scheduling emails and AI-assisted candidate screening",
      "A scheduled pipeline that syncs the CRM to Google Sheets for reporting, on Lagos time",
    ],
    impact:
      "Gave the team one live view of candidates and interviews, and reporting that no longer needs manual copying.",
    tags: ["Firebase", "JavaScript", "Claude API", "Google Sheets", "Automation"],
    accent: ["#1d9bf0", "#22c55e", "#fbbf24"],
  },
  {
    id: "onboarding-form",
    title: "Employee Onboarding Intake",
    category: "Operations",
    context: "Document collection automation (confidential)",
    summary:
      "Built a web form that collects a full onboarding questionnaire and supporting documents, then files everything into a folder per candidate in Google Drive with a summary row in Google Sheets.",
    listTitle: "Under the hood",
    deliverables: [
      "Multi-step form that uploads each file separately to stay within hosting limits",
      "Creates a named Drive folder per candidate and a text summary of every answer",
      "Authorised through a real Google account with OAuth2, not a service account",
    ],
    impact:
      "Replaces chasing documents by email with one tidy submission and one folder per person.",
    tags: ["Node.js", "Express", "Google Drive API", "Google Sheets", "OAuth2"],
    accent: ["#8b5cf6", "#14b8a6", "#f59e0b"],
  },
  {
    id: "treasurevilla",
    title: "Treasureville",
    category: "Web Apps",
    context: "Kids check-in system with unique codes",
    summary:
      "Designed and built a check-in system for kids that issues each child a unique code, letting staff verify and check them in and out quickly and securely.",
    impact:
      "Created a faster, more reliable check-in experience that gives staff and parents confidence in exactly who picked up which child, and when.",
    tags: ["Next.js", "Check-in", "Unique codes", "Product design", "Front-end"],
    liveUrl: "https://ln.run/M3RYD",
    image: "/treasureville-login.svg",
    accent: ["#f59e0b", "#f472b6", "#1d9bf0"],
  },
];

export const baProjects: Project[] = [
  {
    id: "learning-loft-ba",
    title: "Learning Loft Platform",
    category: "Web Apps",
    context: "Requirements and acceptance for a learning and tutoring platform (client work)",
    summary:
      "Turned a client's written brief into an agreed product requirements document, a data model, a test plan and a signed-off acceptance sheet for a platform with four kinds of user.",
    listTitle: "What I produced",
    deliverables: [
      "Product requirements document with two phases, ten acceptance criteria and a weekly plan",
      "The client brief checked section by section: Done, Partly, Not built or Phase 2",
      "Data model, security rules, payments flow, test plan and a decisions log",
      "Handover pack and training guides for admins, tutors, students and parents",
    ],
    impact:
      "One shared definition of done, and a clear record of what was built, what was deferred and what was still open.",
    tags: ["PRD", "Acceptance criteria", "Traceability", "Test planning", "Stakeholders"],
    stats: [
      { value: "639", label: "automated acceptance tests" },
      { value: "9 of 9", label: "testable criteria passing" },
      { value: "4", label: "user roles specified" },
      { value: "2", label: "phases scoped, with a gate" },
    ],
    accent: ["#22c55e", "#1d9bf0", "#fbbf24"],
  },
  {
    id: "guardrail-ba",
    title: "Guardrail Financials",
    category: "Fintech",
    context: "Requirements and process design for an SME bookkeeping audit platform",
    summary:
      "Evaluated how small businesses check their books and turned that into a structured audit workflow, mapping stakeholder touchpoints, review steps, and risk areas into a clearer service design.",
    listTitle: "What I produced",
    deliverables: [
      "Swimlane process map for registration and email verification",
      "Product backlog in Jira with user stories and error paths",
      "Test checklists with acceptance criteria for each build phase",
      "Root-cause analysis from a nine-layer foundation audit",
    ],
    impact:
      "Improved clarity around audit ownership, review priorities, and reporting by structuring a more dependable book-checking process for SMEs.",
    tags: ["Process design", "User stories", "Jira", "Root-cause analysis", "UAT"],
    liveUrl: "https://guardrail-ashen.vercel.app/",
    image: "/guardrail-backlog.svg",
    accent: ["#1d9bf0", "#8b5cf6", "#34d399"],
  },
  {
    id: "treasurevilla-ba",
    title: "Treasureville",
    category: "Web Apps",
    context: "Check-in journey and process design for a children's service",
    summary:
      "Mapped the end-to-end check-in journey for kids, from unique code issuance to staff verification and pickup, to improve clarity, speed, and safety at every handoff.",
    listTitle: "What I produced",
    deliverables: [
      "End-to-end check-in journey map",
      "Code issuance, verification and pickup steps",
      "Handoff points between parents and staff",
    ],
    impact:
      "Powered a faster, more trustworthy check-in process by clarifying exactly how codes are issued, verified, and matched at pickup.",
    tags: ["Journey mapping", "Service flow", "UX", "Research"],
    flow: [
      "A unique code is issued to the child",
      "Staff verify the code and check the child in",
      "At pickup, the guardian presents the code",
      "Staff match it and check the child out",
    ],
    liveUrl: "https://ln.run/M3RYD",
    accent: ["#f59e0b", "#f472b6", "#1d9bf0"],
  },
  {
    id: "internship-ba",
    title: "Enterprise IT Internship",
    category: "Operations",
    context: "Process improvement and service operations",
    summary:
      "Worked across issue tracking, IT asset visibility, and operational handoff points to improve clarity, documentation, and service continuity in a complex environment.",
    listTitle: "What I produced",
    deliverables: [
      "Issue-tracking flow",
      "IT asset visibility",
      "Operational handoff points",
      "Process documentation",
    ],
    impact:
      "Helped shape a stronger operational foundation by improving visibility, accountability, and consistency in support and service activities.",
    tags: ["IT support", "Documentation", "Process improvement", "Stakeholder alignment"],
    accent: ["#22c55e", "#1d9bf0", "#fbbf24"],
  },
];

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
] as const;
