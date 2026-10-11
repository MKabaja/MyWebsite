"use client";

import { useEffect, useState, type ReactNode } from "react";

type Stage = "hidden" | "enter-from" | "enter" | "visible" | "leave-from" | "leave";

type PresenceProps = {
  show: boolean;
  /** Prefix of the global CSS classes: `${name}-enter-from`, `${name}-enter-active`, ... */
  name: string;
  /** Total enter / leave time in ms (duration + delay), used to finish the transition. */
  timeout: { enter: number; leave: number };
  children: (className: string) => ReactNode;
};

const classesFor = (name: string, stage: Stage) => {
  switch (stage) {
    case "enter-from":
      return `${name}-enter-from ${name}-enter-active`;
    case "enter":
      return `${name}-enter-active ${name}-enter-to`;
    case "leave-from":
      return `${name}-leave-from ${name}-leave-active`;
    case "leave":
      return `${name}-leave-active ${name}-leave-to`;
    default:
      return "";
  }
};

/** Minimal port of Vue's `<Transition>` for a single conditionally rendered element. */
export function Presence({ show, name, timeout, children }: PresenceProps) {
  const [stage, setStage] = useState<Stage>(show ? "visible" : "hidden");
  const [prevShow, setPrevShow] = useState(show);

  if (show !== prevShow) {
    setPrevShow(show);
    setStage(show ? "enter-from" : "leave-from");
  }

  useEffect(() => {
    if (stage === "enter-from" || stage === "leave-from") {
      // Two frames so the "from" styles are committed before transitioning.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setStage(stage === "enter-from" ? "enter" : "leave"));
      });
      return () => cancelAnimationFrame(frame);
    }
    if (stage === "enter" || stage === "leave") {
      const id = window.setTimeout(
        () => setStage(stage === "enter" ? "visible" : "hidden"),
        stage === "enter" ? timeout.enter : timeout.leave,
      );
      return () => window.clearTimeout(id);
    }
  }, [stage, timeout.enter, timeout.leave]);

  if (stage === "hidden") return null;
  return children(classesFor(name, stage));
}
