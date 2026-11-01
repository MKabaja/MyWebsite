export const heroSectionStyles = {
	section: 'grid-frame grid grid-cols-[minmax(0,45fr)_minmax(0,55fr)]',
	column: 'contents lg:flex lg:flex-col',
	logoTile:
		'max-lg:col-start-1 max-lg:row-span-2 max-lg:row-start-1 lg:h-[50vh]',
	logo: 'absolute top-6 left-4 text-accent! lg:top-10 lg:left-12',
	logoAccentTile:
		'absolute bg-cyber/6! inset-x-0 top-[50%] h-[24%] lg:top-[56%] lg:h-[33%]',
	logoSocialLinks: 'absolute bottom-2 left-2 gap-1 lg:hidden',
	shaderNoteWrapper:
		'absolute top-[63%] right-[calc(100%-2.5rem)] hidden w-32 lg:block',
	shaderNote: 'text-[1.4rem] leading-[0.9] text-white/55',
	shaderNoteStroke: 'ml-10 -mt-1 w-20! rotate-6',
	headlineTile:
		'flex flex-col max-lg:col-span-2 max-lg:row-start-3 lg:h-[74vh]',
	leftGuide: 'top-0',
	headlineContent: 'px-5 pt-12 pb-14 sm:px-8 lg:px-12 lg:pt-[8vh] lg:pb-0',
	intro: 'mb-4 text-accent-soft/80',
	introStroke: 'w-20!',
	headline:
		'text-[clamp(2.4rem,3.7vw,3.7rem)] leading-[1.05] font-medium text-white',
	stackBar:
		'mt-auto flex items-center justify-between gap-6 border-t border-dashed border-guide px-5 py-5 sm:px-8 lg:h-20 lg:px-12 lg:py-0',
	stackList:
		'flex flex-wrap items-center gap-x-1 gap-y-1 lg:gap-x-8 lg:gap-y-4',
	stackLink:
		'mouse-sm flex max-lg:min-h-11 max-lg:min-w-11 items-center justify-center text-white/40 max-lg:text-white/75 transition-colors hover:text-white',
	stackIcon: 'size-6 lg:size-7',
	scrollDownLink:
		'mouse-sm shrink-0 text-white/50 transition-colors hover:text-accent',
	scrollDownIcon: 'size-9',
	bottomDecoration: 'hidden h-[16vh] lg:flex',
	bottomWindowTile: 'flex-1',
	bottomGrainTile: 'w-[32%]',
	statusBar: 'flex h-16 max-lg:col-start-2 max-lg:row-start-1 lg:h-20',
	statusTile: 'flex flex-1 items-center px-4 lg:px-10',
	status: 'text-white! max-lg:hidden',
	mobileLanguageSwitch:
		'bg-graphite/95 px-2 font-mono text-sm text-white lg:hidden',
	desktopLanguageTile: 'hidden items-center justify-center lg:flex lg:w-[30%]',
	desktopLanguageSwitch: 'font-mono text-sm text-white',
	shaderWindowTile:
		'h-44 max-lg:col-start-1 max-lg:row-start-4 lg:h-[calc(60vh-5rem)] lg:border-t-0',
	shaderWindowLeftLine:
		'absolute inset-y-0 left-[180px] hidden border-l border-dashed border-white/25 lg:block',
	shaderWindowRightLine:
		'absolute inset-y-0 right-[30%] hidden border-l border-dashed border-white/25 lg:block',
	portraitRow: 'contents lg:flex lg:h-[180px]',
	portraitTile:
		'aspect-square overflow-hidden bg-graphite-2 max-lg:col-start-2 max-lg:row-start-2 lg:h-full',
	portraitGlow:
		'absolute inset-0 bg-[radial-gradient(circle_at_50%_95%,rgb(255_140_50/0.6),rgb(255_107_0/0.12)_45%,transparent_70%)]',
	portrait: 'relative size-full origin-bottom object-cover object-bottom',
	socialTile:
		'flex flex-1 items-end px-6 pb-8 max-lg:col-start-2 max-lg:row-start-4 lg:border-l-0 lg:px-10 lg:pb-11',
	desktopSocialLinks: 'gap-7 max-lg:hidden',
	terminalTile:
		'p-5 max-lg:col-span-2 max-lg:row-start-5 sm:p-8 lg:h-[calc(80vh-180px)] lg:p-0',
	rightGuide: 'bottom-0',
	terminal:
		'h-56 lg:absolute lg:inset-x-[clamp(2.5rem,6%,5rem)] lg:top-[calc(40vh-180px+1.5rem)] lg:bottom-[clamp(2.5rem,8vh,5rem)] lg:h-auto',
	scrollHint:
		'absolute top-[calc(40vh-180px-3.5rem)] right-10 hidden text-white/80! lg:flex',
	socialList: 'flex items-center',
	socialLink:
		'mouse-sm flex max-lg:min-h-11 max-lg:min-w-11 items-center justify-center text-white/80 transition-colors hover:text-white',
} satisfies Record<string, string>;
