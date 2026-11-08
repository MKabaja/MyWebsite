'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProjectTile } from '@/features/projects/components/project-tile';
import { projects } from '@/features/projects/model/projects.constants';
import { LineNumbers } from '@/shared/components/line-numbers';
import { Marquee } from '@/shared/components/marquee';
import { Tile } from '@/shared/components/tile';
import { projectsSectionStyles } from './projects-section.styles';

const {
	marqueeBar,
	marqueeText,
	layout,
	introTile,
	heading,
	introText,
	gutter,
	lineNumbersTile,
	lineNumbers,
	gutterGrainTile,
	listTile,
	list,
} = projectsSectionStyles;

const listedProjects = projects.filter((project) => project.caseStudy);

export function ProjectsSection() {
	const t = useTranslations('home.projects');

	return (
		<section data-m-recede id="projects" aria-labelledby="projects-heading">
			<div aria-hidden className={marqueeBar}>
				<Marquee repeat={16} durationInSeconds={87}>
					<span className={marqueeText}>{t('marquee')}</span>
					<X size={14} strokeWidth={3} />
				</Marquee>
			</div>

			<div className={layout}>
				<Tile lines={['bottom']} data-m-expand className={introTile}>
					<h2 id="projects-heading" className={heading}>
						{t('heading')}
					</h2>
					<p className={introText}>{t('text')}</p>
				</Tile>

				<div aria-hidden className={gutter}>
					<Tile lines={['left', 'right']} className={lineNumbersTile}>
						<LineNumbers count={60} className={lineNumbers} />
					</Tile>
					<Tile mode="grain" lines={['right']} className={gutterGrainTile} />
				</div>

				<Tile className={listTile}>
					<ul className={list}>
						{listedProjects.map((project, index) => (
							<ProjectTile key={project.slug} project={project} index={index} />
						))}
					</ul>
				</Tile>
			</div>
		</section>
	);
}
