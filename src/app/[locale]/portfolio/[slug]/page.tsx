import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, toLocale } from "@/i18n/routing";
import { getProject, projects } from "@/content/projects";
import { ProjectView } from "@/components/portfolio/ProjectView";
import { localeAlternates } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const lang = toLocale(locale);
  return {
    title: `${project.title} — ${project.type[lang]} | Mateusz Kabaja`,
    description: project.lead[lang],
    alternates: localeAlternates(lang, `/portfolio/${slug}`),
    openGraph: { title: project.title, description: project.lead[lang] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = await params;
  const lang = toLocale(locale);
  setRequestLocale(lang);
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectView project={project} locale={lang} />;
}
