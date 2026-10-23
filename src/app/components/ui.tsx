"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- One shared scroll listener, fanned out on a single animation frame ---------- */
const scrollSubscribers = new Set<(y: number) => void>();
let scrollBound = false;
function subscribeScroll(cb: (y: number) => void) {
  scrollSubscribers.add(cb);
  if (!scrollBound) {
    scrollBound = true;
    let raf = 0;
    const tick = () => {
      raf = 0;
      scrollSubscribers.forEach((fn) => fn(window.scrollY));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }
  cb(window.scrollY);
  return () => {
    scrollSubscribers.delete(cb);
  };
}

/* ---------- Smooth, inertial scrolling; in-page links glide ---------- */
let lenisInstance: Lenis | null = null;
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: id === "home" ? 0 : -60, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
export function scrollToTop(immediate = false) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3.2) });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
  return null;
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Splits a headline into words that rise out of a mask, one after another. */
export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="word">
            <span style={{ "--i": i } as CSSProperties}>{word}</span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/** Each letter rises into place, one after another, when the parent Reveal becomes visible. */
export function Letters({ text }: { text: string }) {
  return (
    <span className="letters" aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="letter">
          <span style={{ "--i": i } as CSSProperties}>{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

/** Words brighten one by one as you scroll through the paragraph. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    if (reducedMotion()) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    return subscribeScroll(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6)));
      const n = spans.length;
      spans.forEach((s, i) => {
        const t = Math.min(1, Math.max(0, p * (n + 4) - i) / 3);
        s.style.opacity = (0.22 + 0.78 * t).toFixed(2);
      });
    });
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w style={{ opacity: 0.22 }}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/** Moves its content at a different speed from the page, for depth. */
export function Parallax({ children, speed = -0.06 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !finePointer()) return;
    return subscribeScroll(() => {
      const r = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(offset * speed).toFixed(1)}px, 0)`;
    });
  }, [speed]);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(
    () =>
      subscribeScroll((y) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      }),
    [],
  );
  return progress;
}

/** Hero picture: wipes in, then drifts slowly against the scroll. */
export function DriftImage({ src, alt, position = "50% 0%" }: { src: string; alt: string; position?: string }) {
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    return subscribeScroll((y) => {
      if (inner.current) inner.current.style.transform = `translate3d(0, ${(-Math.min(y, 1200) * 0.05).toFixed(1)}px, 0)`;
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: "4 / 5" }}>
      <div ref={inner} className="absolute inset-x-0 top-0 -bottom-[8%] will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={src} src={src} alt={alt} width={1200} height={1500} fetchPriority="high" className="hero-img h-full w-full object-cover" style={{ objectPosition: position }} />
      </div>
      <div aria-hidden="true" className="img-wipe absolute inset-0 bg-paper" />
    </div>
  );
}

/* ---------- First-visit curtain ---------- */
export function Loader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const d = document.documentElement;
    if (d.classList.contains("seen") || reducedMotion()) {
      d.classList.add("seen");
      setGone(true);
      return;
    }
    const t = setTimeout(() => {
      d.classList.add("seen");
      try {
        sessionStorage.setItem("seen", "1");
      } catch {}
    }, 1500);
    const t2 = setTimeout(() => setGone(true), 2300);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <p className="display text-[clamp(2rem,7vw,5rem)]">
          <Words text="Temitope Ajayi" />
        </p>
        <p className="loader-sub text-[15px]">AI Engineer &amp; Business Analyst</p>
      </div>
    </div>
  );
}

/* ---------- Cursor follower with labels, plus magnetic buttons (fine pointers only) ---------- */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(finePointer() && !reducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const rEl = ring.current!;
    const dEl = dot.current!;
    const lEl = label.current!;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      rEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const resetMagnet = () => {
      if (magnet) {
        magnet.style.setProperty("--mx", "0px");
        magnet.style.setProperty("--my", "0px");
        magnet = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        rEl.style.opacity = "1";
        dEl.style.opacity = "1";
      }
      const t = e.target as Element;
      const lab = t.closest?.("[data-cursor]") as HTMLElement | null;
      const link = t.closest?.("a, button, input, textarea, [role='button']");
      if (lab) {
        lEl.textContent = lab.dataset.cursor ?? "";
        rEl.classList.add("is-label");
      } else {
        rEl.classList.remove("is-label");
      }
      rEl.classList.toggle("is-link", !!link && !lab);

      const m = t.closest?.(".btn") as HTMLElement | null;
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty("--mx", `${((e.clientX - (r.left + r.width / 2)) * 0.28).toFixed(1)}px`);
        m.style.setProperty("--my", `${((e.clientY - (r.top + r.height / 2)) * 0.35).toFixed(1)}px`);
        if (magnet && magnet !== m) resetMagnet();
        magnet = m;
      } else resetMagnet();
    };
    const onLeave = () => {
      shown = false;
      rEl.style.opacity = "0";
      dEl.style.opacity = "0";
      resetMagnet();
    };
    const onDown = () => rEl.classList.add("is-down");
    const onUp = () => rEl.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

/* ---------- Side indicator for the current section ---------- */
export function SectionDots({ sections }: { sections: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const key = sections.map((s) => s.id).join(",");

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <nav aria-label="Sections" className="section-dots hidden xl:flex">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} aria-label={s.label} aria-current={active === s.id ? "true" : undefined} className="sdot">
          <span className="sdot-label">{s.label}</span>
          <span className="sdot-mark" />
        </a>
      ))}
    </nav>
  );
}
