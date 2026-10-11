"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { registerCell, type CellMode } from "@/components/background/cells";

/**
 * One cell of the page grid.
 * - `solid`: opaque dark panel (content tiles).
 * - `window`: transparent — the full-colour shader shows through.
 * - `grain` / `accent`: transparent, and the shader below is greyed + grained / accent-tinted.
 */
export type TileMode = "solid" | "window" | CellMode;

type TileProps = {
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "li";
  mode?: TileMode;
  /** Dashed guide lines on these edges. */
  lines?: Array<"top" | "right" | "bottom" | "left">;
} & HTMLAttributes<HTMLDivElement>;

const LINE_CLASSES = {
  top: "border-t",
  right: "border-r",
  bottom: "border-b",
  left: "border-l",
} as const;

export function Tile({ as = "div", mode = "solid", lines = [], className = "", ...props }: TileProps) {
  // All allowed tags share the same DOM API we need, so type them as a div for the ref.
  const Component = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((mode !== "grain" && mode !== "accent") || !ref.current) return;
    return registerCell(ref.current, mode);
  }, [mode]);

  const surface = mode === "solid" ? "bg-graphite grid-paper" : "bg-transparent";
  const borders = lines.map((side) => LINE_CLASSES[side]).join(" ");
  // `relative` would beat a passed `absolute`/`fixed`/`sticky` in the generated CSS order.
  const position = /\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative";

  return (
    <Component
      ref={ref}
      data-tile={mode}
      className={`${position} ${surface} ${borders} border-dashed border-guide ${className}`}
      {...props}
    />
  );
}
