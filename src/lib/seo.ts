import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "./site";

export const absoluteUrl = (locale: Locale, href: string) => site.url + getPathname({ locale, href });

/** Canonical + hreflang alternates for a locale-less path such as `/about`. */
export function localeAlternates(locale: Locale, href: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(locale, href),
    languages: {
      ...Object.fromEntries(routing.locales.map((code) => [code, absoluteUrl(code, href)])),
      "x-default": absoluteUrl(routing.defaultLocale, href),
    },
  };
}
