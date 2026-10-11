import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

const STATIC_PATHS = ["/", "/explore", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...projects.map(({ slug }) => `/portfolio/${slug}`)];

  return paths.map((href) => ({
    url: absoluteUrl(routing.defaultLocale, href),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(locale, href)])),
    },
  }));
}
