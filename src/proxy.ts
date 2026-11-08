import { NextRequest } from 'next/server';
import { hasLocale } from 'next-intl';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const FALLBACK_LANGUAGE_FOR_OTHER_LOCALES = 'en';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
	const acceptLanguage = request.headers.get('accept-language');
	if (!acceptLanguage || hasSupportedLanguage(acceptLanguage)) {
		return handleI18nRouting(request);
	}

	const headers = new Headers(request.headers);
	headers.set('accept-language', FALLBACK_LANGUAGE_FOR_OTHER_LOCALES);
	return handleI18nRouting(new NextRequest(request, { headers }));
}

export const config = {
	matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};

function hasSupportedLanguage(acceptLanguage: string) {
	return acceptLanguage
		.split(',')
		.map((range) => range.trim().split(/[-;]/)[0].toLowerCase())
		.some(
			(language) => language === '*' || hasLocale(routing.locales, language),
		);
}
