'use client';

import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { GuideOut } from '@/features/home/components/guide-out';
import { HeroTerminal } from '@/features/home/components/hero-terminal';
import { ScrollDownLink } from '@/features/home/components/scroll-down-link';
import { ScrollHint } from '@/features/home/components/scroll-hint';
import { HERO_GRADIENT } from '@/features/home/model/home.constants';
import { LanguageSwitch } from '@/shared/components/language-switch';
import { Logo } from '@/shared/components/logo';
import { Scribble } from '@/shared/components/scribble';
import { StatusIndicator } from '@/shared/components/status-indicator';
import { TechIcon } from '@/shared/components/tech-icon';
import { Tile } from '@/shared/components/tile';
import { useSplitReveal } from '@/shared/hooks/use-split-reveal';
import { coreStack } from '@/shared/lib/tech-stack';
import { SocialLinks } from './hero-section.social-links';
import { heroSectionStyles } from './hero-section.styles';

const {
	section,
	column,
	logoTile,
	logo,
	logoAccentTile,
	logoSocialLinks,
	shaderNoteWrapper,
	shaderNote,
	shaderNoteStroke,
	headlineTile,
	leftGuide,
	headlineContent,
	intro,
	introStroke,
	headline,
	stackBar,
	stackList,
	stackLink,
	stackIcon,
	scrollDownLink,
	scrollDownIcon,
	bottomDecoration,
	bottomWindowTile,
	bottomGrainTile,
	statusBar,
	statusTile,
	status,
	mobileLanguageSwitch,
	desktopLanguageTile,
	desktopLanguageSwitch,
	shaderWindowTile,
	shaderWindowLeftLine,
	shaderWindowRightLine,
	portraitRow,
	portraitTile,
	portraitGlow,
	portrait,
	socialTile,
	desktopSocialLinks,
	terminalTile,
	rightGuide,
	terminal,
	scrollHint,
} = heroSectionStyles;

export function HeroSection() {
	const t = useTranslations('home.hero');
	const tPerson = useTranslations('person');
	const tNav = useTranslations('nav');
	const headlineRef = useRef<HTMLHeadingElement>(null);
	useSplitReveal(headlineRef, { delayInSeconds: 0.6 });

	return (
		<section data-m-hero className={section}>
			<div className={column}>
				<Tile mode="grain" lines={['left']} className={logoTile}>
					<Logo
						label={tPerson('homeLink')}
						heightInPixels={34}
						className={logo}
					/>
					<Tile mode="accent" className={logoAccentTile} />
					<SocialLinks className={logoSocialLinks} />
					<div className={shaderNoteWrapper} aria-hidden>
						<Scribble
							variant="arrow"
							className={shaderNote}
							strokeClassName={shaderNoteStroke}
						>
							{t('shaderNote')}
						</Scribble>
					</div>
				</Tile>

				<Tile mode="solid" lines={['left', 'top']} className={headlineTile}>
					<GuideOut side="left" className={leftGuide} />
					<div className={headlineContent}>
						<div data-speed="clamp(1.15)" data-m-speed="0.05">
							<Scribble
								variant="arrow"
								className={intro}
								strokeClassName={introStroke}
							>
								{t('intro')}
							</Scribble>
						</div>
						<h1 ref={headlineRef} data-speed="clamp(1.06)" className={headline}>
							{t('headline')}
						</h1>
					</div>

					<div className={stackBar}>
						<ul className={stackList}>
							{coreStack.map((tech) => (
								<li key={tech.name}>
									<a
										href={tech.url}
										target="_blank"
										rel="noreferrer"
										title={tech.name}
										aria-label={tech.name}
										className={stackLink}
									>
										<TechIcon icon={tech.icon} className={stackIcon} />
									</a>
								</li>
							))}
						</ul>
						<ScrollDownLink
							targetId="about"
							label={tNav('about')}
							className={scrollDownLink}
						>
							<ArrowDownRight className={scrollDownIcon} strokeWidth={1.25} />
						</ScrollDownLink>
					</div>
				</Tile>

				<div className={bottomDecoration}>
					<Tile
						mode="window"
						lines={['left', 'top']}
						className={bottomWindowTile}
					/>
					<Tile
						mode="grain"
						lines={['top', 'left']}
						className={bottomGrainTile}
					/>
				</div>
			</div>

			<div className={column}>
				<div className={statusBar}>
					<Tile mode="window" lines={['bottom']} className={statusTile}>
						<StatusIndicator label={t('status')} className={status} />
						<LanguageSwitch className={mobileLanguageSwitch} />
					</Tile>
					<Tile
						mode="solid"
						lines={['left', 'bottom']}
						className={desktopLanguageTile}
					>
						<LanguageSwitch className={desktopLanguageSwitch} />
					</Tile>
				</div>

				<Tile mode="window" lines={['top']} className={shaderWindowTile}>
					<span aria-hidden className={shaderWindowLeftLine} />
					<span aria-hidden className={shaderWindowRightLine} />
				</Tile>

				<div className={portraitRow}>
					<Tile mode="solid" className={portraitTile}>
						<div aria-hidden className={portraitGlow} />
						<Image
							src="/images/headshot.png"
							alt={t('photoAlt')}
							width={400}
							height={400}
							sizes="(min-width: 992px) 180px, 55vw"
							priority
							data-m-portrait
							className={portrait}
						/>
					</Tile>
					<Tile mode="window" lines={['top', 'left']} className={socialTile}>
						<SocialLinks className={desktopSocialLinks} data-lag="0.1" />
					</Tile>
				</div>

				<Tile
					mode="solid"
					className={terminalTile}
					style={{
						backgroundImage: HERO_GRADIENT,
						backgroundSize: '100% 100%',
					}}
				>
					<GuideOut side="right" className={rightGuide} />
					<HeroTerminal label={t('terminalLabel')} className={terminal} />
					<ScrollHint label={t('scrollHint')} className={scrollHint} />
				</Tile>
			</div>
		</section>
	);
}
