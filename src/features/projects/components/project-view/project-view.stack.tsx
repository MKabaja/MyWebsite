import { useTranslations } from 'next-intl';
import { StackChips } from '@/features/projects/components/stack-chips';
import type { ProjectStackGroup } from '@/features/projects/model/projects.types';
import { projectViewStyles } from './project-view.styles';

type ProjectStackProps = {
	groups: ProjectStackGroup[];
};

const { sectionHeading, stackGroups, stackGroupName } = projectViewStyles;

export function ProjectStack({ groups }: ProjectStackProps) {
	const t = useTranslations('portfolio');

	return (
		<>
			<h2 className={sectionHeading} data-fade>
				{t('stack')}
			</h2>
			<dl className={stackGroups} data-fade>
				{groups.map(({ name, technologies }) => (
					<div key={name}>
						<dt className={stackGroupName}>{t(`stackGroups.${name}`)}</dt>
						<dd className="m-0">
							<StackChips stack={technologies} />
						</dd>
					</div>
				))}
			</dl>
		</>
	);
}
