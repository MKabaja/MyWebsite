'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';
import { ProjectVideo } from '@/features/projects/components/project-video';
import type { Project } from '@/features/projects/model/projects.types';
import { toLocale } from '@/i18n/routing';
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

const { cardCursor, openIcon, screenshot } = portfolioCardStyles;

export function PortfolioCard({
	project,
	slideIndex,
	index,
	total,
	isDuplicate,
	wasDragged,
}: PortfolioCardProps) {
	const locale = toLocale(useLocale());
	const t = useTranslations('home.portfolio');
	const { media } = project;

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
						{media.kind === 'video' ? (
							<ProjectVideo
								media={media}
								className={styles.video}
								draggable={false}
							/>
						) : (
							<Image
								src={media.cover}
								alt=""
								width={media.widthInPixels}
								height={media.heightInPixels}
								sizes="(max-width: 991px) 80vw, 50vw"
								className={`${styles.video} ${screenshot}`}
								draggable={false}
							/>
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
