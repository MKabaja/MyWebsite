import { hasLocale } from 'next-intl';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['pl', 'en'],
	defaultLocale: 'pl',
	localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

export function toLocale(value: string): Locale {
	return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
