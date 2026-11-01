'use client';

import { useTranslations } from 'next-intl';
import { FpsMeter } from '@/features/projects/components/fps-meter';
import { PortfolioCarousel } from '@/features/projects/components/portfolio-carousel';
import { Marquee } from '@/shared/components/marquee';
import { Scribble } from '@/shared/components/scribble';
import { Tile } from '@/shared/components/tile';
import { portfolioSectionStyles } from './portfolio-section.styles';

const {
	section,
	layout,
	noteTile,
	note,
	noteStroke,
	windowTile,
	accentTile,
	grainTile,
	floatingGrain,
	floatingAccent,
	floatingTile,
	marquee,
	marqueeSeparator,
	carouselSlot,
	fpsSlot,
	fpsTile,
} = portfolioSectionStyles;

export function PortfolioSection() {
	const t = useTranslations('home.portfolio');

	return (
		<section data-m-recede id="portfolio" className={section}>
			<div className={layout}>
				<Tile mode="solid" lines={['top', 'bottom']} className={noteTile}>
					<Scribble
						variant="underline"
						className={note}
						strokeClassName={noteStroke}
					>
						{t('dragNote')}
					</Scribble>
				</Tile>
				<Tile mode="window" lines={['top', 'left']} className={windowTile} />
				<Tile mode="accent" className={accentTile} />
				<Tile mode="grain" lines={['top']} className={grainTile} />
			</div>

			<div className={floatingGrain} aria-hidden data-speed="clamp(1.15)">
				<Tile
					mode="grain"
					lines={['top', 'right', 'bottom', 'left']}
					className={floatingTile}
				/>
			</div>
			<div className={floatingAccent} aria-hidden data-speed="clamp(0.88)">
				<Tile mode="accent" className={floatingTile} />
			</div>

			<Marquee repeat={4} durationInSeconds={38} className={marquee}>
				<span>{t('marquee')}</span>
				<span className={marqueeSeparator} aria-hidden>
					×
				</span>
			</Marquee>

			<div className={carouselSlot}>
				<PortfolioCarousel />
			</div>

			<div className={fpsSlot}>
				<Tile mode="solid" lines={['top', 'right']} className={fpsTile}>
					<FpsMeter />
				</Tile>
			</div>
		</section>
	);
}
