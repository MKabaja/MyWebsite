'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { usePathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { usePageTransition } from '@/shared/components/page-transition';
import { cn } from '@/shared/lib/utils';
import { languageSwitchStyles } from './language-switch.styles';

type LanguageSwitchProps = {
	className?: string;
	linkClassName?: string;
};

type LanguageNameByLocale = Record<Locale, string>;

const languageNameByLocale: LanguageNameByLocale = {
	pl: 'polski',
	en: 'English',
};

const { group, separator, language, languageCurrent, languageOther } =
	languageSwitchStyles;

export function LanguageSwitch({
	className,
	linkClassName,
}: LanguageSwitchProps) {
	const t = useTranslations('nav');
	const currentLocale = useLocale();
	const pathname = usePathname();
	const { navigate } = usePageTransition();

	return (
		// biome-ignore lint/a11y/useSemanticElements: fieldset zmieniłby wygląd, a tu nie ma pól formularza
		<div
			role="group"
			aria-label={t('language')}
			className={cn(group, className)}
		>
			{routing.locales.map((locale, index) => (
				<Fragment key={locale}>
					{index > 0 && (
						<span aria-hidden className={separator}>
							/
						</span>
					)}
					<button
						type="button"
						lang={locale}
						aria-current={locale === currentLocale ? 'true' : undefined}
						aria-label={t('switchTo', {
							language: languageNameByLocale[locale],
						})}
						disabled={locale === currentLocale}
						onClick={() => navigate(pathname, { locale })}
						className={cn(
							language,
							locale === currentLocale ? languageCurrent : languageOther,
							linkClassName,
						)}
					>
						{locale}
					</button>
				</Fragment>
			))}
		</div>
	);
}
