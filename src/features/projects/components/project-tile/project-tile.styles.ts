const actionLink =
	'mouse-sm inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-wide transition-colors';

export const projectTileStyles = {
	item: 'flex flex-col',
	tiltedCard: 'group flex flex-1 flex-col will-change-transform',
	tabRow:
		'flex items-end justify-between gap-4 font-mono text-[0.72rem] leading-none',
	tabLabel:
		'border border-b-0 border-white/10 bg-white/[0.04] px-2 py-1 text-on-dark-muted',
	typeBadge: 'truncate bg-accent px-2 py-1 lowercase text-ink',
	article:
		'relative flex min-h-[20rem] flex-1 flex-col border border-white/12 bg-graphite-2 p-7 transition-[border-color,background-color] duration-300 group-hover:border-white/45 group-hover:bg-[#28292d] sm:p-9 md:min-h-[25rem]',
	cornerArrow:
		'absolute top-6 right-6 size-10 text-on-dark-muted transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent',
	title: 'pr-12 text-[1.9rem] leading-[1.1] font-semibold',
	titleLink: 'mouse-md transition-colors hover:text-accent',
	lead: 'mt-4 max-w-[34ch] text-[1.15rem] leading-snug text-on-dark-muted',
	stackChips: 'mt-auto pt-10',
	actions:
		'mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dashed border-guide pt-5',
	externalLink: `${actionLink} text-on-dark hover:text-accent`,
	soonBadge:
		'border border-cyber/40 px-2 py-1 font-mono text-[0.7rem] uppercase leading-none text-cyber-soft',
	detailsLink: `${actionLink} ms-auto text-accent hover:text-accent-soft`,
} satisfies Record<string, string>;
