export const reactSpotlightStyles = {
	spotlight: 'relative overflow-hidden',
	frame: 'absolute inset-5 flex flex-col border-2 border-white sm:inset-8',
	titleBar:
		'flex w-fit items-center gap-3 border-r-2 border-b-2 border-white px-5 py-3 max-lg:bg-graphite/95',
	titleIcon: 'size-7 text-white',
	titleText:
		'font-sans text-[1.9rem] leading-none font-bold tracking-wide text-white uppercase',
	atomGraphic: 'mx-auto my-auto h-auto w-[min(72%,24rem)] overflow-visible',
	orbitDot: 'fill-accent',
	description:
		'max-w-[26ch] px-5 pb-5 text-[1.05rem] leading-snug text-white/85 sm:px-6 sm:pb-6 max-lg:bg-graphite/95 max-lg:pt-4 max-lg:text-white',
} satisfies Record<string, string>;
