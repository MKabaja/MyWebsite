export const hireSectionStyles = {
	section: 'grid-frame grid grid-cols-1 lg:grid-cols-12',
	contentTile:
		'px-5 pt-16 pb-16 sm:px-10 lg:col-span-8 lg:px-14 lg:pt-24 lg:pb-28 2xl:px-20',
	heading:
		'max-w-[21em] text-[1.9rem] leading-[1.2] font-medium text-white md:text-[2.4rem]',
	headingRolesText: 'text-accent',
	columns: 'mt-14 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-x-16 md:gap-y-20',
	achievementsColumn: 'md:row-span-2',
	columnHeading: 'text-[1.6rem] text-white',
	stackList: 'mt-5 space-y-1.5',
	stackEntry: 'flex items-center gap-3 text-on-dark-muted',
	stackIcon: 'size-4 shrink-0 opacity-70',
	achievementList: 'mt-5 space-y-3',
	achievementEntry: 'flex gap-3 text-on-dark-muted',
	achievementDash: 'mt-[0.8em] h-px w-3 shrink-0 bg-accent',
	contactLink:
		'mouse-md group mt-12 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 py-2 text-[1.05rem] font-semibold text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
	contactLinkIcon:
		'transition-transform duration-300 group-hover:translate-x-1',
	skillList: 'mt-5 space-y-1.5',
	skillEntry: 'text-on-dark-muted',
} satisfies Record<string, string>;
