'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ContactDetails } from '@/features/contact/components/contact-details';
import { ContactForm } from '@/features/contact/components/contact-form';
import { SiteFooter } from '@/features/contact/components/site-footer';
import { Scribble } from '@/shared/components/scribble';
import { Tile } from '@/shared/components/tile';
import { useSplitReveal } from '@/shared/hooks/use-split-reveal';
import { contactSectionStyles } from './contact-section.styles';

const {
	section,
	columns,
	mainTile,
	headingRow,
	heading,
	note,
	noteStroke,
	intro,
	formWrapper,
} = contactSectionStyles;

export function ContactSection() {
	const t = useTranslations('home.contact');
	const headingRef = useRef<HTMLHeadingElement>(null);
	useSplitReveal(headingRef, { delayInSeconds: 0, isTriggeredByScroll: true });

	return (
		<section id="contact" aria-labelledby="contact-heading" className={section}>
			<div className={columns}>
				<Tile mode="solid" lines={['top']} data-m-expand className={mainTile}>
					<div className={headingRow}>
						<h2 id="contact-heading" ref={headingRef} className={heading}>
							{t('heading')}
						</h2>
						<Scribble
							variant="underline"
							className={note}
							strokeClassName={noteStroke}
						>
							{t('note')}
						</Scribble>
					</div>
					<p data-fade className={intro}>
						{t('text')}
					</p>

					<div data-fade className={formWrapper}>
						<ContactForm />
					</div>
				</Tile>

				<ContactDetails />
			</div>

			<SiteFooter />
		</section>
	);
}
