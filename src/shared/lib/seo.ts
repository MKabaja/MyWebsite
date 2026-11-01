import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { site } from './site';

export function absoluteUrl(locale: Locale, href: string) {
	return site.url + getPathname({ locale, href });
}

export function localeAlternates(
	locale: Locale,
	href: string,
): Metadata['alternates'] {
	return {
		canonical: absoluteUrl(locale, href),
		languages: {
			...Object.fromEntries(
				routing.locales.map((code) => [code, absoluteUrl(code, href)]),
			),
			'x-default': absoluteUrl(routing.defaultLocale, href),
		},
	};
}
