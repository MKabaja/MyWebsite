import {
	type SimpleIcon,
	siBiome,
	siCss,
	siDocker,
	siFigma,
	siFirebase,
	siGit,
	siGithubactions,
	siGsap,
	siHetzner,
	siHtml5,
	siInertia,
	siJavascript,
	siLaravel,
	siMysql,
	siNetlify,
	siNextdotjs,
	siNginx,
	siPhp,
	siReact,
	siReacthookform,
	siRedis,
	siSass,
	siShadcnui,
	siTailwindcss,
	siTanstack,
	siTypescript,
	siVite,
	siVitest,
	siZod,
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
	{ name: 'PHP', icon: siPhp, url: 'https://www.php.net' },
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

export const projectTech: Tech[] = [
	...toolbox,
	{ name: 'Vite', icon: siVite, url: 'https://vite.dev' },
	{
		name: 'TanStack Router',
		icon: siTanstack,
		url: 'https://tanstack.com/router',
	},
	{
		name: 'TanStack Query',
		icon: siTanstack,
		url: 'https://tanstack.com/query',
	},
	{
		name: 'TanStack Table',
		icon: siTanstack,
		url: 'https://tanstack.com/table',
	},
	{
		name: 'React Hook Form',
		icon: siReacthookform,
		url: 'https://react-hook-form.com',
	},
	{ name: 'Zod', icon: siZod, url: 'https://zod.dev' },
	{ name: 'shadcn/ui', icon: siShadcnui, url: 'https://ui.shadcn.com' },
	{ name: 'MySQL', icon: siMysql, url: 'https://www.mysql.com' },
	{ name: 'Redis', icon: siRedis, url: 'https://redis.io' },
	{ name: 'Vitest', icon: siVitest, url: 'https://vitest.dev' },
	{ name: 'Biome', icon: siBiome, url: 'https://biomejs.dev' },
	{ name: 'Docker', icon: siDocker, url: 'https://www.docker.com' },
	{ name: 'nginx', icon: siNginx, url: 'https://nginx.org' },
	{ name: 'Hetzner', icon: siHetzner, url: 'https://www.hetzner.com' },
	{
		name: 'GitHub Actions',
		icon: siGithubactions,
		url: 'https://github.com/features/actions',
	},
	{ name: 'Netlify', icon: siNetlify, url: 'https://www.netlify.com' },
];
