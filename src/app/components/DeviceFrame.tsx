import type { CSSProperties } from "react";
import type { Project } from "../data";

export function hostOf(url?: string) {
  if (!url) return "confidential";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "project";
  }
}

type FrameProps = {
  src?: string;
  alt: string;
  label: string;
  /** Height / width of a full-page image; when set it scrolls on hover */
  tall?: number;
  href?: string;
  linkLabel?: string;
};

/** A flat browser-style frame: solid ink bar, square corners, no shadow at rest. */
export function Frame({ src, alt, label, tall, href, linkLabel }: FrameProps) {
  const dur = tall ? Math.max(5, tall * 1.7).toFixed(1) : "0";

  const viewport = (
    <div data-cursor={!href && tall ? "Scroll" : undefined} className="scroll-viewport relative overflow-hidden bg-surface" style={{ aspectRatio: "16 / 10", containerType: "size", "--dur": `${dur}s` } as CSSProperties}>
      {src && tall ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={1100} height={Math.round(1100 * tall)} loading="lazy" decoding="async" className="scroll-img absolute left-0 top-0 block w-full" />
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={1440} height={900} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full bg-white object-cover object-top" />
      ) : null}
      {href ? (
        <span className="absolute bottom-0 left-0 translate-y-full bg-accent px-5 py-3 text-[15px] font-semibold text-onaccent transition-transform duration-300 group-hover/frame:translate-y-0 group-focus-visible/frame:translate-y-0">
          {linkLabel ?? "Open live site ↗"}
        </span>
      ) : null}
    </div>
  );

  return (
    <div className="group/frame">
      <div className="flex items-center gap-3 bg-ink px-4 py-3 text-paper">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-paper/35" />
          <i className="h-2.5 w-2.5 rounded-full bg-paper/35" />
          <i className="h-2.5 w-2.5 rounded-full bg-paper/35" />
        </span>
        <span className="min-w-0 flex-1 truncate bg-paper/15 px-3 py-1 text-[14px]">{label}</span>
        {tall ? <span className="scroll-hint hidden text-[13px] opacity-70">Hover to scroll</span> : null}
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" aria-label={alt} data-cursor="Visit" className="group/link block">
          {viewport}
        </a>
      ) : (
        viewport
      )}
    </div>
  );
}

export function DeviceFrame({ project }: { project: Project }) {
  return (
    <Frame
      src={project.image}
      alt={`${project.title} ${project.tall ? "website, full page" : "preview"}`}
      label={project.liveUrl ? hostOf(project.liveUrl) : project.id.startsWith("internship") ? "internal project" : "confidential"}
      tall={project.tall}
      href={project.liveUrl}
    />
  );
}
