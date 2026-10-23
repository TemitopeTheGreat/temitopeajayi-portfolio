"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  CONTACT,
  NAV_LINKS,
  aiProjects,
  baArtefacts,
  baProjects,
  principles,
  processSteps,
  services,
  skillGroups,
  trackMeta,
  type Project,
  type TrackKey,
} from "./data";
import { DeviceFrame, Frame, hostOf } from "./components/DeviceFrame";
import { Cursor, DriftImage, FitText, Letters, Loader, Parallax, Reveal, ScrollWords, SectionDots, SmoothScroll, Words, scrollToTop, useScrollProgress } from "./components/ui";

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 ${className}`}>{children}</div>;
}

const h2 = "display text-[clamp(1.9rem,3.8vw,3.2rem)]";

/* ---------- A project: text on one side, a frame (or a list of what I produced) on the other ---------- */
function Feature({ project, flip, index }: { project: Project; flip: boolean; index: number }) {
  return (
    <section className={index % 2 === 0 ? "bg-surface" : "bg-paper"} aria-labelledby={`p-${project.id}`}>
      <Container className="py-14 md:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
            <p className="text-[15px] text-muted">{project.context}</p>
            <h3 id={`p-${project.id}`} className="display mt-2 text-[clamp(1.7rem,3vw,2.6rem)]">
              {project.title}
            </h3>
            <p className="mt-5 max-w-lg text-[17px] leading-7">{project.summary}</p>
            {project.deliverables ? (
              <div className="mt-5 max-w-lg">
                <p className="text-[17px] font-semibold">What I produced</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[17px] leading-7">
                  {project.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="mt-5 max-w-lg text-[17px] leading-7">
              <strong className="font-semibold">Result: </strong>
              {project.impact}
            </p>
            <p className="mt-4 max-w-lg text-[15px] text-muted">{project.tags.join(", ")}</p>
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn mt-7">
                Visit {hostOf(project.liveUrl)} <span className="arrow" aria-hidden="true">↗</span>
              </a>
            ) : null}
          </Reveal>
          <Reveal delay={0.12} className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            {project.image ? (
              <Parallax speed={-0.05}>
                <DeviceFrame project={project} />
              </Parallax>
            ) : (
              <div className="bg-band p-8 text-bandink md:p-12">
                <p className="text-[15px] opacity-80">{project.flow ? "The journey I mapped" : "Where I worked"}</p>
                {project.flow ? (
                  <ol className="mt-5 space-y-4">
                    {project.flow.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="nums flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-[15px] font-bold text-onaccent">{i + 1}</span>
                        <span className="tight pt-0.5 text-[clamp(1.1rem,2vw,1.5rem)] font-semibold">{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {project.deliverables?.map((d) => (
                      <li key={d} className="tight text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold">
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------- AI view: an index with a cursor-following preview ---------- */
function MoreWork({ projects }: { projects: Project[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<{ src: string; on: boolean }>({ src: "", on: false });

  const move = (e: MouseEvent) => {
    const el = previewRef.current;
    if (el) el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 90}px, 0) rotate(-2deg)`;
  };

  return (
    <div onMouseMove={move}>
      <ul>
        {projects.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={Math.min(i, 3) * 0.07}>
              <article
                tabIndex={0}
                onMouseEnter={() => p.image && setPreview({ src: p.image, on: true })}
                onMouseLeave={() => setPreview((s) => ({ ...s, on: false }))}
                onFocus={() => p.image && setPreview({ src: p.image, on: true })}
                onBlur={() => setPreview((s) => ({ ...s, on: false }))}
                className="row grid gap-2 px-3 py-7 md:grid-cols-12 md:gap-8 md:px-6 md:py-9"
              >
                <h4 className="display text-[clamp(1.4rem,2.4vw,2rem)] md:col-span-5">
                  <span className="row-title">{p.title}</span>
                </h4>
                <div className="md:col-span-7">
                  <p className="text-[15px] opacity-70">
                    {p.context}
                    {p.liveUrl ? null : " (confidential)"}
                  </p>
                  <p className="mt-2 max-w-2xl text-[17px] leading-7">{p.summary}</p>
                  <p className="mt-3 text-[15px] opacity-70">{p.tags.join(", ")}</p>
                  {p.liveUrl ? (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="tlink mt-3 inline-block font-semibold">
                      Visit {hostOf(p.liveUrl)} ↗
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <div ref={previewRef} aria-hidden="true" className={`hover-preview bg-white ${preview.on ? "on" : ""}`}>
        {preview.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview.src} alt="" width={680} height={425} className="aspect-[16/10] w-full object-contain p-2" />
        ) : null}
      </div>
    </div>
  );
}

/* ---------- BA view: real artefacts from the Guardrail engagement ---------- */
function Artefacts() {
  const a = baArtefacts;
  return (
    <section id="artefacts" aria-labelledby="artefacts-title" className="bg-paper">
      <Container className="py-16 md:py-28">
        <Reveal>
          <h2 id="artefacts-title" className={h2}>Artefacts from the work</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-7">
            Two deliverables from the Guardrail Financials project: the process map for sign-up, and the backlog the team built from it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="min-w-0 lg:col-span-5">
            <Frame src={a.swimlane.src} tall={a.swimlane.tall} alt={a.swimlane.alt} label="guardrail-registration-swimlane" />
            <p className="mt-3 text-[15px] text-muted">{a.swimlane.caption}</p>
          </Reveal>

          <Reveal delay={0.12} className="min-w-0 lg:col-span-7">
            <h3 className="tight text-[clamp(1.4rem,2.4vw,2rem)] font-bold">User stories, with the error paths covered</h3>
            <p className="mt-3 max-w-xl text-[17px] leading-7">
              Every feature story in the backlog has a matching error-path story. Filtering by date comes with a story for an invalid date range, and manual entry comes with one for missing required fields.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-[16px]">
                <caption className="sr-only">Selected user stories from the Guardrail backlog</caption>
                <thead>
                  <tr className="bg-ink text-paper">
                    <th scope="col" className="px-4 py-3 font-semibold">Key</th>
                    <th scope="col" className="px-4 py-3 font-semibold">User story</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Epic</th>
                  </tr>
                </thead>
                <tbody>
                  {a.stories.map((s) => (
                    <tr key={s.key} className="odd:bg-surface">
                      <td className="nums whitespace-nowrap px-4 py-3 font-semibold">{s.key}</td>
                      <td className="px-4 py-3">{s.story}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-muted">{s.epic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <Frame src={a.backlog.src} alt={a.backlog.alt} label="jira / guardrail / backlog" />
          <p className="mt-3 text-[15px] text-muted">{a.backlog.caption}</p>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("ai");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [hintDismissed, setHintDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lens, setLens] = useState<{ to: TrackKey; n: number } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const progress = useScrollProgress();

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    const view = new URLSearchParams(window.location.search).get("view");
    if (view === "ba" || view === "ai") setActiveTrack(view);
    const timer = setTimeout(() => setHintDismissed(true), 6300);
    return () => clearTimeout(timer);
  }, []);

  const switchTrack = (track: TrackKey) => {
    if (track === activeTrack || lens) return;
    setHintDismissed(true);
    const apply = () => {
      setActiveTrack(track);
      const url = new URL(window.location.href);
      url.searchParams.set("view", track);
      window.history.replaceState(null, "", url);
      scrollToTop(true);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    setLens({ to: track, n: Date.now() });
    setTimeout(apply, 500);
    setTimeout(() => setLens(null), 1050);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${form.name}`;
    const body = `${form.message}\n\n${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const track = trackMeta[activeTrack];
  const isBA = activeTrack === "ba";
  const projects = isBA ? baProjects : aiProjects;
  const features = isBA ? projects : projects.filter((p) => p.image?.startsWith("/shots/"));
  const rest = isBA ? [] : projects.filter((p) => !p.image?.startsWith("/shots/"));
  const lead = ["First", "Then", "Next", "Finally"];
  const navLinks = isBA ? [NAV_LINKS[0], { id: "artefacts", label: "Artefacts" }, ...NAV_LINKS.slice(1)] : NAV_LINKS;

  const sections = [{ id: "home", label: "Intro" }, ...navLinks.map((l) => ({ id: l.id, label: l.label })), { id: "contact", label: "Contact" }];

  const field = "w-full bg-paper px-4 py-3.5 text-[17px] text-ink placeholder:text-muted focus-visible:outline-ink";

  return (
    <div data-track={activeTrack} className="relative">
      <a href="#main" className="skip-link">Skip to Content</a>
      <SmoothScroll />
      <Loader />
      <Cursor />
      <SectionDots sections={sections} />
      {lens ? (
        <div key={lens.n} data-track={lens.to} className="lens-panel" aria-hidden="true">
          <p className="display text-[clamp(2.2rem,8vw,6rem)]">{trackMeta[lens.to].label}</p>
        </div>
      ) : null}
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 bg-paper">
        <Container className="drop flex items-center justify-between gap-3 py-3 md:py-4">
          <a href="#home" className="text-[17px] font-bold tracking-tight">
            <span className="hidden sm:inline">Temitope Ajayi</span>
            <span className="sm:hidden">T. Ajayi</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 text-[16px] md:flex">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="nlink">
                <span className="roll"><span data-text={l.label}>{l.label}</span></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div role="group" aria-label="Choose a view" className="flex text-[14px] font-semibold sm:text-[15px]">
                {(["ai", "ba"] as TrackKey[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTrack(t)}
                    aria-pressed={activeTrack === t}
                    aria-label={t === "ai" ? "AI Engineer view" : "Business Analyst view"}
                    className={`seg px-3 py-2.5 sm:px-5 ${activeTrack === t ? "bg-accent text-onaccent" : "bg-surface text-ink hover:bg-ink hover:text-paper"}`}
                  >
                    <span className="sm:hidden">{t === "ai" ? "AI" : "BA"}</span>
                    <span className="hidden sm:inline">{t === "ai" ? "AI Engineer" : "Business Analyst"}</span>
                  </button>
                ))}
              </div>
              {!hintDismissed ? (
                <div aria-hidden="true" className="hint pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap bg-ink px-3 py-1.5 text-[13px] font-semibold text-paper">
                  Tap to Switch View
                </div>
              ) : null}
            </div>

            <button
              onClick={toggleTheme}
              className="seg bg-surface px-3 py-2.5 text-[14px] font-semibold hover:bg-ink hover:text-paper sm:text-[15px]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </Container>
      </header>

      <main id="main">
        {/* ===== Hero ===== */}
        <section id="home" aria-labelledby="hero-title">
          <Container className="pb-16 pt-6 md:pb-28 md:pt-12">
            <h1 id="hero-title" key={activeTrack} className="display text-[clamp(2rem,6vw,5.2rem)]">
              <Words text={track.headline} />
            </h1>

            <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-14">
              <div key={`${activeTrack}-sub`} className="swap lg:col-span-7" style={{ "--delay": "0.35s" } as CSSProperties}>
                <p className="max-w-lg text-pretty text-[19px] leading-8 md:text-xl">{track.sub}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <a href="#work" className="btn">
                    View the Work <span className="arrow" aria-hidden="true">↓</span>
                  </a>
                  <a href="#contact" className="tlink font-semibold">Email Me</a>
                </div>
                <div className="mt-10 md:mt-14">
                  <p className="text-[15px] text-muted">{isBA ? "Case studies" : "Live right now"}</p>
                  <ul className="mt-2">
                    {features.map((p) => (
                      <li key={p.id}>
                        <a
                          href={p.liveUrl ?? "#work"}
                          {...(p.liveUrl ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="lift tight block py-1 text-[clamp(1.3rem,2vw,1.7rem)] font-bold"
                        >
                          {p.title} <span aria-hidden="true">{p.liveUrl ? "↗" : "↓"}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-5">
                <DriftImage src={isBA ? "/profile-portrait.jpg" : "/profile-portrait.png"} alt="Temitope Ajayi" position="50% 0%" />
              </div>
            </div>
          </Container>
        </section>

        {/* ===== Work ===== */}
        <section id="work" aria-labelledby="work-title">
          <div className="bg-surface">
            <Container className="pb-2 pt-16 md:pt-28">
              <Reveal>
                <h2 id="work-title" className={h2}>{isBA ? "Case studies" : "Selected work"}</h2>
                <p className="mt-4 max-w-xl text-[17px] leading-7">
                  {isBA
                    ? "How I approached the problem, what I produced, and what changed."
                    : "Sites you can open right now, then the systems that live behind company walls."}
                </p>
              </Reveal>
            </Container>
          </div>
          <div key={activeTrack}>
            {features.map((p, i) => (
              <Feature key={p.id} project={p} flip={i % 2 === 1} index={i + 1} />
            ))}
          </div>

          {rest.length > 0 ? (
            <div className={features.length % 2 === 0 ? "bg-paper" : "bg-surface"}>
              <Container className="py-14 md:py-24">
                <Reveal>
                  <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)]">More systems &amp; automation</h3>
                </Reveal>
                <div key={`${activeTrack}-more`} className="mt-8 md:mt-12">
                  <MoreWork projects={rest} />
                </div>
              </Container>
            </div>
          ) : null}
        </section>

        {isBA ? <Artefacts /> : null}

        {/* ===== Services ===== */}
        <section id="services" aria-labelledby="services-title" className={isBA ? "bg-surface" : "bg-paper"}>
          <Container className="py-16 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-5">
                <h2 id="services-title" className={`${h2} lg:sticky lg:top-28`}>
                  {isBA ? "How I help teams" : "What I build for teams"}
                </h2>
              </Reveal>
              <ul key={activeTrack} className="focus-list space-y-9 md:space-y-12 lg:col-span-7">
                {services[activeTrack].map((s, i) => (
                  <li key={s.title}>
                    <Reveal delay={i * 0.08}>
                      <div className="lift">
                        <h3 className="tight text-[clamp(1.3rem,2.2vw,1.9rem)] font-bold">{s.title}</h3>
                        <p className="mt-2 max-w-xl text-[17px] leading-7 text-muted">{s.body}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* ===== About: an inverted band ===== */}
        <section id="about" aria-labelledby="about-title" className="bg-band text-bandink">
          <Container className="py-16 md:py-28">
            <h2 id="about-title" className="sr-only">About</h2>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <ScrollWords key={`${activeTrack}-st`} text={track.statement} className="tight text-[1.35rem] font-semibold md:text-[1.9rem]" />
                <p key={activeTrack} className="swap mt-6 max-w-xl text-[17px] leading-7">{track.intro}</p>
                <dl className="mt-10 grid gap-6 md:grid-cols-3">
                  {principles[activeTrack].map((p) => (
                    <div key={p.title}>
                      <dt className="font-bold">{p.title}</dt>
                      <dd className="mt-1.5 text-[16px] leading-6 opacity-85">{p.body}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.12} className="lg:col-span-5">
                <h3 className="text-lg font-bold">{isBA ? "Skills & methods" : "What I work with"}</h3>
                <div key={activeTrack} className="mt-5 space-y-5">
                  {skillGroups[activeTrack].map((g, i) => (
                    <div key={g.title} className="swap" style={{ "--delay": `${i * 0.07}s` } as CSSProperties}>
                      <p className="text-[15px] opacity-70">{g.title}</p>
                      <p className="mt-1 text-[17px] leading-7">{g.items.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ===== Process: a staircase ===== */}
        <section id="process" aria-labelledby="process-title" className="bg-paper">
          <Container className="py-16 md:py-28">
            <Reveal>
              <h2 id="process-title" className={`${h2} max-w-3xl`}>{isBA ? "How I run an analysis" : "From messy problem to measurable result"}</h2>
            </Reveal>
            <ol key={activeTrack} className="mt-12 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-8 md:pb-32">
              {processSteps[activeTrack].map((step, i) => (
                <li key={step.title} className="stair" style={{ "--off": `${i * 56}px` } as CSSProperties}>
                  <Reveal delay={i * 0.1}>
                    <div className="step-bar mb-4" style={{ "--delay": `${i * 0.1}s` } as CSSProperties} />
                    <p className="text-[15px] font-semibold text-muted">{lead[i]}</p>
                    <h3 className="display mt-1 text-[clamp(1.5rem,2.4vw,2rem)]">{step.title}</h3>
                    <p className="mt-3 text-[17px] leading-7">{step.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ===== Contact: the whole field turns accent ===== */}
        <section id="contact" aria-labelledby="contact-title" className="bg-accent text-onaccent">
          <Container className="py-16 md:py-28">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <h2 id="contact-title" className={h2}>{track.closing}</h2>
                <p className="mt-5 max-w-lg text-[17px] leading-7">
                  I’m open to roles and projects. Send a message and I’ll reply fast.
                </p>
                <button onClick={copyEmail} className="display mt-8 block break-all text-left text-[clamp(1.3rem,3.2vw,2.6rem)] underline decoration-2 underline-offset-[0.18em] hover:decoration-4">
                  {CONTACT.email}
                </button>
                <p aria-live="polite" className="mt-2 h-6 text-[15px] font-semibold">{copied ? "Copied to clipboard." : "Click the address to copy it."}</p>
                <ul className="mt-8 space-y-2 text-[17px] font-semibold">
                  <li><a href={CONTACT.phoneHref} className="tlink">{CONTACT.phone}</a></li>
                  <li><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="tlink">Message on WhatsApp ↗</a></li>
                  <li><a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="tlink">LinkedIn ↗</a></li>
                </ul>
              </Reveal>

              <Reveal delay={0.12} className="lg:col-span-5">
                <form onSubmit={onSubmit} className="grid gap-4 text-ink">
                  <label className="grid gap-1.5 text-[15px] font-semibold text-onaccent">
                    Your name
                    <input name="name" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Jane Okafor…" />
                  </label>
                  <label className="grid gap-1.5 text-[15px] font-semibold text-onaccent">
                    Your email
                    <input name="email" type="email" inputMode="email" spellCheck={false} required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} placeholder="jane@company.com…" />
                  </label>
                  <label className="grid gap-1.5 text-[15px] font-semibold text-onaccent">
                    Message
                    <textarea name="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="Tell me about the role or project…" />
                  </label>
                  <button type="submit" className="btn btn-ink justify-center">
                    Send Message <span className="arrow" aria-hidden="true">→</span>
                  </button>
                  <p className="text-[15px] text-onaccent">This opens your email app with the message ready to send.</p>
                </form>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>

      {/* ===== Footer: the name, full width ===== */}
      <footer className="overflow-hidden bg-paper">
        <Container className="pb-8 pt-14 md:pt-24">
          <Reveal>
            <FitText>
              <Letters text="Temitope Ajayi" />
            </FitText>
          </Reveal>
          <div className="mt-8 flex flex-col justify-between gap-3 text-[15px] text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} Temitope Ajayi. AI Engineer &amp; Business Analyst.</p>
            <a href="#home" className="tlink">Back to Top ↑</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
