"use client";

import { useEffect, useState } from "react";

type TrackKey = "ai" | "ba";

type Project = {
  id: string;
  title: string;
  context: string;
  summary: string;
  impact: string;
  tags: string[];
  metrics?: string[];
  liveUrl?: string;
  image?: string;
  accent?: [string, string, string];
};

const trackMeta = {
  ai: {
    label: "AI Engineer",
    badge: "Open to Work",
    headline: "I build practical systems that make work clearer, faster, and smarter.",
    intro:
      "I’m a product-minded AI Engineer with hands-on experience designing intelligent workflows, automation tools, and user-centered digital experiences that improve operational efficiency and decision-making.",
  },
  ba: {
    label: "Business Analyst",
    badge: "Open to Work",
    headline: "I turn complex business problems into clear strategy and momentum.",
    intro:
      "I’m a Business Analyst focused on solving operational pain points through requirements gathering, stakeholder alignment, process improvement, and delivery planning that keeps teams moving with clarity.",
  },
} as const;

const roleSkills = {
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

const aiProjects: Project[] = [
  {
    id: "whatsapp-bot",
    title: "WhatsApp Automation Bot",
    context: "Order flow and service automation",
    summary:
      "Built a WhatsApp automation bot that captured incoming requests, synchronized order and customer details, and reduced manual coordination across service flows.",
    impact:
      "Improved response speed and reduced operating friction by turning repetitive customer communication and order tracking into a smoother automated workflow.",
    tags: ["WhatsApp", "Automation", "Order flow", "Workflow", "Integration"],
    metrics: ["Automation", "Response speed", "Order sync", "Workflow clarity"],
    image: "/whatsapp-bot-architecture.svg",
    accent: ["#34d399", "#1d9bf0", "#8b5cf6"],
  },
  {
    id: "guardrail",
    title: "Guardrail",
    context: "AI risk monitoring workflow",
    summary:
      "Built a product experience for AI risk visibility, workflow control, and operational safeguards with a clear decision-making surface for teams.",
    impact:
      "Improved operational confidence by making AI oversight more visible, structured, and easier to govern in real execution environments.",
    tags: ["Next.js", "AI Ops", "UX", "Dashboard", "Workflow"],
    metrics: ["Risk visibility", "Workflow clarity", "Operations control", "Team review"],
    liveUrl: "https://guardrail-ashen.vercel.app/",
    image: "/guardrail-brand.svg",
    accent: ["#1d9bf0", "#8b5cf6", "#34d399"],
  },
  {
    id: "treasurevilla",
    title: "Treasurevilla",
    context: "Conversion-focused product experience",
    summary:
      "Designed a polished digital journey with strong information flow, conversion-oriented structure, and modern product storytelling for a user-first experience.",
    impact:
      "Created a credible, high-quality front-end experience that supports clearer brand communication and stronger customer engagement.",
    tags: ["Next.js", "Landing UX", "Product design", "Conversion", "Front-end"],
    metrics: ["Journey design", "Mobile-ready", "Offer clarity", "Conversion flow"],
    liveUrl: "https://ln.run/M3RYD",
    image: "/treasureville-login.svg",
    accent: ["#f59e0b", "#f472b6", "#1d9bf0"],
  },
  {
    id: "ai-operations",
    title: "AI Operations Workflow",
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

const baProjects: Project[] = [
  {
    id: "guardrail-ba",
    title: "Guardrail",
    context: "Business process and strategic oversight",
    summary:
      "Evaluated operational models, stakeholder touchpoints, and governance needs to turn a complex AI workflow into a clearer service design and decision process.",
    impact:
      "Improved clarity around workflow ownership, governance, and execution priorities by structuring a more dependable operating model.",
    tags: ["Process design", "Governance", "Risk review", "Stakeholders", "Operations"],
    metrics: ["Workflow design", "Governance mapping", "Stakeholder clarity", "Operational readiness"],
    liveUrl: "https://guardrail-ashen.vercel.app/",
    image: "/guardrail-backlog.svg",
    accent: ["#1d9bf0", "#8b5cf6", "#34d399"],
  },
  {
    id: "treasurevilla-ba",
    title: "Treasurevilla",
    context: "User journey and conversion strategy",
    summary:
      "Mapped the user journey and conversion flow to improve engagement quality, information clarity, and conversion-focused decision points across the experience.",
    impact:
      "Powered a stronger customer journey by clarifying user intent, information flow, and the transition from interest to action.",
    tags: ["Journey mapping", "Conversion", "UX", "Service flow", "Research"],
    metrics: ["User flow", "Journey clarity", "Offer structure", "Engagement"],
    liveUrl: "https://ln.run/M3RYD",
    image: "/treasureville-preview.png",
    accent: ["#f59e0b", "#f472b6", "#1d9bf0"],
  },
  {
    id: "internship-ba",
    title: "Enterprise IT Internship",
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111315] md:p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1d9bf0] via-[#8b5cf6] to-[#facc15]" />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">{project.context}</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.06em] text-[#111111] dark:text-white">{project.title}</h3>
        </div>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-[#1d9bf0]/20 bg-[#1d9bf0] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(29,155,240,0.28)] transition hover:bg-[#0f8ada] dark:bg-[#1d9bf0]"
          >
            Check out
          </a>
        ) : null}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[22px] border border-black/5 bg-[#f6f7f8] p-3 dark:border-white/10 dark:bg-[#181a1d]">
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-black/5 bg-white px-3 py-2 dark:border-white/10 dark:bg-[#0f1113]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1d9bf0]" />
              <span className="h-2.5 w-16 rounded-full bg-[#d4d4d8] dark:bg-[#374151]" />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">Preview</span>
          </div>

          {project.image ? (
            project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-[18px] border border-black/5 bg-white shadow-inner transition hover:opacity-95 dark:border-white/10 dark:bg-[#101214]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[240px] w-full object-cover object-top"
                />
              </a>
            ) : (
              <div className="overflow-hidden rounded-[18px] border border-black/5 bg-white shadow-inner dark:border-white/10 dark:bg-[#101214]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[240px] w-full object-cover object-top"
                />
              </div>
            )
          ) : (
            <div
              className="rounded-[18px] border border-black/5 p-3 shadow-inner dark:border-white/10"
              style={{
                background: `linear-gradient(135deg, ${project.accent?.[0] ?? "#1d9bf0"} 0%, ${project.accent?.[1] ?? "#8b5cf6"} 50%, ${project.accent?.[2] ?? "#34d399"} 100%)`,
              }}
            >
              <div className="rounded-[16px] border border-white/40 bg-[#0f172a]/15 p-3 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-2.5 w-20 rounded-full bg-white/70" />
                  <div className="h-2.5 w-12 rounded-full bg-[#f8fafc]/80" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white/80" />
                      <span className="block h-2.5 flex-1 rounded-full bg-white/35" style={{ width: `${72 + index * 6}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2">
            {project.metrics?.slice(0, 3).map((metric, index) => (
              <div key={metric} className="rounded-xl border border-black/5 bg-[#f7f7f7] p-2 text-center dark:border-white/10 dark:bg-[#0f1113]">
                <span className="mb-1 block h-2 w-2 rounded-full mx-auto" style={{ backgroundColor: ["#1d9bf0", "#8b5cf6", "#34d399"][index % 3] }} />
                <span className="text-[9px] font-medium text-[#111111] dark:text-white">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[20px] border border-black/5 bg-[#f8f8f8] p-4 dark:border-white/10 dark:bg-[#0f1113]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">Summary</p>
            <p className="mt-3 text-base leading-7 text-[#1f2937] dark:text-[#e5e7eb]">{project.summary}</p>
          </div>

          <div className="rounded-[20px] bg-[#111111] p-4 text-white dark:bg-[#f5f5f5] dark:text-[#111111]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a1a1aa] dark:text-[#374151]">Impact</p>
            <p className="mt-3 text-base leading-7 text-white dark:text-[#111111]">{project.impact}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-black/10 bg-[#f3f4f6] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#111111] dark:border-white/10 dark:bg-white/5 dark:text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("ai");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const currentTrack = trackMeta[activeTrack];
  const projects = activeTrack === "ai" ? aiProjects : baProjects;
  const isBA = activeTrack === "ba";
  const accentColor = isBA ? "#f59e0b" : "#1d9bf0";
  const accentSoft = isBA ? "rgba(245, 158, 11, 0.18)" : "rgba(29, 155, 240, 0.18)";

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(29,155,240,0.08),_transparent_28%),linear-gradient(180deg,_#f5f5f3_0%,_#f0efee_100%)] text-[#111111] transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,_rgba(29,155,240,0.18),_transparent_28%),linear-gradient(180deg,_#07090b_0%,_#0f1113_100%)] dark:text-[#f5f5f5]">
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-8">
          <header className="sticky top-4 z-20 mb-8 rounded-full border border-black/10 bg-white/80 px-4 py-3 shadow-[0_10px_30px_rgba(17,17,17,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111315]/80">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 overflow-hidden rounded-full border border-black/10 bg-[#111111] dark:border-white/10">
                  <img src={isBA ? "/profile-portrait.jpg" : "/profile-portrait.png"} alt="Temitope Ajayi portrait" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#d1d5db]">Temitope Ajayi</p>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>AI • BA</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-full border border-black/10 bg-[#f5f5f5] p-1 dark:border-white/10 dark:bg-[#181a1d]">
                  {(["ai", "ba"] as TrackKey[]).map((track) => (
                    <button
                      key={track}
                      onClick={() => setActiveTrack(track)}
                      className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                        activeTrack === track
                          ? isBA
                            ? "bg-[#f59e0b] text-[#111111] shadow-md"
                            : "bg-[#111111] text-white shadow-md dark:bg-white dark:text-[#111111]"
                          : "text-[#374151] hover:text-[#111111] dark:text-[#d1d5db] dark:hover:text-white"
                      }`}
                    >
                      {track === "ai" ? "AI Engineer" : "Business Analyst"}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full border border-black/10 bg-[#111111] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#1f2937] dark:border-white/10 dark:bg-white dark:text-[#111111]"
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
            </div>
          </header>

          <main className="space-y-8 pb-20">
            <section className="rounded-[36px] border border-black/10 bg-[#fdfdfd] p-5 shadow-[0_18px_50px_rgba(17,17,17,0.05)] dark:border-white/10 dark:bg-[#111315] md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div>
                  <div
                    className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{
                      borderColor: isBA ? "rgba(245, 158, 11, 0.38)" : "rgba(29, 155, 240, 0.30)",
                      background: isBA ? "rgba(245, 158, 11, 0.12)" : "rgba(29, 155, 240, 0.10)",
                      color: isBA ? "#8a5b00" : "#0f6fb5",
                    }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    {currentTrack.badge}
                  </div>

                  <h1 className="max-w-xl text-4xl font-black leading-[0.9] tracking-[-0.08em] text-[#111111] dark:text-white md:text-6xl">
                    {currentTrack.headline}
                  </h1>

                  <p className="mt-5 max-w-xl text-lg leading-8 text-[#374151] dark:text-[#d1d5db]">
                    {currentTrack.intro}
                  </p>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#4b5563] dark:text-[#cbd5e1]">
                    I combine AI engineering, business analysis, and product thinking to design systems that are not only intelligent, but practical, human-centered, and ready for real-world execution.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="#projects"
                      className="rounded-full px-5 py-3 text-sm font-semibold text-white transition dark:bg-white dark:text-[#111111] dark:hover:bg-[#dfeafc]"
                      style={{
                        backgroundColor: isBA ? "#f59e0b" : "#111111",
                        color: isBA ? "#111111" : "#ffffff",
                      }}
                    >
                      View work
                    </a>
                    <a
                      href="mailto:jaztemi04@gmail.com"
                      className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition dark:border-white/10 dark:bg-[#181a1d] dark:text-white"
                      style={{ borderColor: isBA ? "rgba(245, 158, 11, 0.4)" : undefined, color: isBA ? "#8a5b00" : undefined }}
                    >
                      Contact me
                    </a>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Focus", value: activeTrack === "ai" ? "Product systems" : "Business operations" },
                      { label: "Approach", value: "Strategic & scalable" },
                      { label: "Style", value: "Execution-focused" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[20px] border border-black/10 bg-[#f8f8f8] p-3 dark:border-white/10 dark:bg-[#181a1d]">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">{item.label}</p>
                        <p className="mt-2 text-sm font-semibold text-[#111111] dark:text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="absolute inset-6 rounded-[32px] blur-3xl"
                    style={{
                      background: isBA
                        ? "linear-gradient(135deg, rgba(245,158,11,0.24), rgba(251,191,36,0.15), rgba(255,244,214,0.10))"
                        : "linear-gradient(135deg, rgba(29,155,240,0.20), rgba(139,92,246,0.15), rgba(250,204,21,0.10))",
                    }}
                  />
                  <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#111111] p-3 shadow-[0_30px_60px_rgba(17,17,17,0.22)] dark:border-white/10 dark:bg-[#0d0f12]">
                    <div className="rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(17,17,17,0.9)_30%,_#0a0b0d_100%)] p-3">
                      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#101214]">
                        <img src={isBA ? "/profile-portrait.jpg" : "/profile-portrait.png"} alt="Temitope Ajayi portrait" className="h-[520px] w-full object-cover object-center" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      <span>Available now</span>
                      <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#34d399]" /> Open to work</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-black/10 bg-[#fdfdfd] p-5 shadow-[0_18px_50px_rgba(17,17,17,0.04)] dark:border-white/10 dark:bg-[#111315] md:p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">Core strengths</p>
                <span className="rounded-full border border-black/10 bg-[#f5f5f5] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#374151] dark:border-white/10 dark:bg-[#181a1d] dark:text-[#d1d5db]">
                  {activeTrack === "ai" ? "AI engineer tools" : "BA capabilities"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {roleSkills[activeTrack].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
                    style={{
                      borderColor: isBA ? "rgba(245, 158, 11, 0.32)" : "rgba(29, 155, 240, 0.28)",
                      background: isBA ? "rgba(245, 158, 11, 0.10)" : "rgba(29, 155, 240, 0.08)",
                      color: isBA ? "#7a5300" : "#0f6fb5",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section id="projects" className="space-y-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">Featured work</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#111111] dark:text-white md:text-4xl">
                    {activeTrack === "ai" ? "AI engineer portfolio" : "Business analyst portfolio"}
                  </h2>
                </div>
                <div className="rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#374151] dark:border-white/10 dark:bg-[#111315] dark:text-[#d1d5db]">
                  Confidential project references
                </div>
              </div>

              <div className="space-y-5">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            <section className="rounded-[32px] border border-black/10 bg-[#fdfdfd] p-6 shadow-[0_18px_50px_rgba(17,17,17,0.04)] dark:border-white/10 dark:bg-[#111315] md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>Available now</p>
                  <h3 className="mt-2 max-w-2xl text-3xl font-black tracking-[-0.06em] text-[#111111] dark:text-white md:text-4xl">
                    {activeTrack === "ai" ? "I build tools and workflows that create practical leverage." : "I turn business complexity into clear action."}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="tel:+2349060668794" className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d9bf0] dark:bg-white dark:text-[#111111]">
                    Open to work
                  </a>
                  <a href="mailto:jaztemi04@gmail.com" className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#1d9bf0] hover:text-[#1d9bf0] dark:border-white/10 dark:bg-[#181a1d] dark:text-white">
                    Request a brief
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
