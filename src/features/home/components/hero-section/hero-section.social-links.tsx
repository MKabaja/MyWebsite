'use client';

import { useTranslations } from 'next-intl';
import {
	FacebookIcon,
	GithubIcon,
	LinkedinIcon,
} from '@/shared/components/brand-icons';
import { site } from '@/shared/lib/site';
import { cn } from '@/shared/lib/utils';
import { heroSectionStyles } from './hero-section.styles';

type SocialLinksProps = {
	className?: string;
	'data-lag'?: string;
};

const socials = [
	{ key: 'github', href: site.social.github, Icon: GithubIcon },
	{ key: 'linkedin', href: site.social.linkedin, Icon: LinkedinIcon },
	{ key: 'facebook', href: site.social.facebook, Icon: FacebookIcon },
] as const;

const { socialList, socialLink } = heroSectionStyles;

export function SocialLinks({ className, ...props }: SocialLinksProps) {
	const tSocial = useTranslations('social');

	return (
		<ul className={cn(socialList, className)} {...props}>
			{socials.map(({ key, href, Icon }) => (
				<li key={key}>
					<a
						href={href}
						target="_blank"
						rel="noreferrer"
						aria-label={tSocial(key)}
						className={socialLink}
					>
						<Icon size={22} />
					</a>
				</li>
			))}
		</ul>
	);
}
