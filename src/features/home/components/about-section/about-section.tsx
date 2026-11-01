'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ReactSpotlight } from '@/features/home/components/react-spotlight';
import { ToolboxMarquee } from '@/features/home/components/toolbox-marquee';
import { GUTTER_GRADIENT } from '@/features/home/model/home.constants';
import { LineNumbers } from '@/shared/components/line-numbers';
import { Scribble } from '@/shared/components/scribble';
import { Tile } from '@/shared/components/tile';
import { useSplitReveal } from '@/shared/hooks/use-split-reveal';
import { aboutSectionStyles } from './about-section.styles';

const {
	section,
	column,
	noteTile,
	noteAccentTile,
	noteWrapper,
	spotlightNote,
	spotlightNoteStroke,
	spotlightTile,
	spotlight,
	introRow,
	introTile,
	heading,
	introCopy,
	note,
	noteStroke,
	introText,
	gutter,
	gutterNumbers,
	toolbox,
	bottomWindowTile,
} = aboutSectionStyles;

export function AboutSection() {
	const t = useTranslations('home.about');
	const headingRef = useRef<HTMLHeadingElement>(null);
	useSplitReveal(headingRef, { isTriggeredByScroll: true, delayInSeconds: 0 });

	return (
		<section
			data-m-recede
			id="about"
			aria-labelledby="about-heading"
			className={section}
		>
			<div className={column}>
				<Tile mode="grain" lines={['left']} className={noteTile}>
					<Tile mode="accent" className={noteAccentTile} />
					<div className={noteWrapper} data-speed="clamp(1.08)">
						<Scribble
							variant="loop"
							className={spotlightNote}
							strokeClassName={spotlightNoteStroke}
						>
							{t('spotlightNote')}
						</Scribble>
					</div>
				</Tile>

				<Tile
					mode="solid"
					lines={['left']}
					data-fade
					data-m-expand
					data-m-media
					className={spotlightTile}
				>
					<ReactSpotlight
						title={t('spotlightTitle')}
						text={t('spotlightText')}
						className={spotlight}
					/>
				</Tile>
			</div>

			<div className={column}>
				<div
					className={introRow}
					style={{
						backgroundImage: GUTTER_GRADIENT,
						backgroundSize: '100% 100%',
					}}
				>
					<Tile mode="solid" data-m-expand className={introTile}>
						<h2 ref={headingRef} id="about-heading" className={heading}>
							{t('heading')}
						</h2>
						<div
							className={introCopy}
							data-fade
							data-m-speed="0.04"
							data-m-text
						>
							<Scribble
								variant="underline"
								className={note}
								strokeClassName={noteStroke}
							>
								{t('note')}
							</Scribble>
							<p className={introText}>{t('text')}</p>
						</div>
					</Tile>
					<div className={gutter}>
						<LineNumbers count={18} className={gutterNumbers} />
					</div>
				</div>

				<ToolboxMarquee className={toolbox} />
				<Tile mode="window" lines={['bottom']} className={bottomWindowTile} />
			</div>
		</section>
	);
}
