import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ProjectView } from '@/features/projects/components/project-view';
import { projects } from '@/features/projects/model/projects.constants';
import { findProjectBySlug } from '@/features/projects/utils/find-project-by-slug';
import { routing, toLocale } from '@/i18n/routing';
import { localeAlternates } from '@/shared/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		projects.map(({ slug }) => ({ locale, slug })),
	);
}

export async function generateMetadata({
	params,
}: PageProps<'/[locale]/portfolio/[slug]'>): Promise<Metadata> {
	const { locale, slug } = await params;
	const project = findProjectBySlug(slug);
	if (!project) return {};
	const lang = toLocale(locale);
	return {
		title: `${project.title} — ${project.type[lang]} | Mateusz Kabaja`,
		description: project.lead[lang],
		alternates: localeAlternates(lang, `/portfolio/${slug}`),
		openGraph: { title: project.title, description: project.lead[lang] },
	};
}

export default async function ProjectPage({
	params,
}: PageProps<'/[locale]/portfolio/[slug]'>) {
	const { locale, slug } = await params;
	const lang = toLocale(locale);
	setRequestLocale(lang);
	const project = findProjectBySlug(slug);
	if (!project) notFound();

	return <ProjectView project={project} locale={lang} />;
}
