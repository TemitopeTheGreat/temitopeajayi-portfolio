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

/** A flat browser frame: solid ink bar, square corners, no shadow at rest. */
export function DeviceFrame({ project }: { project: Project }) {
  const host = hostOf(project.liveUrl);

  const dur = project.tall ? Math.max(5, project.tall * 1.7).toFixed(1) : "0";

  const viewport = (
    <div className="scroll-viewport relative overflow-hidden bg-surface" style={{ aspectRatio: "16 / 10", containerType: "size", "--dur": `${dur}s` } as CSSProperties}>
      {project.image && project.tall ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={`${project.title} website, full page`}
          width={1100}
          height={Math.round(1100 * project.tall)}
          loading="lazy"
          decoding="async"
          className="scroll-img absolute left-0 top-0 block w-full"
        />
      ) : project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image} alt={`${project.title} preview`} width={1440} height={900} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full bg-white object-contain p-4" />
      ) : null}
      {project.liveUrl ? (
        <span className="absolute bottom-0 left-0 translate-y-full bg-accent px-5 py-3 text-[15px] font-semibold text-onaccent transition-transform duration-300 group-hover/frame:translate-y-0 group-focus-visible/frame:translate-y-0">
          Open live site ↗
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
        <span className="min-w-0 flex-1 truncate bg-paper/15 px-3 py-1 text-[14px]">{host}</span>
        {project.tall ? <span className="scroll-hint hidden text-[13px] opacity-70">Hover to scroll the site</span> : null}
      </div>
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live site`} className="group/link block">
          {viewport}
        </a>
      ) : (
        viewport
      )}
    </div>
  );
}
