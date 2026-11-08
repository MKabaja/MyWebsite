'use client';

import { ArrowRight, ArrowUpLeft } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ProjectActions } from '@/features/projects/components/project-actions';
import { ProjectContent } from '@/features/projects/components/project-content';
import { ProjectStatusBadge } from '@/features/projects/components/project-status-badge';
import { ProjectVideo } from '@/features/projects/components/project-video';
import type { Project } from '@/features/projects/model/projects.types';
import type { Locale } from '@/i18n/routing';
import { Logo } from '@/shared/components/logo';
import { TransitionLink } from '@/shared/components/page-transition';
import { Scribble } from '@/shared/components/scribble';
import { Tile } from '@/shared/components/tile';
import { useSplitReveal } from '@/shared/hooks/use-split-reveal';
import { DetailCell } from './project-view.detail-cell';
import { ProjectProblems } from './project-view.problems';
import { ProjectStack } from './project-view.stack';
import { ProjectStages } from './project-view.stages';
import { projectViewStyles } from './project-view.styles';

type ProjectViewProps = {
	project: Project;
	locale: Locale;
};

const {
	frame,
	backTile,
	backLink,
	backIcon,
	main,
	headerTile,
	intro,
	caseStudyStroke,
	projectType,
	title,
	lead,
	statusRow,
	statusNote,
	mediaTile,
	mediaFrame,
	video,
	imageFrame,
	image,
	actionsTile,
	actionsRow,
	detailsTile,
	details,
	sectionTile,
	contentTile,
	ctaTile,
	ctaRow,
	ctaText,
	ctaLink,
	ctaIcon,
	footerTile,
	copyright,
	asideTile,
} = projectViewStyles;

export function ProjectView({ project, locale }: ProjectViewProps) {
	const t = useTranslations();
	const titleRef = useRef<HTMLHeadingElement>(null);
	useSplitReveal(titleRef, { delayInSeconds: 0.5 });

	const { media, caseStudy } = project;

	return (
		<div className={frame}>
			<Tile mode="window" lines={['bottom']} className={backTile}>
				<TransitionLink
					href="/"
					aria-label={t('portfolio.back')}
					className={backLink}
				>
					<ArrowUpLeft aria-hidden strokeWidth={1.25} className={backIcon} />
				</TransitionLink>
			</Tile>

			<main className={main}>
				<Tile as="header" className={headerTile}>
					<Logo heightInPixels={30} label={t('person.homeLink')} />
					<div className={intro}>
						<Scribble variant="underline" strokeClassName={caseStudyStroke}>
							{t('portfolio.caseStudy')}
						</Scribble>
						<p className={projectType}>{project.type[locale]}</p>
						<h1 ref={titleRef} className={title}>
							{project.title}
						</h1>
						<p className={lead}>{project.lead[locale]}</p>
						<div className={statusRow}>
							<ProjectStatusBadge status={project.status} />
							<span className={statusNote}>{project.statusNote[locale]}</span>
						</div>
					</div>
				</Tile>

				<Tile lines={['top', 'bottom']} className={mediaTile}>
					{media.kind === 'video' ? (
						<div className={mediaFrame}>
							<ProjectVideo
								media={media}
								className={video}
								data-speed="auto"
								aria-label={t('portfolio.media', { title: project.title })}
							/>
						</div>
					) : (
						<div className={imageFrame}>
							<Image
								src={media.cover}
								alt={media.alt[locale]}
								width={media.widthInPixels}
								height={media.heightInPixels}
								className={image}
								priority
							/>
						</div>
					)}
				</Tile>

				<Tile lines={['bottom']} className={actionsTile}>
					<div className={actionsRow}>
						<ProjectActions project={project} variant="prominent" />
					</div>
				</Tile>

				<Tile lines={['bottom']} className={detailsTile}>
					<dl className={details}>
						<DetailCell label={t('portfolio.role')}>
							{project.role[locale]}
						</DetailCell>
						<DetailCell label={t('portfolio.period')}>
							{project.period[locale]}
						</DetailCell>
					</dl>
				</Tile>

				<Tile lines={['bottom']} className={contentTile}>
					<ProjectContent blocks={project.content} locale={locale} />
				</Tile>

				{caseStudy && (
					<>
						<Tile lines={['bottom']} className={sectionTile}>
							<ProjectStack groups={caseStudy.stackGroups} />
						</Tile>
						<Tile lines={['bottom']} className={sectionTile}>
							<ProjectProblems problems={caseStudy.problems} locale={locale} />
						</Tile>
						<Tile className={sectionTile}>
							<ProjectStages stages={caseStudy.stages} locale={locale} />
						</Tile>
					</>
				)}

				<Tile mode="grain" lines={['top', 'bottom']} className={ctaTile}>
					<div className={ctaRow} data-fade>
						<p className={ctaText}>{t('portfolio.ctaText')}</p>
						<TransitionLink href="/#contact" className={ctaLink}>
							{t('portfolio.cta')}
							<ArrowRight size={18} aria-hidden className={ctaIcon} />
						</TransitionLink>
					</div>
				</Tile>

				<Tile as="footer" className={footerTile}>
					<p className={copyright}>
						{t('portfolio.copyright', { year: new Date().getFullYear() })}
					</p>
				</Tile>
			</main>

			<Tile mode="grain" lines={['left']} className={asideTile} />
		</div>
	);
}
