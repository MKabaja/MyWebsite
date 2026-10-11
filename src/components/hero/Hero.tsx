"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "@/i18n/navigation";
import { getRouteKind } from "@/lib/routes";
import { CodeLine } from "@/components/ui/CodeLine";
import { CodeTag } from "@/components/ui/CodeTag";
import { Presence } from "@/components/transition/Presence";
import { createProgram } from "./shaders";
import styles from "./Hero.module.css";

const LINE_NUMBERS = Array.from({ length: 50 }, (_, i) => String(i + 1).padStart(2, "0"));
const FRAME_INTERVAL = 1000 / 60;

/** Persistent WebGL background that morphs between routes. */
export default function Hero() {
  const kind = getRouteKind(usePathname());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Per-frame values live in a ref so the render loop never triggers React renders.
  const state = useRef({
    zoomOffset: kind === "explore" ? 1 : 0,
    initialXOffset: 1,
    kind,
  });

  const isCard = kind === "about" || kind === "contact";

  useEffect(() => {
    state.current.kind = kind;
    const tween = gsap.to(state.current, {
      duration: 10,
      zoomOffset: kind === "explore" ? 1 : 0,
      ease: "power1.inOut",
    });
    return () => {
      tween.kill();
    };
  }, [kind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl");
    if (!canvas || !gl) return;
    const program = createProgram(gl);
    if (!program) return;

    const position = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]),
      gl.STATIC_DRAW,
    );
    const uniforms = {
      time: gl.getUniformLocation(program, "iTime"),
      resolution: gl.getUniformLocation(program, "iResolution"),
      mouse: gl.getUniformLocation(program, "iMouse"),
      zoomOffset: gl.getUniformLocation(program, "iZoomOffset"),
      initialXOffset: gl.getUniformLocation(program, "iInitialXOffset"),
      portfolioScrollPercentage: gl.getUniformLocation(program, "iPortfolioScrollPercentage"),
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    // Mouse in page coordinates (like VueUse `useMouse`), eased towards the target each frame.
    let clientX = 0;
    let clientY = 0;
    const mouse = { x: 0, y: 0 };
    const output = { x: 0, y: 0 };
    const updateMouse = () => {
      mouse.x = clientX + window.scrollX;
      mouse.y = clientY + window.scrollY;
    };
    const onMouseMove = (event: MouseEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      updateMouse();
    };

    let focused = document.hasFocus();
    const onFocus = () => (focused = true);
    const onBlur = () => (focused = false);

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", updateMouse, { passive: true });
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    const introTween = gsap.to(state.current, { duration: 10, initialXOffset: 0, ease: "expo.out" });

    const shouldRender = () => {
      if (!focused) return false;
      const { kind } = state.current;
      if (kind === "home" || kind === "explore") return true;
      return kind === "portfolio" && visible;
    };

    let time = 0;
    let then = Date.now();
    let frameId = 0;

    const render = () => {
      frameId = requestAnimationFrame(render);
      if (!shouldRender() && time !== 0) return;

      const now = Date.now();
      if (now - then > FRAME_INTERVAL) {
        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(program);

        gl.enableVertexAttribArray(position);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        time++;
        gl.uniform1f(uniforms.time, time * 0.01);
        gl.uniform2f(uniforms.resolution, width, height);

        output.x += (mouse.x - output.x) * 0.1;
        output.y += (mouse.y - output.y) * 0.1;
        gl.uniform2f(uniforms.mouse, output.x / width, output.y / height);

        gl.uniform1f(uniforms.zoomOffset, state.current.zoomOffset);
        gl.uniform1f(uniforms.initialXOffset, state.current.initialXOffset);
        gl.uniform1f(uniforms.portfolioScrollPercentage, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      then = Date.now() - (then % FRAME_INTERVAL);
    };
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      introTween.kill();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateMouse);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <section className={styles.hero} data-route={kind}>
      {kind === "about" && (
        <>
          <CodeLine number="00" className={styles.helloWorld}>
            <span className="code--purple">console</span>
            <span className="code--white">.</span>
            <span className="code--yellow">log</span>
            <span className="code--white">(</span>
            <span className="code--green">&quot;hello world&quot;</span>
            <span className="code--white">)</span>
            <span className="code--orange">;</span>
          </CodeLine>
          <CodeLine number="01" className={styles.expertise}>
            <span className="code--orange">const</span>
            <span className="code--yellow">&nbsp;expertise&nbsp;</span>
            <span className="code--white">= [...</span>
            <span className="code--purple">design</span>
            <span className="code--white">, ...</span>
            <span className="code--purple">dev&nbsp;</span>
            <span className="code--white">]</span>
            <span className="code--orange">;</span>
          </CodeLine>
        </>
      )}

      {kind === "contact" && (
        <>
          <CodeLine number="02" className={styles.fetchContact}>
            <span className="code--orange">await</span>
            <span className="code--orange">&nbsp;emailjs</span>
            <span className="code--white">.send(</span>
            <span className="code--green">&quot;hello&quot;</span>
            <span className="code--white">)</span>
            <span className="code--orange">;</span>
          </CodeLine>
          <CodeLine number="03" className={styles.clickCollab}>
            <span className="code--orange">onClick</span>
            <span className="code--white">={"{(e) => { new"}</span>
            <span className="code--purple">&nbsp;Collaboration</span>
            <span className="code--white">(e)</span>
            <span className="code--orange">;</span>
          </CodeLine>
        </>
      )}

      {isCard && <div className={styles.accentBar} />}

      <Presence show={isCard} name="icon-pop" timeout={{ enter: 1000, leave: 1000 }}>
        {(className) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/hero-js-icon.svg" alt="" aria-hidden className={`${styles.jsIcon} ${className}`} />
        )}
      </Presence>
      <Presence show={isCard} name="icon-pop" timeout={{ enter: 1000, leave: 1000 }}>
        {(className) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/images/hero-react-icon.svg" alt="" aria-hidden className={`${styles.reactIcon} ${className}`} />
        )}
      </Presence>

      <div className={styles.container} data-route={kind}>
        <div className={styles.sidebar} data-route={kind}>
          <CodeTag>WebGL</CodeTag>
          <div className={styles.lineNumbers}>
            {LINE_NUMBERS.map((number) => (
              <span key={number} className="line-number__line">
                {number}
              </span>
            ))}
          </div>
        </div>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </section>
  );
}
