'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from '@/shared/lib/gsap';
import { fpsMeterStyles } from './fps-meter.styles';

const FPS_TOKEN = '__fps__';
const SAMPLE_INTERVAL_MILLISECONDS = 500;
const MILLISECONDS_PER_SECOND = 1000;

const { meter, glyph, value } = fpsMeterStyles;

export function FpsMeter() {
	const t = useTranslations('home.portfolio');
	const valueRef = useRef<HTMLSpanElement>(null);
	const [textBefore, textAfter = ''] = t('fps', { fps: FPS_TOKEN }).split(
		FPS_TOKEN,
	);

	useEffect(() => {
		let frameCount = 0;
		let sampleStart = performance.now();

		function countFrame() {
			frameCount++;
			const now = performance.now();
			if (now - sampleStart < SAMPLE_INTERVAL_MILLISECONDS) return;
			if (valueRef.current) {
				valueRef.current.textContent = String(
					Math.round(
						(frameCount * MILLISECONDS_PER_SECOND) / (now - sampleStart),
					),
				);
			}
			frameCount = 0;
			sampleStart = now;
		}

		gsap.ticker.add(countFrame);
		return () => gsap.ticker.remove(countFrame);
	}, []);

	return (
		<p className={meter}>
			<span className={glyph} aria-hidden>
				⌗
			</span>
			{textBefore}
			<span ref={valueRef} className={value}>
				60
			</span>
			{textAfter}
		</p>
	);
}
