import { TechIcon } from '@/shared/components/tech-icon';
import { projectTech } from '@/shared/lib/tech-stack';
import { cn } from '@/shared/lib/utils';
import { stackChipsStyles } from './stack-chips.styles';

type StackChipsProps = {
	stack: string[];
	className?: string;
};

const techByName = new Map(projectTech.map((tech) => [tech.name, tech]));

const { list, chip, chipIcon } = stackChipsStyles;

export function StackChips({ stack, className }: StackChipsProps) {
	return (
		<ul className={cn(list, className)}>
			{stack.map((name) => {
				const tech = techByName.get(name);
				return (
					<li key={name} className={chip}>
						{tech && <TechIcon icon={tech.icon} className={chipIcon} />}
						{name}
					</li>
				);
			})}
		</ul>
	);
}
