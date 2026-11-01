import { projects } from '@/features/projects/model/projects.constants';

export function findProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}
