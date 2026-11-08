'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { ProjectActions } from '@/features/projects/components/project-actions';
import { ProjectStatusBadge } from '@/features/projects/components/project-status-badge';
import { StackChips } from '@/features/projects/components/stack-chips';
import type { Project } from '@/features/projects/model/projects.types';
import { toLocale } from '@/i18n/routing';
import { TransitionLink } from '@/shared/components/page-transition';
import { projectTileStyles } from './project-tile.styles';
import { useProjectTilt } from './use-project-tilt';

type ProjectTileProps = {
	project: Project;
	index: number;
};

const {
	item,
	tiltedCard,
	tabRow,
	tabLabel,
	typeBadge,
	article,
	cornerArrow,
	statusBadge,
	title,
	titleLink,
	lead,
	stackChips,
	actions,
	detailsLink,
} = projectTileStyles;

export function ProjectTile({ project, index }: ProjectTileProps) {
	const t = useTranslations('home.projects');
	const locale = toLocale(useLocale());
	const cardRef = useProjectTilt();

	const href = `/portfolio/${project.slug}`;

	return (
		<li className={item} data-fade>
			<div ref={cardRef} className={tiltedCard}>
				<div aria-hidden className={tabRow}>
					<span className={tabLabel}>
						{t('label')} {String(index + 1).padStart(2, '0')}
					</span>
					<span className={typeBadge}>{project.type[locale]}</span>
				</div>

				<article className={article}>
					<ArrowUpRight
						data-m-depth
						aria-hidden
						strokeWidth={1.25}
						className={cornerArrow}
					/>
					<ProjectStatusBadge status={project.status} className={statusBadge} />
					<h3 className={title}>
						<TransitionLink href={href} className={titleLink}>
							{project.title}
						</TransitionLink>
					</h3>
					<p className={lead}>{project.lead[locale]}</p>

					<StackChips stack={project.stack} className={stackChips} />

					<div className={actions}>
						<ProjectActions project={project} variant="compact" />
						<TransitionLink
							href={href}
							aria-label={`${t('details')}: ${project.title}`}
							className={detailsLink}
						>
							{t('details')}
							<ArrowUpRight size={14} aria-hidden />
						</TransitionLink>
					</div>
				</article>
			</div>
		</li>
	);
}
