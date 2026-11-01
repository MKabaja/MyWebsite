import type { Locale } from '@/i18n/routing';

export type Localized = Record<Locale, string>;

export type ContentBlock =
	| { type: 'heading'; text: Localized }
	| { type: 'paragraph'; text: Localized }
	| { type: 'image'; src: string; alt: Localized; caption?: Localized };

type ProjectVideo = { mp4: string; webm?: string; poster?: string };

type ProjectLinks = { live?: string; repo?: string };

export type Project = {
	slug: string;
	title: string;
	type: Localized;
	lead: Localized;
	role?: Localized;
	client?: Localized;
	completed?: string;
	stack: string[];
	video?: ProjectVideo;
	links?: ProjectLinks;
	content: ContentBlock[];
	/** Wpis bez gotowych materiałów: zamiast mediów pokazuje okładkę „wkrótce”. */
	isPlaceholder?: boolean;
};
