import type { SimpleIcon } from 'simple-icons';

type TechIconProps = {
	icon: SimpleIcon;
	className?: string;
};

export function TechIcon({ icon, className }: TechIconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			<path d={icon.path} />
		</svg>
	);
}
