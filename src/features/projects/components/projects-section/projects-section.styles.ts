export const projectsSectionStyles = {
	marqueeBar:
		'bg-accent py-[1.125rem] font-mono text-[0.85rem] font-semibold tracking-[0.12em] text-ink uppercase',
	marqueeText: 'px-5',
	layout: 'grid-frame grid grid-cols-1 lg:grid-cols-[30%_auto_minmax(0,1fr)]',
	introTile: 'px-8 pt-16 pb-12 lg:border-b-0 lg:px-12 lg:pt-20',
	heading: 'text-[2.4rem] font-semibold lg:text-[2.6rem]',
	introText: 'mt-5 max-w-[32ch] text-[1.15rem] leading-snug text-on-dark-muted',
	gutter: 'hidden lg:flex',
	lineNumbersTile: 'relative w-16 overflow-hidden',
	lineNumbers: 'absolute inset-x-0 top-20 text-center',
	gutterGrainTile: 'w-[clamp(2.5rem,7vw,9rem)]',
	listTile: 'px-5 py-12 sm:px-8 lg:px-12 lg:pt-20 lg:pb-24',
	list: 'm-0 grid list-none grid-cols-1 gap-x-10 gap-y-14 p-0 md:grid-cols-2',
} satisfies Record<string, string>;
