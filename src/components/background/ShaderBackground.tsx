"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { collectCells, MAX_CELLS } from "./cells";
import { createProgram } from "./shader";

/**
 * Fixed WebGL background shared by every page. It is drawn at a fraction of the CSS size —
 * the upscale softens the image and keeps GPU/memory use low.
 *
 * The canvas always covers the whole viewport and is only clipped to `--grid-w` (`--shader-w` on phones): resizing it
 * while the grid widens would clear the buffer (black flashes) and stretch the blob.
 * Frames are drawn from the GSAP ticker, right after ScrollSmoother moved the content,
 * so the grain/accent cells never lag behind their tiles.
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

    const scale = 0.5;
    // Called from the render loop, so a resize (which clears the buffer) is redrawn in the same frame.
    const resize = () => {
      const width = Math.max(1, Math.round(canvas.clientWidth * scale));
      const height = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
    };

    const narrow = window.matchMedia("(max-width: 991px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMobile = () => narrow.matches && reduced.matches;
    let alive = true;
    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    const onMouseMove = (event: MouseEvent) => {
      if (reducedMobile()) return;
      target.x = event.clientX / window.innerWidth;
      target.y = event.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Touch devices steer the blob by tilting the phone instead of the mouse.
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (reducedMobile()) return;
      if (event.gamma === null || event.beta === null) return;
      target.x = gsap.utils.clamp(0, 1, 0.5 + event.gamma / 60);
      target.y = gsap.utils.clamp(0, 1, 0.5 + (event.beta - 45) / 60);
    };
    // iOS only delivers orientation after a permission prompt, which must come from a user gesture.
    const Orientation = window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    const askPermission = () => {
      if (reducedMobile()) return;
      Orientation.requestPermission?.()
        .then((state) => alive && state === "granted" && !reducedMobile() && window.addEventListener("deviceorientation", onOrientation))
        .catch(() => {});
    };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse && Orientation) {
      if (Orientation.requestPermission) window.addEventListener("touchend", askPermission, { once: true });
      else window.addEventListener("deviceorientation", onOrientation);
    }

    const intro = { value: reducedMobile() ? 0 : 2 };
    const introTween = gsap.to(intro, { duration: 10, value: 0, ease: "expo.out" });

    // `time` is the ticker's clock in seconds, so the animation speed doesn't depend on the refresh rate.
    const render = (time: number) => {
      if (document.hidden) return;
      resize();
      if (reducedMobile()) { mouse.x = 0.5; mouse.y = 0.5; }
      else {
        mouse.x += (target.x - mouse.x) * 0.1;
        mouse.y += (target.y - mouse.y) * 0.1;
      }
      collectCells(canvas.getBoundingClientRect(), grain, accent);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, reducedMobile() ? 0 : time * 0.6);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      gl.uniform1f(uniforms.intro, reducedMobile() ? 0 : intro.value);
      gl.uniform4fv(uniforms.grain, grain);
      gl.uniform4fv(uniforms.accent, accent);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    gsap.ticker.add(render);

    return () => {
      alive = false;
      gsap.ticker.remove(render);
      introTween.kill();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("touchend", askPermission);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh w-full [clip-path:inset(0_max(0px,calc(50%-var(--shader-w,var(--grid-w,100vw))/2)))]"
    />
  );
}
