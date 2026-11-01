'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { HireTiles } from '@/features/home/components/hire-tiles';
import { TechIcon } from '@/shared/components/tech-icon';
import { Tile } from '@/shared/components/tile';
import { useSplitReveal } from '@/shared/hooks/use-split-reveal';
import { coreStack } from '@/shared/lib/tech-stack';
import { hireSectionStyles } from './hire-section.styles';

const {
	section,
	contentTile,
	heading,
	headingRolesText,
	columns,
	achievementsColumn,
	columnHeading,
	stackList,
	stackEntry,
	stackIcon,
	achievementList,
	achievementEntry,
	achievementDash,
	contactLink,
	contactLinkIcon,
	skillList,
	skillEntry,
} = hireSectionStyles;

export function HireSection() {
	const t = useTranslations('home.hire');
	const headingRef = useRef<HTMLHeadingElement>(null);
	useSplitReveal(headingRef, { delayInSeconds: 0, isTriggeredByScroll: true });

	const skills: string[] = t.raw('skills');
	const achievements: string[] = t.raw('achievements');

	return (
		<section
			data-m-recede
			id="hire"
			aria-labelledby="hire-heading"
			className={section}
		>
			<HireTiles />

			<Tile mode="solid" data-m-expand className={contentTile}>
				<h2 id="hire-heading" ref={headingRef} className={heading}>
					{t('headingStart')}{' '}
					<span className={headingRolesText}>{t('headingRoles')}</span>{' '}
					{t('headingEnd')}
				</h2>

				<div className={columns}>
					<div data-fade>
						<h3 className={columnHeading}>{t('stackHeading')}</h3>
						<ul className={stackList}>
							{coreStack.map((tech) => (
								<li key={tech.name} className={stackEntry}>
									<TechIcon icon={tech.icon} className={stackIcon} />
									{tech.name}
								</li>
							))}
						</ul>
					</div>

					<div data-fade className={achievementsColumn}>
						<h3 className={columnHeading}>{t('achievementsHeading')}</h3>
						<ul className={achievementList}>
							{achievements.map((achievement) => (
								<li key={achievement} className={achievementEntry}>
									<span aria-hidden className={achievementDash} />
									{achievement}
								</li>
							))}
						</ul>

						<a href="#contact" className={contactLink}>
							{t('cta')}
							<ArrowRight size={18} aria-hidden className={contactLinkIcon} />
						</a>
					</div>

					<div data-fade>
						<h3 className={columnHeading}>{t('skillsHeading')}</h3>
						<ul className={skillList}>
							{skills.map((skill) => (
								<li key={skill} className={skillEntry}>
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</Tile>
		</section>
	);
}
