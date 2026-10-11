"use client";

import { useEffect, useRef } from "react";
import { siReact } from "simple-icons";
import { TechIcon } from "@/components/icons/TechIcon";
import { gsap } from "@/lib/gsap";

const RX = 150;
const RY = 56;
const ORBIT_ANGLES = [0, 60, 120];

const BACKGROUND = [
  "radial-gradient(rgb(255 255 255 / 0.22) 1px, transparent 1.5px)",
  "radial-gradient(circle at 70% 30%, rgb(124 255 247 / 0.35), transparent 55%)",
  "linear-gradient(140deg, #0a4f5a 0%, #0b7d84 45%, #00c4bd 100%)",
].join(", ");

/** Vivid "spotlight" tile: framed card with a line-art React atom; orbits turn while it is on screen. */
export function ReactSpotlight({ title, text, className = "" }: { title: string; text: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const atomRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const atom = atomRef.current;
    const dot = dotRef.current;
    if (!root || !atom || !dot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Both loops only run while the tile is in view.
    const inView = () => ({ trigger: root, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" });
    const ctx = gsap.context(() => {
      gsap.to(atom, { rotation: 360, svgOrigin: "0 0", duration: 60, ease: "none", repeat: -1, scrollTrigger: inView() });
      const orbit = { angle: 0 };
      gsap.to(orbit, {
        angle: Math.PI * 2,
        duration: 4.5,
        ease: "none",
        repeat: -1,
        scrollTrigger: inView(),
        onUpdate: () => {
          dot.setAttribute("cx", (RX * Math.cos(orbit.angle)).toFixed(2));
          dot.setAttribute("cy", (RY * Math.sin(orbit.angle)).toFixed(2));
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`} style={{ backgroundImage: BACKGROUND, backgroundSize: "18px 18px, 100% 100%, 100% 100%" }}>
      <div className="absolute inset-5 flex flex-col border-2 border-white sm:inset-8">
        <div className="flex w-fit items-center gap-3 border-r-2 border-b-2 border-white px-5 py-3">
          <TechIcon icon={siReact} className="size-7 text-white" />
          <p className="font-sans text-[1.9rem] leading-none font-bold tracking-wide text-white uppercase">{title}</p>
        </div>

        <svg viewBox="-180 -180 360 360" className="mx-auto my-auto h-auto w-[min(72%,24rem)] overflow-visible" fill="none" aria-hidden>
          <g ref={atomRef}>
            {ORBIT_ANGLES.map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <ellipse rx={RX} ry={RY} stroke="white" strokeWidth="3" />
                {angle === 0 && <circle ref={dotRef} cx={RX} cy={0} r="7" className="fill-accent" />}
              </g>
            ))}
          </g>
          <circle r="15" fill="white" />
        </svg>

        <p className="max-w-[26ch] px-5 pb-5 text-[1.05rem] leading-snug text-white/85 sm:px-6 sm:pb-6">{text}</p>
      </div>
    </div>
  );
}
