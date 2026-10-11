"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { collectCells, MAX_CELLS } from "./cells";
import { createProgram } from "./shader";

const FRAME_INTERVAL = 1000 / 60;

/**
 * Fixed WebGL background shared by every page. It is drawn at a fraction of the CSS size —
 * the upscale softens the image and keeps GPU/memory use low.
 */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;
    const program = createProgram(gl);
    if (!program) return;

    const position = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "iTime"),
      resolution: gl.getUniformLocation(program, "iResolution"),
      mouse: gl.getUniformLocation(program, "iMouse"),
      intro: gl.getUniformLocation(program, "iIntro"),
      grain: gl.getUniformLocation(program, "iGrainCells"),
      accent: gl.getUniformLocation(program, "iAccentCells"),
    };
    const grain = new Float32Array(MAX_CELLS * 4);
    const accent = new Float32Array(MAX_CELLS * 4);

    const scale = window.matchMedia("(min-width: 992px)").matches ? 0.5 : 0.35;
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    const onMouseMove = (event: MouseEvent) => {
      target.x = event.clientX / window.innerWidth;
      target.y = event.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const intro = { value: 2 };
    const introTween = gsap.to(intro, { duration: 10, value: 0, ease: "expo.out" });

    let time = 0;
    let then = 0;
    let frameId = 0;
    const render = (now: number) => {
      frameId = requestAnimationFrame(render);
      if (document.hidden || now - then < FRAME_INTERVAL) return;
      then = now - ((now - then) % FRAME_INTERVAL);

      mouse.x += (target.x - mouse.x) * 0.1;
      mouse.y += (target.y - mouse.y) * 0.1;
      collectCells(canvas.getBoundingClientRect(), grain, accent);

      gl.viewport(0, 0, canvas.width, canvas.height);
      time++;
      gl.uniform1f(uniforms.time, time * 0.01);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      gl.uniform1f(uniforms.intro, intro.value);
      gl.uniform4fv(uniforms.grain, grain);
      gl.uniform4fv(uniforms.accent, accent);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      introTween.kill();
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-1/2 -z-10 h-lvh w-(--grid-w,100vw) -translate-x-1/2"
    />
  );
}
