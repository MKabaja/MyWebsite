export const aboutSectionStyles = {
	section:
		'grid-frame flex flex-col lg:grid lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]',
	column: 'contents lg:flex lg:flex-col',
	noteTile: 'h-20 max-lg:order-2 lg:h-[30vh]',
	noteAccentTile: 'absolute bg-cyber/6! inset-0 lg:top-auto lg:h-[45%]',
	noteWrapper: 'absolute bottom-4 left-5 lg:bottom-[5vh] lg:left-12',
	spotlightNote: 'text-[1.7rem] text-white/90',
	spotlightNoteStroke: 'w-44 -ml-4',
	spotlightTile:
		'aspect-[4/5] max-lg:order-3 sm:aspect-square lg:aspect-auto lg:h-[70vh]',
	spotlight: 'size-full',
	introRow: 'flex max-lg:order-1 lg:h-[70vh]',
	introTile:
		'flex w-full flex-col px-5 py-14 sm:px-8 lg:w-[68%] lg:px-12 lg:pt-[8vh] lg:pb-[7vh]',
	heading:
		'max-w-[18ch] text-[clamp(2rem,2.6vw,2.6rem)] leading-[1.1] text-white',
	introCopy: 'mt-12 lg:mt-auto',
	note: 'mb-4 text-accent-soft/85',
	noteStroke: 'w-28',
	introText: 'max-w-[44ch] text-[1.15rem] leading-relaxed text-on-dark-muted',
	gutter:
		'hidden w-16 bg-ink/40 pt-[8vh] text-center mask-[linear-gradient(to_bottom,black_45%,transparent_90%)] lg:block',
	gutterNumbers: 'text-white/60',
	toolbox: 'h-[110px] max-lg:order-4 lg:h-[15vh]',
	bottomWindowTile: 'hidden h-[15vh] lg:block',
} satisfies Record<string, string>;
