'use client';

import { useTranslations } from 'next-intl';
import { LanguageSwitch } from '@/shared/components/language-switch';
import { Logo } from '@/shared/components/logo';
import { siteFooterStyles } from './site-footer.styles';

const { footer, copyright, languageSwitch, languageLink } = siteFooterStyles;

export function SiteFooter() {
	const t = useTranslations();

	return (
		<footer className={footer}>
			<Logo heightInPixels={28} label={t('person.homeLink')} />
			<p className={copyright}>
				{t('home.contact.copyright', { year: new Date().getFullYear() })}
			</p>
			<LanguageSwitch className={languageSwitch} linkClassName={languageLink} />
		</footer>
	);
}
