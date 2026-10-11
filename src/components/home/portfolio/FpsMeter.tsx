"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

const TOKEN = "__fps__";
const SAMPLE_MS = 500;

/** Live frame rate from the GSAP ticker, written straight into a text node twice a second. */
export function FpsMeter({ className = "" }: { className?: string }) {
  const t = useTranslations("home.portfolio");
  const valueRef = useRef<HTMLSpanElement>(null);
  const [before, after = ""] = t("fps", { fps: TOKEN }).split(TOKEN);

  useEffect(() => {
    let frames = 0;
    let start = performance.now();
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - start < SAMPLE_MS) return;
      if (valueRef.current) valueRef.current.textContent = String(Math.round((frames * 1000) / (now - start)));
      frames = 0;
      start = now;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <p className={`m-0 font-mono text-[0.72rem] tracking-[0.12em] text-on-dark-muted uppercase ${className}`}>
      <span className="mr-2 text-accent" aria-hidden>
        ⌗
      </span>
      {before}
      <span ref={valueRef} className="inline-block min-w-[2ch] text-on-dark tabular-nums">
        60
      </span>
      {after}
    </p>
  );
}
