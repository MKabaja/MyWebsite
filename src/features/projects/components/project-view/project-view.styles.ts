import type { ProjectStageState } from '@/features/projects/model/projects.types';

type ClassNameByStageState = Record<ProjectStageState, string>;

const gutter = 'px-6 sm:px-10 lg:px-[clamp(3rem,6vw,6.5rem)]';
const monoLabel = 'font-mono text-[0.72rem] tracking-wider uppercase';

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
	statusRow: 'mt-8 flex flex-wrap items-center gap-x-4 gap-y-2',
	statusNote: 'font-mono text-[0.8rem] text-on-dark-muted',
	mediaTile: gutter,
	mediaFrame:
		'relative aspect-video overflow-hidden border-x border-dashed border-guide bg-ink',
	video: 'mouse-md absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover',
	imageFrame: 'overflow-hidden border-x border-dashed border-guide bg-ink',
	image: 'mouse-md block h-auto w-full',
	actionsTile: `${gutter} py-8`,
	actionsRow: 'flex flex-wrap items-center gap-3',
	detailsTile: gutter,
	details:
		'm-0 grid grid-cols-1 border-x border-dashed border-guide sm:grid-cols-2',
	detailCell:
		'border-b border-dashed border-guide p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0',
	detailLabel: `${monoLabel} text-on-dark-muted`,
	detailValue: 'm-0 mt-3 text-[1.15rem] leading-snug',
	sectionTile: `${gutter} py-16 lg:py-20`,
	contentTile: `${gutter} py-16 lg:py-24`,
	sectionHeading: 'text-[clamp(1.8rem,3vw,2.4rem)] leading-tight font-semibold',
	stackGroups: 'm-0 mt-8 grid gap-8 md:grid-cols-2',
	stackGroupName: `${monoLabel} mb-3 text-accent`,
	problemList:
		'm-0 mt-8 grid list-none gap-px border border-white/10 bg-white/10 p-0 md:grid-cols-2',
	problemCard: 'bg-graphite p-6 sm:p-8',
	problemTitle: 'text-[1.45rem] leading-tight font-semibold',
	problemLabel: `${monoLabel} mt-5 text-on-dark-muted`,
	solutionLabel: `${monoLabel} mt-5 text-accent`,
	problemText: 'mt-1.5 text-[1.08rem] leading-snug text-on-dark-muted',
	stagesHeader: 'flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2',
	stagesProgress: 'font-mono text-[0.8rem] text-on-dark-muted',
	progressBar: 'mt-6 flex gap-1',
	progressSegment: 'h-1 flex-1',
	stageList: 'm-0 mt-10 flex list-none flex-col gap-7 p-0',
	stageEntry: 'flex gap-5',
	stageMarker:
		'relative flex size-6.5 shrink-0 items-center justify-center rounded-full border',
	stageBody: 'min-w-0 flex-1',
	stageTitleRow: 'flex flex-wrap items-baseline gap-x-3 gap-y-1',
	stageTitle: 'text-[1.3rem] leading-tight font-semibold',
	stageState: `${monoLabel} text-[0.66rem]`,
	stageDescription: 'mt-1 text-[1.08rem] leading-snug text-on-dark-muted',
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

export const markerClassNameByState: ClassNameByStageState = {
	done: 'border-cyber-strong bg-cyber-strong/15 text-cyber-soft',
	current: 'border-accent bg-accent/20',
	planned: 'border-white/20 bg-graphite',
};

export const segmentClassNameByState: ClassNameByStageState = {
	done: 'bg-cyber-strong',
	current: 'bg-accent',
	planned: 'bg-white/12',
};

export const stateClassNameByState: ClassNameByStageState = {
	done: 'text-cyber-soft',
	current: 'text-accent',
	planned: 'text-on-dark-muted',
};
