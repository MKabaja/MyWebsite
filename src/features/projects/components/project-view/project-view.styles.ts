const gutter = 'px-6 sm:px-10 lg:px-[clamp(3rem,6vw,6.5rem)]';

export const projectViewStyles = {
	frame: 'grid-frame flex min-h-svh flex-col lg:flex-row',
	backTile:
		'shrink-0 p-5 lg:w-[clamp(5rem,11vw,170px)] lg:border-r lg:border-b-0 lg:p-6',
	backLink:
		'mouse-md inline-block text-on-dark transition-colors hover:text-accent',
	backIcon: 'size-10 lg:size-12',
	main: 'flex min-w-0 flex-1 flex-col',
	headerTile: `${gutter} pt-10 pb-12 lg:pt-12 lg:pb-16`,
	intro: 'mt-20 lg:mt-36',
	caseStudyStroke: 'max-w-36 text-accent/70',
	projectType:
		'mt-6 font-mono text-[0.8rem] tracking-wide text-accent lowercase',
	title: 'mt-2 text-[clamp(3rem,7vw,6.5rem)] leading-none font-semibold',
	lead: 'mt-6 max-w-[46ch] text-[1.3rem] leading-snug text-on-dark-muted lg:text-[1.45rem]',
	mediaTile: gutter,
	mediaFrame:
		'relative aspect-video overflow-hidden border-x border-dashed border-guide bg-ink',
	video: 'mouse-md absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover',
	placeholderCover:
		'absolute inset-x-0 -top-[6%] flex h-[112%] flex-col items-center justify-center gap-3',
	placeholderTitle:
		'text-[clamp(2rem,6vw,5rem)] leading-none font-semibold text-on-dark/90',
	placeholderSoon: 'font-mono text-[0.85rem] text-cyber-soft',
	detailsTile: gutter,
	details:
		'm-0 grid grid-cols-1 border-x border-dashed border-guide sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))]',
	detailCell:
		'border-b border-dashed border-guide p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2n)]:border-r xl:last:border-r-0',
	detailLabel:
		'font-mono text-[0.72rem] tracking-wider text-on-dark-muted uppercase',
	detailValue: 'm-0 mt-3 text-[1.15rem] leading-snug',
	links: 'flex flex-col items-start gap-2',
	link: 'mouse-sm inline-flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-wide text-on-dark transition-colors hover:text-accent',
	soonBadge:
		'border border-cyber/40 px-2 py-1 font-mono text-[0.7rem] leading-none text-cyber-soft uppercase',
	contentTile: `${gutter} py-16 lg:py-24`,
	placeholderNote: 'max-w-[60ch] font-mono text-[0.95rem] text-on-dark-muted',
	placeholderNotePrefix: 'text-accent',
	ctaTile: `${gutter} py-16 lg:py-20`,
	ctaRow:
		'flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between',
	ctaText:
		'max-w-[28ch] text-[1.6rem] leading-tight font-semibold lg:text-[2rem]',
	ctaLink:
		'mouse-md group inline-flex items-center gap-3 bg-accent px-6 py-4 font-mono text-[0.9rem] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-accent-soft',
	ctaIcon: 'transition-transform group-hover:translate-x-1',
	footerTile: `${gutter} py-8`,
	copyright: 'font-mono text-[0.72rem] text-on-dark-muted/70',
	asideTile: 'hidden w-[clamp(3rem,7vw,9rem)] shrink-0 xl:block',
} satisfies Record<string, string>;
