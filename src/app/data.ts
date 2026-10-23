export type TrackKey = "ai" | "ba";

export type Project = {
  id: string;
  title: string;
  category: string;
  context: string;
  summary: string;
  impact: string;
  tags: string[];
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

export const roleSkills = {
  ai: [
    "Python",
    "TypeScript",
    "Next.js",
    "React",
    "AI automation",
    "NLP",
    "Prompt design",
    "API integration",
    "SQL",
    "Power BI",
    "Workflow design",
    "Product thinking",
  ],
  ba: [
    "Requirements gathering",
    "Process mapping",
    "Stakeholder management",
    "Gap analysis",
    "Business process design",
    "Jira",
    "UAT",
    "Data analysis",
    "Documentation",
    "Risk assessment",
    "Service improvement",
    "Solution design",
  ],
} as const;

export const services = {
  ai: [
    {
      icon: "⚡",
      title: "Workflow & AI automation",
      body: "Turn repetitive intake, follow-up and coordination work into reliable automated flows.",
    },
    {
      icon: "💬",
      title: "Chat & voice bots",
      body: "WhatsApp and voice assistants that take orders, answer questions and hand off cleanly to people.",
    },
    {
      icon: "🧩",
      title: "Custom web apps",
      body: "Fast, responsive Next.js products, from check-in systems to audit dashboards.",
    },
    {
      icon: "📊",
      title: "Data & dashboards",
      body: "SQL and Power BI views that make performance and risk visible at a glance.",
    },
  ],
  ba: [
    {
      icon: "🔍",
      title: "Discovery & requirements",
      body: "Structured workshops and interviews that turn vague asks into testable requirements.",
    },
    {
      icon: "🗺️",
      title: "Process mapping & redesign",
      body: "Current-state to future-state maps that expose gaps, risks and quick wins.",
    },
    {
      icon: "🤝",
      title: "Stakeholder alignment",
      body: "Keep business, product and engineering moving in the same direction.",
    },
    {
      icon: "✅",
      title: "UAT & delivery support",
      body: "Clear acceptance criteria, test coordination and documentation that survive handoff.",
    },
  ],
} as const;

export const processSteps = [
  {
    title: "Discover",
    body: "Understand the people, the pain and what success actually looks like before anything is built.",
  },
  {
    title: "Map",
    body: "Make the current flow visible (handoffs, gaps and risks) and agree on the target state.",
  },
  {
    title: "Build",
    body: "Ship in small, usable slices, with the right people reviewing early and often.",
  },
  {
    title: "Measure",
    body: "Track response time, accuracy and adoption, then refine until the change sticks.",
  },
] as const;

export const principles = [
  { title: "Product-minded", body: "I start from the user and the outcome, not the tech." },
  { title: "Execution-focused", body: "Clear scope, visible progress, things that actually ship." },
  { title: "Human-centered", body: "Systems that are intelligent, but also practical to use." },
] as const;

const newProjects: Project[] = [
  {
    id: "mayoher",
    title: "Mayoher",
    category: "Web Apps",
    context: "Music, books and events platform",
    summary:
      "Designed and built the Mayoher website: one home for music, books, devotionals, videos and live events, with an immersive hero, a shop, a conference page and a mailing-list sign-up.",
    impact:
      "Gave the brand a polished, memorable online presence where visitors can discover content, shop and join the list in a few clicks.",
    tags: ["Branding", "E-commerce", "Content", "Responsive design"],
    metrics: ["Immersive hero", "Shop", "Mailing list"],
    liveUrl: "https://www.mayoher.com/",
    image: "/shots/mayoher-full.jpg",
    tall: 5.382,
    accent: ["#f472b6", "#8b5cf6", "#1d9bf0"],
  },
  {
    id: "sophia-academy",
    title: "Sophia Academy",
    category: "Web Apps",
    context: "Biblical academy for believers",
    summary:
      "Built the Sophia Academy platform where believers join the live Sunday class, catch up on replays they missed and follow their progress week by week, with student login and facilitator profiles.",
    impact:
      "Gave students one calm, trustworthy place to attend, replay and track their learning, and gave the academy a strong digital identity.",
    tags: ["Education", "Student login", "Live classes", "UX", "Responsive design"],
    metrics: ["Live classes", "Replays", "Progress tracking"],
    liveUrl: "https://www.sophiaacademy.net/",
    image: "/shots/sophia-full.jpg",
    tall: 2.216,
    accent: ["#22c55e", "#1d9bf0", "#fbbf24"],
  },
];

export const aiProjects: Project[] = [
  ...newProjects,
  {
    id: "whatsapp-bot",
    title: "WhatsApp Automation Bot",
    category: "AI & Automation",
    context: "Order taking, payments, and service automation",
    summary:
      "Built a WhatsApp automation bot that takes customer orders directly in-chat, processes payment for those orders, and synchronizes order and customer details across service flows.",
    impact:
      "Improved response speed and reduced operating friction by turning order taking, payment collection, and customer communication into a single automated workflow.",
    tags: ["WhatsApp", "Payments", "Automation", "Order flow", "Integration"],
    metrics: ["Automation", "Payments", "Order sync", "Response speed"],
    image: "/whatsapp-bot-architecture.svg",
    accent: ["#34d399", "#1d9bf0", "#8b5cf6"],
  },
  {
    id: "guardrail",
    title: "Guardrail Financials",
    category: "Fintech",
    context: "Bookkeeping audit platform for SMEs",
    summary:
      "Built an audit platform that lets SMEs check their books, surfacing financial records, discrepancies, and risk areas through a clear, structured review workflow.",
    impact:
      "Improved financial oversight for small businesses by making book audits faster, more visible, and easier to act on without needing a full-time auditor.",
    tags: ["Next.js", "Audit", "Fintech", "Dashboard", "Workflow"],
    metrics: ["Book audits", "Risk visibility", "Workflow clarity", "SME-ready"],
    liveUrl: "https://guardrail-ashen.vercel.app/",
    image: "/shots/guardrail-full.jpg",
    tall: 5.16,
    accent: ["#1d9bf0", "#8b5cf6", "#34d399"],
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
    metrics: ["Unique codes", "Check-in speed", "Mobile-ready", "Verification"],
    liveUrl: "https://ln.run/M3RYD",
    image: "/treasureville-login.svg",
    accent: ["#f59e0b", "#f472b6", "#1d9bf0"],
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
    metrics: ["Multilingual", "Compliance", "Fraud detection", "Handling time"],
    liveUrl: "https://nexavoice-delta.vercel.app/",
    image: "/shots/nexavoice-full.jpg",
    tall: 3.413,
    accent: ["#6366f1", "#22d3ee", "#f59e0b"],
  },
  {
    id: "ai-operations",
    title: "AI Operations Workflow",
    category: "Operations",
    context: "Automation and process optimization",
    summary:
      "Designed an AI-assisted operations flow for handling recurring service and intake tasks with clearer structure, less manual dependency, and stronger execution consistency.",
    impact:
      "Improved process quality and response speed by transforming repetitive coordination into a more reliable, systemized workflow.",
    tags: ["AI workflow", "Automation", "Ops design", "Decision support", "Process mapping"],
    metrics: ["Automation", "Response speed", "Consistency", "Workflow clarity"],
    accent: ["#34d399", "#1d9bf0", "#8b5cf6"],
  },
  {
    id: "intake-automation",
    title: "AI Intake & Screening Flow",
    category: "Operations",
    context: "Structured decision support",
    summary:
      "Developed a workflow that organizes incoming requests, standardizes evaluation pathways, and reduces the manual effort required in high-volume decision tasks.",
    impact:
      "Allowed work to move faster with better consistency by turning ad hoc intake into a more structured screening model.",
    tags: ["AI workflow", "Automation", "Screening", "Data handling", "Evaluation"],
    metrics: ["Intake structure", "Automation", "Screening flow", "Efficiency"],
    accent: ["#1d9bf0", "#22c55e", "#fbbf24"],
  },
  {
    id: "ops-visibility",
    title: "Ops Visibility Layer",
    category: "Operations",
    context: "Operational monitoring and alignment",
    summary:
      "Built a practical monitoring layer for operational work, helping teams track movement, visibility, and decision support in a cleaner format.",
    impact:
      "Strengthened team coordination by improving visibility across service flow and operational decision points.",
    tags: ["Monitoring", "AI ops", "Feedback", "Process design", "Visibility"],
    metrics: ["Visibility", "Coordination", "Feedback", "Operational clarity"],
    accent: ["#8b5cf6", "#14b8a6", "#f59e0b"],
  },
];

export const baProjects: Project[] = [
  ...newProjects.map((p) => ({ ...p, id: `${p.id}-ba` })),
  {
    id: "guardrail-ba",
    title: "Guardrail Financials",
    category: "Fintech",
    context: "Bookkeeping audit process for SMEs",
    summary:
      "Evaluated how small businesses check their books and turned that into a structured audit workflow, mapping stakeholder touchpoints, review steps, and risk areas into a clearer service design.",
    impact:
      "Improved clarity around audit ownership, review priorities, and reporting by structuring a more dependable book-checking process for SMEs.",
    tags: ["Process design", "Audit", "Risk review", "Stakeholders", "SME operations"],
    metrics: ["Audit workflow", "Risk mapping", "Stakeholder clarity", "Reporting readiness"],
    liveUrl: "https://guardrail-ashen.vercel.app/",
    image: "/guardrail-backlog.svg",
    accent: ["#1d9bf0", "#8b5cf6", "#34d399"],
  },
  {
    id: "treasurevilla-ba",
    title: "Treasureville",
    category: "Web Apps",
    context: "Kids check-in journey and process design",
    summary:
      "Mapped the end-to-end check-in journey for kids, from unique code issuance to staff verification and pickup, to improve clarity, speed, and safety at every handoff.",
    impact:
      "Powered a faster, more trustworthy check-in process by clarifying exactly how codes are issued, verified, and matched at pickup.",
    tags: ["Journey mapping", "Check-in", "UX", "Service flow", "Research"],
    metrics: ["Check-in flow", "Code verification", "Pickup safety", "Process clarity"],
    liveUrl: "https://ln.run/M3RYD",
    image: "/treasureville-preview.png",
    accent: ["#f59e0b", "#f472b6", "#1d9bf0"],
  },
  {
    id: "internship-ba",
    title: "Enterprise IT Internship",
    category: "Operations",
    context: "Process improvement and service operations",
    summary:
      "Worked across issue tracking, IT asset visibility, and operational handoff points to improve clarity, documentation, and service continuity in a complex environment.",
    impact:
      "Helped shape a stronger operational foundation by improving visibility, accountability, and consistency in support and service activities.",
    tags: ["IT support", "Asset flow", "Documentation", "Process improvement", "Stakeholder alignment"],
    metrics: ["Issue flow", "Support structure", "Asset visibility", "Service continuity"],
    accent: ["#22c55e", "#1d9bf0", "#fbbf24"],
  },
];

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
] as const;
