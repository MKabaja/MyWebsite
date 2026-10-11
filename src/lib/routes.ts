export type RouteKind = "home" | "portfolio" | "other";

export function getRouteKind(pathname: string): RouteKind {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/portfolio/")) return "portfolio";
  return "other";
}

type PageTiming = {
  /** Leave animation of the outgoing page, in ms. */
  leave: number;
  /** Enter animation of the incoming page, in ms (0 = no animation). */
  enter: number;
  enterDelay: number;
};

export const pageTimings: Record<RouteKind, PageTiming> = {
  home: { leave: 600, enter: 1000, enterDelay: 0 },
  portfolio: { leave: 600, enter: 1000, enterDelay: 0 },
  other: { leave: 600, enter: 1000, enterDelay: 0 },
};
