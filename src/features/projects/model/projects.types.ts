import type { Locale } from '@/i18n/routing';

export type Localized = Record<Locale, string>;

export type ContentBlock =
	| { type: 'heading'; text: Localized }
	| { type: 'paragraph'; text: Localized }
	| { type: 'image'; src: string; alt: Localized; caption?: Localized };

export type ProjectStatus = 'completed' | 'in-progress' | 'early';

export type ProjectVideoMedia = { kind: 'video'; cover: string; mp4: string };

type ProjectImageMedia = {
	kind: 'image';
	cover: string;
	widthInPixels: number;
	heightInPixels: number;
	alt: Localized;
};

type ProjectMedia = ProjectVideoMedia | ProjectImageMedia;

export type ProjectRepository = {
	url: string;
	part?: 'frontend' | 'backend';
};

type ProjectLinks = {
	live: string;
	repositories: ProjectRepository[];
};

export type StackGroupName =
	| 'frontend'
	| 'backend'
	| 'quality'
	| 'infrastructure';

export type ProjectStackGroup = {
	name: StackGroupName;
	technologies: string[];
};

export type ProjectProblem = {
	title: Localized;
	problem: Localized;
	solution: Localized;
};

export type ProjectStageState = 'done' | 'current' | 'planned';

export type ProjectStage = {
	state: ProjectStageState;
	title: Localized;
	description: Localized;
};

type ProjectCaseStudy = {
	stackGroups: ProjectStackGroup[];
	problems: ProjectProblem[];
	stages: ProjectStage[];
};

export type Project = {
	slug: string;
	title: string;
	type: Localized;
	lead: Localized;
	status: ProjectStatus;
	statusNote: Localized;
	role: Localized;
	period: Localized;
	stack: string[];
	media: ProjectMedia;
	links: ProjectLinks;
	content: ContentBlock[];
	/** Brak oznacza krótki wpis: projekt jest tylko w karuzeli, bez karty na liście. */
	caseStudy?: ProjectCaseStudy;
};
