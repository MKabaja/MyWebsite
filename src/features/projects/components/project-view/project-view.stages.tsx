import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type {
	ProjectStage,
	ProjectStageState,
} from '@/features/projects/model/projects.types';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/shared/lib/utils';
import styles from './project-view.module.css';
import {
	markerClassNameByState,
	projectViewStyles,
	segmentClassNameByState,
	stateClassNameByState,
} from './project-view.styles';

type ProjectStagesProps = {
	stages: ProjectStage[];
	locale: Locale;
};

const {
	sectionHeading,
	stagesHeader,
	stagesProgress,
	progressBar,
	progressSegment,
	stageList,
	stageEntry,
	stageMarker,
	stageBody,
	stageTitleRow,
	stageTitle,
	stageState,
	stageDescription,
} = projectViewStyles;

export function ProjectStages({ stages, locale }: ProjectStagesProps) {
	const t = useTranslations('portfolio');
	const doneCount = stages.filter(({ state }) => state === 'done').length;

	return (
		<>
			<div className={stagesHeader} data-fade>
				<h2 className={sectionHeading}>{t('stagesHeading')}</h2>
				<p className={stagesProgress}>
					{t('stagesProgress', { done: doneCount, total: stages.length })}
				</p>
			</div>

			<div aria-hidden className={progressBar} data-fade>
				{stages.map(({ title, state }) => (
					<span
						key={title.en}
						className={cn(progressSegment, segmentClassNameByState[state])}
					/>
				))}
			</div>

			<ol className={stageList}>
				{stages.map(({ title, description, state }) => (
					<li key={title.en} className={cn(styles.stage, stageEntry)} data-fade>
						<StageMarker state={state} />
						<div className={stageBody}>
							<div className={stageTitleRow}>
								<h3 className={stageTitle}>{title[locale]}</h3>
								<span className={cn(stageState, stateClassNameByState[state])}>
									{t(`stageStates.${state}`)}
								</span>
							</div>
							<p className={stageDescription}>{description[locale]}</p>
						</div>
					</li>
				))}
			</ol>
		</>
	);
}

function StageMarker({ state }: { state: ProjectStageState }) {
	return (
		<span
			aria-hidden
			className={cn(
				stageMarker,
				markerClassNameByState[state],
				state === 'current' && styles.currentMarker,
			)}
		>
			{state === 'done' && <Check size={13} strokeWidth={3} />}
		</span>
	);
}
