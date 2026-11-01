export const hireTilesStyles = {
	column: 'lg:col-span-4',
	mobileStrip: 'grid h-20 grid-cols-4 lg:hidden',
	desktopGrid:
		'hidden grid-cols-2 lg:grid lg:h-full lg:grid-rows-[13rem_9rem_5rem_15rem_minmax(4rem,1fr)]',
	lineNumbersTile: 'row-span-2 flex justify-end overflow-hidden px-4 pt-3',
	closingTile: 'col-span-2',
} satisfies Record<string, string>;
