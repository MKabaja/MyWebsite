'use client';

import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { StackChips } from '@/features/projects/components/stack-chips';
import type { Project } from '@/features/projects/model/projects.types';
import { toLocale } from '@/i18n/routing';
import { GithubIcon } from '@/shared/components/brand-icons';
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
	title,
	titleLink,
	lead,
	stackChips,
	actions,
	externalLink,
	soonBadge,
	detailsLink,
} = projectTileStyles;

export function ProjectTile({ project, index }: ProjectTileProps) {
	const t = useTranslations('home.projects');
	const locale = toLocale(useLocale());
	const cardRef = useProjectTilt();

	const href = `/portfolio/${project.slug}`;
	const { live, repo } = project.links ?? {};

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
					<h3 className={title}>
						<TransitionLink href={href} className={titleLink}>
							{project.title}
						</TransitionLink>
					</h3>
					<p className={lead}>{project.lead[locale]}</p>

					<StackChips stack={project.stack} className={stackChips} />

					<div className={actions}>
						{live && (
							<a
								href={live}
								target="_blank"
								rel="noopener noreferrer"
								className={externalLink}
							>
								<ExternalLink size={14} aria-hidden />
								{t('live')}
							</a>
						)}
						{repo && (
							<a
								href={repo}
								target="_blank"
								rel="noopener noreferrer"
								className={externalLink}
							>
								<GithubIcon size={14} />
								{t('repo')}
							</a>
						)}
						{project.isPlaceholder && (
							<span className={soonBadge}>{t('soon')}</span>
						)}
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
