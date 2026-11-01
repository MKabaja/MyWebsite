'use client';

import { ArrowRight, ArrowUpLeft, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ProjectContent } from '@/features/projects/components/project-content';
import { StackChips } from '@/features/projects/components/stack-chips';
import type { Project } from '@/features/projects/model/projects.types';
import type { Locale } from '@/i18n/routing';
import { GithubIcon } from '@/shared/components/brand-icons';
import { Logo } from '@/shared/components/logo';
import { TransitionLink } from '@/shared/components/page-transition';
import { Scribble } from '@/shared/components/scribble';
import { Tile } from '@/shared/components/tile';
import { useSplitReveal } from '@/shared/hooks/use-split-reveal';
import { cn } from '@/shared/lib/utils';
import { DetailCell } from './project-view.detail-cell';
import styles from './project-view.module.css';
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
	mediaTile,
	mediaFrame,
	video,
	placeholderCover,
	placeholderTitle,
	placeholderSoon,
	detailsTile,
	details: detailList,
	links,
	link,
	soonBadge,
	contentTile,
	placeholderNote,
	placeholderNotePrefix,
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

	const { live, repo } = project.links ?? {};
	const details = [
		project.client && {
			label: t('portfolio.client'),
			value: project.client[locale],
		},
		project.role && { label: t('portfolio.role'), value: project.role[locale] },
		project.completed && {
			label: t('portfolio.completed'),
			value: project.completed,
		},
	].filter((detail) => !!detail);

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
					</div>
				</Tile>

				<Tile lines={['top', 'bottom']} className={mediaTile}>
					<div className={mediaFrame}>
						{project.video ? (
							<video
								className={video}
								data-speed="auto"
								loop
								muted
								autoPlay
								playsInline
								poster={project.video.poster}
								aria-label={t('portfolio.media', { title: project.title })}
							>
								{project.video.webm && (
									<source src={project.video.webm} type="video/webm" />
								)}
								<source src={project.video.mp4} type="video/mp4" />
							</video>
						) : (
							<div
								aria-hidden
								data-speed="auto"
								className={cn(styles.placeholder, placeholderCover)}
							>
								<span className={placeholderTitle}>{project.title}</span>
								<span className={placeholderSoon}>
									&lt; {t('home.projects.soon')} /&gt;
								</span>
							</div>
						)}
					</div>
				</Tile>

				<Tile lines={['bottom']} className={detailsTile}>
					<dl className={detailList}>
						{details.map(({ label, value }) => (
							<DetailCell key={label} label={label}>
								{value}
							</DetailCell>
						))}
						<DetailCell label={t('portfolio.stack')}>
							<StackChips stack={project.stack} />
						</DetailCell>
						{(live || repo || project.isPlaceholder) && (
							<DetailCell label={t('portfolio.links')}>
								<div className={links}>
									{live && (
										<a
											href={live}
											target="_blank"
											rel="noopener noreferrer"
											className={link}
										>
											<ExternalLink size={14} aria-hidden />
											{t('portfolio.live')}
										</a>
									)}
									{repo && (
										<a
											href={repo}
											target="_blank"
											rel="noopener noreferrer"
											className={link}
										>
											<GithubIcon size={14} />
											{t('portfolio.repo')}
										</a>
									)}
									{!live && !repo && (
										<span className={soonBadge}>{t('home.projects.soon')}</span>
									)}
								</div>
							</DetailCell>
						)}
					</dl>
				</Tile>

				<Tile className={contentTile}>
					{project.isPlaceholder || project.content.length === 0 ? (
						<p className={placeholderNote} data-fade>
							<span className={placeholderNotePrefix}>{'// '}</span>
							{t('portfolio.placeholderNote')}
						</p>
					) : (
						<ProjectContent blocks={project.content} locale={locale} />
					)}
				</Tile>

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
