'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PortfolioCard } from '@/features/projects/components/portfolio-card';
import { projects } from '@/features/projects/model/projects.constants';
import styles from './portfolio-carousel.module.css';
import { usePortfolioCarousel } from './use-portfolio-carousel';

const MIN_SLIDES_TO_COVER_PLANE = 6;

const copyCount = Math.max(
	1,
	Math.ceil(MIN_SLIDES_TO_COVER_PLANE / projects.length),
);
const slides = Array.from({ length: copyCount }, (_, copy) =>
	projects.map((project, index) => ({ project, index, copy })),
).flat();

export function PortfolioCarousel() {
	const t = useTranslations('home.portfolio');
	const { viewportRef, planeRef, trackRef, currentIndex, move, wasDragged } =
		usePortfolioCarousel();

	return (
		<>
			<section
				ref={viewportRef}
				data-m-carousel
				className={styles.viewport}
				aria-label={t('carousel')}
			>
				<div ref={planeRef} className={styles.plane}>
					<ul ref={trackRef} className={styles.track}>
						{slides.map(({ project, index, copy }) => (
							<PortfolioCard
								key={`${project.slug}-${copy}`}
								slideIndex={copy * projects.length + index}
								project={project}
								index={index}
								total={projects.length}
								isDuplicate={copy > 0}
								wasDragged={wasDragged}
							/>
						))}
					</ul>
				</div>
			</section>
			<div className={styles.controls}>
				<button
					data-m-carousel-prev
					type="button"
					onClick={() => move(-1)}
					aria-label={t('previous')}
				>
					<ArrowLeft size={20} aria-hidden />
				</button>
				<p data-m-carousel-current aria-live="polite" aria-atomic="true">
					{t('current', {
						index: currentIndex + 1,
						total: projects.length,
						title: projects[currentIndex].title,
					})}
				</p>
				<button
					data-m-carousel-next
					type="button"
					onClick={() => move(1)}
					aria-label={t('next')}
				>
					<ArrowRight size={20} aria-hidden />
				</button>
			</div>
		</>
	);
}
