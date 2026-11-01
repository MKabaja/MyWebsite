import type { MetadataRoute } from 'next';
import { projects } from '@/features/projects/model/projects.constants';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/shared/lib/seo';

const STATIC_PATHS = ['/'];

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = [
		...STATIC_PATHS,
		...projects.map(({ slug }) => `/portfolio/${slug}`),
	];

	return paths.map((href) => ({
		url: absoluteUrl(routing.defaultLocale, href),
		alternates: {
			languages: Object.fromEntries(
				routing.locales.map((locale) => [locale, absoluteUrl(locale, href)]),
			),
		},
	}));
}
