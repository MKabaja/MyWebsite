'use client';

import { ContactSection } from '@/features/contact/components/contact-section';
import { AboutSection } from '@/features/home/components/about-section';
import { HeroSection } from '@/features/home/components/hero-section';
import { HireSection } from '@/features/home/components/hire-section';
import { PortfolioSection } from '@/features/projects/components/portfolio-section';
import { ProjectsSection } from '@/features/projects/components/projects-section';
import { useGridWidening } from './use-grid-widening';

export function HomePage() {
	useGridWidening();

	return (
		<>
			<HeroSection />
			<AboutSection />
			<HireSection />
			<PortfolioSection />
			<ProjectsSection />
			<ContactSection />
		</>
	);
}
