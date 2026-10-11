"use client";

import { useEffect, useRef } from "react";
import { Mouse } from "lucide-react";
import { gsap } from "@/lib/gsap";

/** "Scroll" hint pinned to the bottom of the first viewport; fades out as soon as the page moves. */
export function ScrollHint({ label, className = "" }: { label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      gsap.to(element, {
        autoAlpha: 0,
        y: 20,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "+=250", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-white/40 uppercase ${className}`}
    >
      <Mouse className="size-4 motion-safe:animate-bounce" strokeWidth={1.5} />
      {label}
    </div>
  );
}
