import type { SimpleIcon } from "simple-icons";

/** Monochrome brand logo from simple-icons (inherits `currentColor`). */
export function TechIcon({ icon, className = "", title }: { icon: SimpleIcon; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} role={title ? "img" : undefined} aria-hidden={!title}>
      {title && <title>{title}</title>}
      <path d={icon.path} />
    </svg>
  );
}
