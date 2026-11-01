'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ComponentType } from 'react';
import {
	FacebookIcon,
	GithubIcon,
	LinkedinIcon,
} from '@/shared/components/brand-icons';
import { LineNumbers } from '@/shared/components/line-numbers';
import { Tile } from '@/shared/components/tile';
import { site } from '@/shared/lib/site';
import { contactDetailsStyles } from './contact-details.styles';

type SocialKey = keyof typeof site.social;

type SocialLink = {
	key: SocialKey;
	Icon: ComponentType<{ size?: number }>;
};

const socialLinks: SocialLink[] = [
	{ key: 'github', Icon: GithubIcon },
	{ key: 'linkedin', Icon: LinkedinIcon },
	{ key: 'facebook', Icon: FacebookIcon },
];

const {
	column,
	detailsTile,
	detailsList,
	term: termClassName,
	definition,
	detailLink,
	detailArrow,
	socialList,
	socialLink,
	windowRow,
	lineNumbersTile,
	lineNumbers,
} = contactDetailsStyles;

export function ContactDetails() {
	const t = useTranslations('contact');
	const tSocial = useTranslations('social');

	const contactDetails = [
		{ term: t('email'), value: site.email, href: `mailto:${site.email}` },
		{ term: t('phone'), value: site.phone, href: site.phoneHref },
		{
			term: t('location'),
			value: t('locationValue'),
			href: site.locationHref,
			isExternal: true,
		},
	];

	return (
		<div className={column}>
			<Tile mode="solid" lines={['top', 'left']} className={detailsTile}>
				<dl data-fade className={detailsList}>
					{contactDetails.map(({ term, value, href, isExternal }) => (
						<div key={term}>
							<dt className={termClassName}>{term}</dt>
							<dd className={definition}>
								<a
									href={href}
									className={detailLink}
									{...(isExternal
										? { target: '_blank', rel: 'noopener noreferrer' }
										: {})}
								>
									{value}
									<ArrowUpRight size={16} aria-hidden className={detailArrow} />
								</a>
							</dd>
						</div>
					))}
				</dl>

				<ul data-fade className={socialList}>
					{socialLinks.map(({ key, Icon }) => (
						<li key={key}>
							<a
								href={site.social[key]}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={tSocial(key)}
								className={socialLink}
							>
								<Icon size={20} />
							</a>
						</li>
					))}
				</ul>
			</Tile>

			<div aria-hidden className={windowRow}>
				<Tile mode="grain" lines={['left']} className={lineNumbersTile}>
					<LineNumbers count={10} className={lineNumbers} />
				</Tile>
				<Tile mode="window" data-speed="clamp(1.05)" />
			</div>
		</div>
	);
}
