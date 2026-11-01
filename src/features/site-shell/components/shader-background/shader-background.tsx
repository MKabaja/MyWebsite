'use client';

import { shaderBackgroundStyles } from './shader-background.styles';
import { useShaderBackground } from './use-shader-background';

const { canvas } = shaderBackgroundStyles;

export function ShaderBackground() {
	const canvasRef = useShaderBackground();

	return <canvas ref={canvasRef} aria-hidden className={canvas} />;
}
