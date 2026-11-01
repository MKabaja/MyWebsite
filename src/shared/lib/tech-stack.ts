import {
	type SimpleIcon,
	siCss,
	siFigma,
	siFirebase,
	siGit,
	siGsap,
	siHtml5,
	siInertia,
	siJavascript,
	siLaravel,
	siNextdotjs,
	siPhp,
	siReact,
	siSass,
	siTailwindcss,
	siTypescript,
} from 'simple-icons';

export type Tech = { name: string; icon: SimpleIcon; url: string };

export const coreStack: Tech[] = [
	{ name: 'React', icon: siReact, url: 'https://react.dev' },
	{ name: 'Next.js', icon: siNextdotjs, url: 'https://nextjs.org' },
	{
		name: 'TypeScript',
		icon: siTypescript,
		url: 'https://www.typescriptlang.org',
	},
	{ name: 'Laravel', icon: siLaravel, url: 'https://laravel.com' },
	{ name: 'Tailwind CSS', icon: siTailwindcss, url: 'https://tailwindcss.com' },
	{ name: 'GSAP', icon: siGsap, url: 'https://gsap.com' },
];

export const toolbox: Tech[] = [
	...coreStack,
	{
		name: 'JavaScript',
		icon: siJavascript,
		url: 'https://developer.mozilla.org/docs/Web/JavaScript',
	},
	{ name: 'PHP', icon: siPhp, url: 'https://www.php.net' },
	{ name: 'Inertia.js', icon: siInertia, url: 'https://inertiajs.com' },
	{ name: 'Firebase', icon: siFirebase, url: 'https://firebase.google.com' },
	{
		name: 'HTML',
		icon: siHtml5,
		url: 'https://developer.mozilla.org/docs/Web/HTML',
	},
	{
		name: 'CSS',
		icon: siCss,
		url: 'https://developer.mozilla.org/docs/Web/CSS',
	},
	{ name: 'SCSS', icon: siSass, url: 'https://sass-lang.com' },
	{ name: 'Figma', icon: siFigma, url: 'https://www.figma.com' },
	{ name: 'Git', icon: siGit, url: 'https://git-scm.com' },
];
