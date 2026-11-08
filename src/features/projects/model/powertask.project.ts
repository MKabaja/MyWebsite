import type { Project } from './projects.types';

export const powertaskProject: Project = {
	slug: 'powertask',
	title: 'PowerTask',
	type: { pl: 'Jeden z pierwszych projektów', en: 'One of my first projects' },
	lead: {
		pl: 'Jedna z moich pierwszych aplikacji: planer zadań i nauki w czystym JavaScripcie z Firebase.',
		en: 'One of my first apps: a task and study planner in vanilla JavaScript with Firebase.',
	},
	status: 'early',
	statusNote: {
		pl: 'Zostawiam go jako punkt startowy',
		en: 'Kept here as my starting point',
	},
	role: { pl: 'Projekt i implementacja', en: 'Design & development' },
	period: { pl: '2025', en: '2025' },
	stack: ['JavaScript', 'SCSS', 'HTML', 'Firebase'],
	media: {
		kind: 'video',
		mp4: '/video/powertask.mp4',
		cover: '/images/projects/powertask.jpg',
	},
	links: {
		live: 'https://pwr-tsk.web.app',
		repositories: [{ url: 'https://github.com/Wichern94/To-do-App' }],
	},
	content: [
		{
			type: 'paragraph',
			text: {
				pl: 'Od tego zaczynałem. Lista zadań, roadmapy z węzłami, import wielu pozycji naraz i odmierzanie czasu nauki na dany temat, a do tego logowanie e-mailem i dane każdego użytkownika odseparowane w Firestore. Bez frameworka, na modułach ES.',
				en: 'This is where I started. A task list, roadmaps with nodes, bulk import and timeboxing per study topic, plus email sign-in and per-user data isolated in Firestore. No framework, just ES modules.',
			},
		},
	],
};
