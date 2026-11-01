import { Marquee } from '@/shared/components/marquee';
import { TechIcon } from '@/shared/components/tech-icon';
import { toolbox } from '@/shared/lib/tech-stack';
import { cn } from '@/shared/lib/utils';
import { toolboxMarqueeStyles } from './toolbox-marquee.styles';

type ToolboxMarqueeProps = {
	className?: string;
};

const { strip, marquee, tool, toolIcon, toolName } = toolboxMarqueeStyles;

export function ToolboxMarquee({ className }: ToolboxMarqueeProps) {
	return (
		<div className={cn(strip, className)}>
			<Marquee repeat={2} durationInSeconds={45} className={marquee}>
				{toolbox.map((tech) => (
					<span key={tech.name} className={tool}>
						<TechIcon icon={tech.icon} className={toolIcon} />
						<span className={toolName}>{tech.name}</span>
					</span>
				))}
			</Marquee>
		</div>
	);
}
