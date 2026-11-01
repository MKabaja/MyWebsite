import { gsap } from '@/shared/lib/gsap';

type FadeInOptions = {
	isNarrow: boolean;
};

export function fadeInOnScroll({ isNarrow }: FadeInOptions) {
	for (const element of gsap.utils.toArray<HTMLElement>('[data-fade]')) {
		if (isNarrow) fadeInNarrow(element);
		else fadeInWide(element);
	}
}

function fadeInNarrow(element: HTMLElement) {
	gsap.fromTo(
		element,
		{ opacity: 1, y: 16 },
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			ease: 'power2.out',
			clearProps: 'transform',
			scrollTrigger: { trigger: element, start: 'top bottom-=100', once: true },
		},
	);
}

function fadeInWide(element: HTMLElement) {
	gsap.fromTo(
		element,
		{
			clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
			opacity: 0,
			y: 50,
		},
		{
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			opacity: 1,
			y: 0,
			duration: 1.2,
			ease: 'power2.out',
			clearProps: 'clipPath',
			scrollTrigger: { trigger: element, start: 'top bottom-=100', once: true },
		},
	);
}
