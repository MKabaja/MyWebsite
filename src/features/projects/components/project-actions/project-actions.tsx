'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type {
	Project,
	ProjectRepository,
	ProjectStatus,
} from '@/features/projects/model/projects.types';
import { GithubIcon } from '@/shared/components/brand-icons';
import { cn } from '@/shared/lib/utils';
import {
	liveClassNameByVariant,
	projectActionsStyles,
	repositoryClassNameByVariant,
} from './project-actions.styles';

type ProjectActionsVariant = keyof typeof liveClassNameByVariant;

type ProjectActionsProps = {
	project: Project;
	variant: ProjectActionsVariant;
};

type RepositoryPart = NonNullable<ProjectRepository['part']>;

const liveLabelKeyByStatus = {
	completed: 'live',
	'in-progress': 'liveAnyway',
	early: 'live',
} as const satisfies Record<ProjectStatus, string>;

const repositoryLabelKeyByPart = {
	frontend: 'codeFrontend',
	backend: 'codeBackend',
} as const satisfies Record<RepositoryPart, string>;

const { action } = projectActionsStyles;

export function ProjectActions({ project, variant }: ProjectActionsProps) {
	const t = useTranslations('portfolio.actions');
	const { live, repositories } = project.links;

	return (
		<>
			<a
				href={live}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(action, liveClassNameByVariant[variant])}
			>
				<ExternalLink size={14} aria-hidden />
				{t(liveLabelKeyByStatus[project.status])}
			</a>
			{repositories.map(({ url, part }) => (
				<a
					key={url}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(action, repositoryClassNameByVariant[variant])}
				>
					<GithubIcon size={14} />
					{t(part ? repositoryLabelKeyByPart[part] : 'code')}
				</a>
			))}
		</>
	);
}
