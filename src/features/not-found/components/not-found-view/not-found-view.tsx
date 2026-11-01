'use client';

import { ArrowUpLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/shared/components/logo';
import { TransitionLink } from '@/shared/components/page-transition';
import { Tile } from '@/shared/components/tile';
import { notFoundViewStyles } from './not-found-view.styles';

const {
	page,
	contentTile,
	message,
	errorCode,
	errorKeyword,
	errorName,
	title,
	description,
	hint,
	backLink,
	backIcon,
	windowTile,
	outlinedCode,
} = notFoundViewStyles;

export function NotFoundView() {
	const t = useTranslations();

	return (
		<div className={page}>
			<Tile as="section" className={contentTile}>
				<Logo heightInPixels={30} label={t('person.homeLink')} />

				<div className={message}>
					<p aria-hidden className={errorCode}>
						<span className={errorKeyword}>error</span> 404{' '}
						<span className={errorName}>not_found</span>
					</p>
					<h1 className={title}>{t('notFound.title')}</h1>
					<p className={description}>
						{t('notFound.text')}
						<br />
						<em className={hint}>{t('notFound.hint')}</em>
					</p>
					<TransitionLink href="/" className={backLink}>
						<ArrowUpLeft size={18} aria-hidden className={backIcon} />
						{t('notFound.back')}
					</TransitionLink>
				</div>
			</Tile>

			<Tile mode="window" lines={['top']} className={windowTile}>
				<span aria-hidden className={outlinedCode} data-speed="clamp(0.9)">
					404
				</span>
			</Tile>
		</div>
	);
}
