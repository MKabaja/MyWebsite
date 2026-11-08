export const storySectionStyles = {
	section: 'grid-frame grid grid-cols-1 lg:grid-cols-2',
	storyTile: 'px-5 py-16 sm:px-10 lg:px-14 lg:py-24 2xl:px-20',
	note: 'mb-4 text-accent-soft/85',
	noteStroke: 'w-28',
	heading: 'text-[clamp(2rem,3.2vw,3rem)] leading-[1.1] font-medium text-white',
	paragraphs: 'mt-8 flex max-w-[52ch] flex-col gap-5',
	paragraph: 'text-[1.15rem] leading-relaxed text-on-dark-muted',
	timelineTile: 'px-5 py-16 sm:px-10 lg:px-14 lg:py-24 2xl:px-20',
	timelineHeading: 'text-[1.6rem] text-white',
	timeline:
		'm-0 mt-8 flex list-none flex-col gap-8 border-l border-dashed border-guide p-0 pl-6',
	entry: 'relative',
	entryDot: 'absolute top-[0.4rem] -left-[1.72rem] size-2 bg-accent',
	entryPeriod: 'font-mono text-[0.75rem] text-accent',
	entryTitle: 'mt-1 text-[1.3rem] leading-tight font-semibold text-white',
	entryText: 'mt-1 max-w-[48ch] leading-snug text-on-dark-muted',
} satisfies Record<string, string>;
