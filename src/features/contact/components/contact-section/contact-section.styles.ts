export const contactSectionStyles = {
	section: 'grid-frame',
	columns: 'grid grid-cols-1 lg:grid-cols-12',
	mainTile:
		'px-5 pt-16 pb-16 sm:px-10 lg:col-span-8 lg:px-14 lg:pt-24 lg:pb-24 2xl:px-20',
	headingRow: 'flex flex-wrap items-end gap-x-8 gap-y-3',
	heading:
		'text-[3.2rem] leading-none font-medium text-white md:text-[4.8rem] xl:text-[5.6rem]',
	note: 'mb-2 -rotate-3 text-accent-soft',
	noteStroke: 'text-accent',
	intro: 'mt-8 max-w-[34em] text-[1.15rem] text-on-dark-muted',
	formWrapper: 'mt-12 max-w-3xl md:mt-16',
} satisfies Record<string, string>;
