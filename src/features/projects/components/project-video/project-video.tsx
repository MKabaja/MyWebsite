'use client';

import type { ComponentProps } from 'react';
import type { ProjectVideoMedia } from '@/features/projects/model/projects.types';
import { useAutoplayWhenVisible } from '@/shared/hooks/use-autoplay-when-visible';

type ProjectVideoProps = ComponentProps<'video'> & {
	media: ProjectVideoMedia;
};

export function ProjectVideo({ media, ...videoProps }: ProjectVideoProps) {
	const videoRef = useAutoplayWhenVisible();

	return (
		<video
			{...videoProps}
			ref={videoRef}
			muted
			loop
			playsInline
			preload="none"
			poster={media.cover}
		>
			<source src={media.mp4} type="video/mp4" />
		</video>
	);
}
