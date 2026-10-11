export type RouteKind = "home" | "explore" | "about" | "contact" | "portfolio" | "other";

export function getRouteKind(pathname: string): RouteKind {
  if (pathname === "/") return "home";
  if (pathname === "/explore") return "explore";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
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

/** Per-page values of the original Nuxt `page` transition (scoped overrides). */
export const pageTimings: Record<RouteKind, PageTiming> = {
  home: { leave: 300, enter: 1000, enterDelay: 0 },
  explore: { leave: 600, enter: 0, enterDelay: 0 },
  about: { leave: 1000, enter: 1400, enterDelay: 1700 },
  contact: { leave: 1000, enter: 1400, enterDelay: 1700 },
  portfolio: { leave: 1000, enter: 1000, enterDelay: 0 },
  other: { leave: 1000, enter: 1000, enterDelay: 0 },
};

export function getBodyClasses(kind: RouteKind): string[] {
  if (kind === "about" || kind === "contact") return ["enable-scroll", "fixed-webgl"];
  if (kind === "portfolio") return ["enable-scroll"];
  return [];
}

export const showsNavigation = (kind: RouteKind) => kind !== "about" && kind !== "contact";
export const showsBottomBar = (kind: RouteKind) => kind === "home" || kind === "explore";
