"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { getRouteKind, pageTimings } from "@/lib/routes";
import { usePageTransition } from "./TransitionProvider";

/** The `.page` element of the original — animated in/out on route changes. */
export function PageFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const { isLeaving, hasNavigated } = usePageTransition();
  const timing = pageTimings[getRouteKind(pathname)];

  let phase: "leave" | "enter" | undefined;
  if (isLeaving) phase = "leave";
  else if (hasNavigated && timing.enter > 0) phase = "enter";

  const style = {
    "--page-enter-duration": `${timing.enter}ms`,
    "--page-enter-delay": `${timing.enterDelay}ms`,
    "--page-leave-duration": `${timing.leave}ms`,
  } as CSSProperties;

  return (
    <div key={`${locale}:${pathname}`} className="page" data-phase={phase} style={style}>
      {children}
    </div>
  );
}
