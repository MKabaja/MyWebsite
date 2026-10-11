"use client";

import { useEffect, useRef, useState } from "react";

type Step = { command: string; output: string[] };
type Line = { kind: "command" | "output"; text: string };

const HOST = "mateusz@ubuntu";

const SESSION: Step[] = [
  { command: "whoami", output: ["mateusz"] },
  { command: "lsb_release -ds", output: ["Ubuntu 24.04 LTS"] },
  { command: "sudo apt update && sudo apt upgrade -y", output: ["All packages are up to date."] },
  { command: "ls ~/projects", output: ["powertask  shiftflow  printforge"] },
  { command: "cd ~/projects/shiftflow && git pull", output: ["Already up to date."] },
  { command: "npm run build", output: ["✓ Compiled successfully"] },
];

const TYPE_MS = 45;
const AFTER_COMMAND_MS = 350;
const AFTER_STEP_MS = 900;
const RESTART_MS = 6000;

function Prompt() {
  return (
    <span className="select-none">
      <span className="text-cyber-soft">{HOST}</span>
      <span className="text-white/50">:</span>
      <span className="text-accent-soft">~</span>
      <span className="text-white/50">$ </span>
    </span>
  );
}

/** Fake Ubuntu terminal typing a short session; loops while on screen (prints at once for reduced motion). */
export function HeroTerminal({ label, className = "" }: { label: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const setup = () => {
      const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wait = (ms: number) => (instant ? 0 : ms);

      let visible = false;
      let timer = 0;
      let stepIndex = 0;
      let charIndex = 0;

      // Single timer chain, running only while the terminal is on screen.
      const tick = () => {
        if (!visible) return;
        const step = SESSION[stepIndex];
        if (!step) {
          if (instant) return;
          setLines([]);
          stepIndex = 0;
          timer = window.setTimeout(tick, AFTER_STEP_MS);
          return;
        }
        if (!instant && charIndex < step.command.length) {
          charIndex++;
          setTyping(step.command.slice(0, charIndex));
          timer = window.setTimeout(tick, TYPE_MS + Math.random() * 40);
          return;
        }
        setTyping("");
        setLines((prev) => [...prev, { kind: "command", text: step.command }]);
        timer = window.setTimeout(() => {
          setLines((prev) => [...prev, ...step.output.map((text) => ({ kind: "output" as const, text }))]);
          stepIndex++;
          charIndex = 0;
          timer = window.setTimeout(tick, wait(stepIndex >= SESSION.length ? RESTART_MS : AFTER_STEP_MS));
        }, wait(AFTER_COMMAND_MS));
      };

      const observer = new IntersectionObserver(([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible) {
          if (instant) {
            setLines(SESSION.flatMap((step) => [{ kind: "command" as const, text: step.command },
              ...step.output.map((text) => ({ kind: "output" as const, text }))]));
            setTyping("");
          } else timer = window.setTimeout(tick, wait(600));
        }
        if (!visible && wasVisible) {
          // Start over next time it scrolls into view.
          window.clearTimeout(timer);
          stepIndex = 0;
          charIndex = 0;
          setLines([]);
          setTyping("");
        }
      });
      observer.observe(root);

      return () => {
        observer.disconnect();
        window.clearTimeout(timer);
      };
    };
    let cleanup = setup();
    const reducedMobile = window.matchMedia("(max-width: 991px) and (prefers-reduced-motion: reduce)");
    const onModeChange = () => {
      cleanup();
      setLines([]);
      setTyping("");
      cleanup = setup();
    };
    reducedMobile.addEventListener("change", onModeChange);
    return () => {
      reducedMobile.removeEventListener("change", onModeChange);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={label}
      className={`flex flex-col overflow-hidden border border-white/15 bg-ink/85 font-mono text-[0.78rem] leading-relaxed shadow-[0_20px_60px_rgb(0_0_0/0.45)] ${className}`}
    >
      <div aria-hidden className="flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3">
        <span className="size-2.5 rounded-full bg-[#e95420]" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ms-3 truncate text-[0.72rem] text-white/45">{HOST}: ~</span>
      </div>
      <div aria-hidden className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 py-3 text-white/85">
        {lines.map((line, index) => (
          <p key={index} className={`font-normal break-all whitespace-pre-wrap ${line.kind === "output" ? "text-white/55" : ""}`}>
            {line.kind === "command" && <Prompt />}
            {line.text}
          </p>
        ))}
        <p className="font-normal break-all">
          <Prompt />
          {typing}
          <span className="ms-px inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-accent motion-safe:animate-pulse" />
        </p>
      </div>
    </div>
  );
}
