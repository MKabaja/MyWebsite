"use client";

import type { MouseEvent, ReactNode } from "react";
import { ScrollSmoother } from "@/lib/gsap";

/** In-page anchor that scrolls through ScrollSmoother when it is active (native smooth scroll otherwise). */
export function ScrollDownLink({
  targetId,
  label,
  className = "",
  children,
}: {
  targetId: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    event.preventDefault();
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, "top top");
    else {
      const reduced = window.matchMedia("(max-width: 991px) and (prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    }
  };

  return (
    <a href={`#${targetId}`} aria-label={label} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
