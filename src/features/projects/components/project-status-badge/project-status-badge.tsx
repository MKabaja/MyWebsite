'use client';

import { useTranslations } from 'next-intl';
import type { ProjectStatus } from '@/features/projects/model/projects.types';
import { cn } from '@/shared/lib/utils';
import {
	dotClassNameByStatus,
	projectStatusBadgeStyles,
} from './project-status-badge.styles';

type ProjectStatusBadgeProps = {
	status: ProjectStatus;
	className?: string;
};

const labelKeyByStatus = {
	completed: 'completed',
	'in-progress': 'inProgress',
	early: 'early',
} as const satisfies Record<ProjectStatus, string>;

const { badge, dot } = projectStatusBadgeStyles;

export function ProjectStatusBadge({
	status,
	className,
}: ProjectStatusBadgeProps) {
	const t = useTranslations('portfolio.status');

	return (
		<span className={cn(badge, className)}>
			<span aria-hidden className={cn(dot, dotClassNameByStatus[status])} />
			{t(labelKeyByStatus[status])}
		</span>
	);
}
