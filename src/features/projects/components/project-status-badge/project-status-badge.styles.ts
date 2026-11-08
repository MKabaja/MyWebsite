import type { ProjectStatus } from '@/features/projects/model/projects.types';

type DotClassNameByStatus = Record<ProjectStatus, string>;

export const projectStatusBadgeStyles = {
	badge:
		'inline-flex w-fit items-center gap-2 border border-white/15 px-2 py-1 font-mono text-[0.7rem] leading-none tracking-wide text-on-dark uppercase',
	dot: 'size-1.5 rounded-full',
} satisfies Record<string, string>;

export const dotClassNameByStatus: DotClassNameByStatus = {
	completed: 'bg-cyber-strong',
	'in-progress': 'bg-accent motion-safe:animate-pulse',
	early: 'bg-on-dark-muted',
};
