'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import type { Project } from '@/features/projects/model/projects.types';
import { TransitionLink } from '@/shared/components/page-transition';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';
import { cn } from '@/shared/lib/utils';
import styles from './portfolio-card.module.css';
import { portfolioCardStyles } from './portfolio-card.styles';

type PortfolioCardProps = {
	project: Project;
	slideIndex: number;
	index: number;
	total: number;
	isDuplicate: boolean;
	wasDragged: () => boolean;
};

const { cardCursor, openIcon } = portfolioCardStyles;

export function PortfolioCard({
	project,
	slideIndex,
	index,
	total,
	isDuplicate,
	wasDragged,
}: PortfolioCardProps) {
	const locale = useLocale();
	const t = useTranslations('home.portfolio');
	const tExplore = useTranslations('explore');

	function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		const isNarrowKeyboardClick =
			event.detail === 0 && matchesMedia(mediaQueries.narrow);
		if (wasDragged() && !isNarrowKeyboardClick) event.preventDefault();
	}

	return (
		<li
			data-slide-index={slideIndex}
			className={styles.slide}
			aria-hidden={isDuplicate || undefined}
		>
			<div className={styles.lift}>
				<span className={styles.counter} aria-hidden>
					{padToTwoDigits(index + 1)}/{padToTwoDigits(total)}
				</span>

				<TransitionLink
					href={`/portfolio/${project.slug}`}
					className={cn(styles.card, cardCursor)}
					aria-label={`${project.title} — ${project.lead[locale]}`}
					tabIndex={isDuplicate ? -1 : undefined}
					draggable={false}
					onClick={handleClick}
				>
					<div className={styles.media}>
						{project.video ? (
							<video
								className={styles.video}
								muted
								loop
								playsInline
								autoPlay
								preload="metadata"
								poster={project.video.poster}
								draggable={false}
							>
								{project.video.webm && (
									<source src={project.video.webm} type="video/webm" />
								)}
								<source src={project.video.mp4} type="video/mp4" />
							</video>
						) : (
							<div className={styles.cover}>
								<span className={styles.coverIndex} aria-hidden>
									{padToTwoDigits(index + 1)}
								</span>
								<span className={styles.badge}>
									<span className={styles.badgeDot} aria-hidden />
									{tExplore('comingSoon')}
								</span>
								<span className={styles.coverTitle}>{project.title}</span>
								<ul className={styles.chips}>
									{project.stack.map((tech) => (
										<li key={tech}>{tech}</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<div className={styles.bar}>
						<span className={styles.barTitle}>{project.title}</span>
						<span className={styles.barType}>{project.type[locale]}</span>
						<span className={styles.barOpen}>
							{t('open')}
							<ArrowUpRight
								className={openIcon}
								strokeWidth={1.75}
								aria-hidden
							/>
						</span>
					</div>
				</TransitionLink>
			</div>
		</li>
	);
}

function padToTwoDigits(value: number) {
	return String(value).padStart(2, '0');
}
