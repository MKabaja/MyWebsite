'use client';

import { useTranslations } from 'next-intl';
import { Scribble } from '@/shared/components/scribble';
import { Tile } from '@/shared/components/tile';
import { storySectionStyles } from './story-section.styles';

type TimelineEntry = {
	period: string;
	title: string;
	text: string;
};

const {
	section,
	storyTile,
	note,
	noteStroke,
	heading,
	paragraphs: paragraphList,
	paragraph,
	timelineTile,
	timelineHeading,
	timeline: timelineList,
	entry,
	entryDot,
	entryPeriod,
	entryTitle,
	entryText,
} = storySectionStyles;

export function StorySection() {
	const t = useTranslations('home.story');
	const paragraphs: string[] = t.raw('paragraphs');
	const timeline: TimelineEntry[] = t.raw('timeline');

	return (
		<section
			data-m-recede
			id="story"
			aria-labelledby="story-heading"
			className={section}
		>
			<Tile lines={['right']} data-m-expand className={storyTile}>
				<Scribble
					variant="underline"
					className={note}
					strokeClassName={noteStroke}
				>
					{t('note')}
				</Scribble>
				<h2 id="story-heading" className={heading}>
					{t('heading')}
				</h2>
				<div className={paragraphList} data-fade>
					{paragraphs.map((text) => (
						<p key={text} className={paragraph}>
							{text}
						</p>
					))}
				</div>
			</Tile>

			<Tile data-m-expand className={timelineTile}>
				<h3 className={timelineHeading}>{t('timelineHeading')}</h3>
				<ol className={timelineList}>
					{timeline.map(({ period, title, text }) => (
						<li key={title} className={entry} data-fade>
							<span aria-hidden className={entryDot} />
							<p className={entryPeriod}>{period}</p>
							<h4 className={entryTitle}>{title}</h4>
							<p className={entryText}>{text}</p>
						</li>
					))}
				</ol>
			</Tile>
		</section>
	);
}
