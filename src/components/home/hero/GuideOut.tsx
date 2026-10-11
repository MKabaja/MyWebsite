/** Dashed guide that continues a tile edge out into the page margin (desktop decoration). */
export function GuideOut({ side, className = "" }: { side: "left" | "right"; className?: string }) {
  const position = side === "left" ? "right-full" : "left-full";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${position} hidden w-[50vw] border-t border-dashed border-guide lg:block ${className}`}
    />
  );
}
