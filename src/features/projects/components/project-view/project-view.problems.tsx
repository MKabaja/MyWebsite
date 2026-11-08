import { useTranslations } from 'next-intl';
import type { ProjectProblem } from '@/features/projects/model/projects.types';
import type { Locale } from '@/i18n/routing';
import { projectViewStyles } from './project-view.styles';

type ProjectProblemsProps = {
	problems: ProjectProblem[];
	locale: Locale;
};

const {
	sectionHeading,
	problemList,
	problemCard,
	problemTitle,
	problemLabel,
	problemText,
	solutionLabel,
} = projectViewStyles;

export function ProjectProblems({ problems, locale }: ProjectProblemsProps) {
	const t = useTranslations('portfolio');

	return (
		<>
			<h2 className={sectionHeading} data-fade>
				{t('problemsHeading')}
			</h2>
			<ul className={problemList}>
				{problems.map(({ title, problem, solution }) => (
					<li key={title.en} className={problemCard} data-fade>
						<h3 className={problemTitle}>{title[locale]}</h3>
						<p className={problemLabel}>{t('problem')}</p>
						<p className={problemText}>{problem[locale]}</p>
						<p className={solutionLabel}>{t('solution')}</p>
						<p className={problemText}>{solution[locale]}</p>
					</li>
				))}
			</ul>
		</>
	);
}
