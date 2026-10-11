"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type Variant = "underline" | "arrow" | "loop" | "none";

const PATHS: Record<Exclude<Variant, "none">, { viewBox: string; d: string }> = {
  underline: { viewBox: "0 0 200 24", d: "M4 14 C 50 6, 120 4, 196 10 M 30 20 C 80 14, 140 14, 170 18" },
  arrow: { viewBox: "0 0 120 40", d: "M4 30 C 40 34, 80 30, 112 18 M 96 12 L 113 18 L 100 30" },
  loop: { viewBox: "0 0 220 40", d: "M2 30 C 30 10, 50 40, 40 24 C 30 8, 70 6, 110 20 S 190 30, 218 14" },
};

/**
 * Handwritten note (Caveat) with an optional hand-drawn SVG stroke that draws itself
 * when it scrolls into view.
 */
export function Scribble({
  children,
  variant = "underline",
  className = "",
  strokeClassName = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  strokeClassName?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const tween = gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: path, start: "top bottom-=80", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant]);

  const shape = variant === "none" ? null : PATHS[variant];

  return (
    <span className={`inline-flex flex-col font-hand text-[1.6rem] leading-none text-on-dark-muted ${className}`}>
      <span className="text-inherit">{children}</span>
      {shape && (
        <svg viewBox={shape.viewBox} className={`mt-1 h-auto w-full max-w-48 ${strokeClassName}`} fill="none" aria-hidden>
          <path ref={pathRef} d={shape.d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
