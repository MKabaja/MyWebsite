'use client';

import { ContactSection } from '@/features/contact/components/contact-section';
import { AboutSection } from '@/features/home/components/about-section';
import { HeroSection } from '@/features/home/components/hero-section';
import { HireSection } from '@/features/home/components/hire-section';
import { StorySection } from '@/features/home/components/story-section';
import { PortfolioSection } from '@/features/projects/components/portfolio-section';
import { ProjectsSection } from '@/features/projects/components/projects-section';
import { homePageStyles } from './home-page.styles';
import { useGridWidening } from './use-grid-widening';

const { frame } = homePageStyles;

export function HomePage() {
	useGridWidening();

	return (
		<>
			<div data-m-frame className={frame}>
				<HeroSection />
				<AboutSection />
			</div>
			<HireSection />
			<PortfolioSection />
			<ProjectsSection />
			<StorySection />
			<ContactSection />
		</>
	);
}
