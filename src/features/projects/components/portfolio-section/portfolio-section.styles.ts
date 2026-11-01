export const portfolioSectionStyles = {
	section:
		'grid-frame relative overflow-hidden lg:h-[clamp(860px,118vh,1180px)]',
	layout:
		'grid h-full grid-cols-2 lg:grid-cols-[30%_1fr] lg:grid-rows-[40%_9%_1fr]',
	noteTile:
		'col-span-2 flex h-[230px] items-end justify-center pb-6 lg:col-span-1 lg:h-auto lg:items-center lg:pt-[9vw] lg:pb-0',
	note: 'text-[1.7rem] lg:text-[2rem]',
	noteStroke: 'max-w-40 text-on-dark-muted/70',
	windowTile:
		'col-span-2 h-[min(150vw,640px)] lg:col-span-1 lg:row-span-3 lg:h-auto',
	accentTile: 'h-16 lg:h-auto',
	grainTile: 'h-16 lg:h-auto',
	floatingGrain:
		'absolute top-[14%] right-[7%] hidden h-[20%] w-[13%] lg:block',
	floatingAccent:
		'absolute bottom-[16%] left-[30%] hidden h-[7%] w-[9%] lg:block',
	floatingTile: 'h-full',
	marquee:
		'pointer-events-none absolute inset-x-0 top-3 z-[5] text-[16vw] leading-[0.82] font-medium tracking-[-0.02em] text-on-dark/95 uppercase lg:top-[2.5%] lg:text-[9vw]',
	marqueeSeparator: 'px-[0.35em] font-normal',
	carouselSlot:
		'absolute inset-x-0 top-[230px] bottom-16 z-10 lg:top-[30%] lg:bottom-0',
	fpsSlot:
		'max-lg:hidden absolute bottom-16 left-0 z-20 lg:bottom-0 lg:left-[30%]',
	fpsTile: 'px-4 py-3 lg:px-5 lg:py-4',
} satisfies Record<string, string>;
