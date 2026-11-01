'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/shared/lib/gsap';
import { matchesMedia, mediaQueries } from '@/shared/lib/media-queries';
import {
	collectShaderCells,
	MAX_SHADER_CELLS,
} from '@/shared/lib/shader-cells';
import {
	bindFullscreenQuad,
	createProgram,
	FULLSCREEN_QUAD_VERTEX_COUNT,
} from './shader-background.program';

type ShaderSetup = {
	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;
	program: WebGLProgram;
};

type PointerPosition = {
	x: number;
	y: number;
};

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
	requestPermission?: () => Promise<string>;
};

const CANVAS_SCALE = 0.5;
const MOUSE_FOLLOW_RATE = 0.1;
const TIME_SCALE = 0.6;
const INTRO_START_VALUE = 2;
const INTRO_DURATION_IN_SECONDS = 10;

export function useShaderBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const gl = canvas?.getContext('webgl', {
			antialias: false,
			alpha: false,
			powerPreference: 'low-power',
		});
		if (!canvas || !gl) return;
		const program = createProgram(gl);
		if (!program) return;
		return startShaderBackground({ canvas, gl, program });
	}, []);

	return canvasRef;
}

function startShaderBackground({ canvas, gl, program }: ShaderSetup) {
	const buffer = bindFullscreenQuad(gl, program);
	const uniforms = getUniformLocations(gl, program);
	const grain = new Float32Array(MAX_SHADER_CELLS * 4);
	const accent = new Float32Array(MAX_SHADER_CELLS * 4);

	const narrowReducedMotion = window.matchMedia(
		mediaQueries.narrowReducedMotion,
	);
	function isReducedOnNarrow() {
		return narrowReducedMotion.matches;
	}

	const target = { x: 0.5, y: 0.5 };
	const mouse = { x: 0.5, y: 0.5 };
	const stopPointerInput = trackPointerInput(target, isReducedOnNarrow);

	const intro = { value: isReducedOnNarrow() ? 0 : INTRO_START_VALUE };
	const introTween = gsap.to(intro, {
		duration: INTRO_DURATION_IN_SECONDS,
		value: 0,
		ease: 'expo.out',
	});

	function render(time: number) {
		if (document.hidden) return;
		resizeCanvas(canvas);
		if (isReducedOnNarrow()) {
			mouse.x = 0.5;
			mouse.y = 0.5;
		} else {
			mouse.x += (target.x - mouse.x) * MOUSE_FOLLOW_RATE;
			mouse.y += (target.y - mouse.y) * MOUSE_FOLLOW_RATE;
		}
		collectShaderCells(canvas.getBoundingClientRect(), grain, accent);

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.uniform1f(uniforms.time, isReducedOnNarrow() ? 0 : time * TIME_SCALE);
		gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
		gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
		gl.uniform1f(uniforms.intro, isReducedOnNarrow() ? 0 : intro.value);
		gl.uniform4fv(uniforms.grain, grain);
		gl.uniform4fv(uniforms.accent, accent);
		gl.drawArrays(gl.TRIANGLES, 0, FULLSCREEN_QUAD_VERTEX_COUNT);
	}
	gsap.ticker.add(render);

	return () => {
		gsap.ticker.remove(render);
		introTween.kill();
		stopPointerInput();
		gl.deleteBuffer(buffer);
		gl.deleteProgram(program);
	};
}

function getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram) {
	return {
		time: gl.getUniformLocation(program, 'iTime'),
		resolution: gl.getUniformLocation(program, 'iResolution'),
		mouse: gl.getUniformLocation(program, 'iMouse'),
		intro: gl.getUniformLocation(program, 'iIntro'),
		grain: gl.getUniformLocation(program, 'iGrainCells'),
		accent: gl.getUniformLocation(program, 'iAccentCells'),
	};
}

function resizeCanvas(canvas: HTMLCanvasElement) {
	const width = Math.max(1, Math.round(canvas.clientWidth * CANVAS_SCALE));
	const height = Math.max(1, Math.round(canvas.clientHeight * CANVAS_SCALE));
	if (canvas.width !== width) canvas.width = width;
	if (canvas.height !== height) canvas.height = height;
}

function trackPointerInput(
	target: PointerPosition,
	isReducedOnNarrow: () => boolean,
) {
	let isTracking = true;

	function handleMouseMove(event: MouseEvent) {
		if (isReducedOnNarrow()) return;
		target.x = event.clientX / window.innerWidth;
		target.y = event.clientY / window.innerHeight;
	}

	function handleOrientation(event: DeviceOrientationEvent) {
		if (isReducedOnNarrow()) return;
		if (event.gamma === null || event.beta === null) return;
		target.x = gsap.utils.clamp(0, 1, 0.5 + event.gamma / 60);
		target.y = gsap.utils.clamp(0, 1, 0.5 + (event.beta - 45) / 60);
	}

	const orientationEvent =
		window.DeviceOrientationEvent as DeviceOrientationEventWithPermission;

	function askForOrientationPermission() {
		if (isReducedOnNarrow()) return;
		orientationEvent
			.requestPermission?.()
			.then((state) => {
				if (isTracking && state === 'granted' && !isReducedOnNarrow()) {
					window.addEventListener('deviceorientation', handleOrientation);
				}
			})
			.catch(() => undefined);
	}

	window.addEventListener('mousemove', handleMouseMove, { passive: true });

	if (matchesMedia(mediaQueries.coarsePointer) && orientationEvent) {
		if (orientationEvent.requestPermission) {
			window.addEventListener('touchend', askForOrientationPermission, {
				once: true,
			});
		} else {
			window.addEventListener('deviceorientation', handleOrientation);
		}
	}

	return () => {
		isTracking = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('deviceorientation', handleOrientation);
		window.removeEventListener('touchend', askForOrientationPermission);
	};
}
