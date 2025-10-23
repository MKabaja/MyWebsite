// /JS/features/spline_hero.js
import { createObserver } from '../observer-manager.js';

let ready = false;
let scriptLoaded = false;
let viewer = null;
let active = false;
let io = null;

const SPLINE_URL = 'https://prod.spline.design/5WiJXakP8n7uKDRs/scene.splinecode';
const SCRIPT_SRC = 'https://unpkg.com/@splinetool/viewer@1.10.81/build/spline-viewer.js';

async function ensureScript() {
  if (scriptLoaded || document.querySelector('script[data-spline-viewer]')) {
    scriptLoaded = true;
    return;
  }
  await new Promise((res, rej) => {
    const s = document.createElement('script');
    s.type = 'module';
    s.src = SCRIPT_SRC;
    s.dataset.splineViewer = '1';
    s.onload = () => {
      scriptLoaded = true;
      res();
    };
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

async function mount(slot) {
  await ensureScript();
  if (viewer) return;
  viewer = document.createElement('spline-viewer');

  viewer.setAttribute('url', SPLINE_URL);
  slot.appendChild(viewer); // slot zostaje; viewer znika/pojawia się
}

function unmount() {
  if (!viewer) return;
  viewer.remove();
  viewer = null;
}

export function initSplineHero() {
  if (ready) return;
  ready = true;

  const hero = document.querySelector('section[aria-labelledby="hero-title"]');
  const heroSlot = document.getElementById('hero-3d'); // <div id="hero-3d" ...>

  if (!hero || !heroSlot) return;

  // Histereza: ON przy 0.60, OFF przy 0.25 (mniej mrugania)
  io = new IntersectionObserver(
    (entries) => {
      const r = entries[0].intersectionRatio;

      if (!active && r >= 0.6) {
        active = true;
        const run = () => mount(heroSlot).catch(() => {});
        'requestIdleCallback' in window ? requestIdleCallback(run) : setTimeout(run, 0);
      } else if (active && r <= 0.25) {
        active = false;
        unmount();
      }
    },
    { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.75, 1], rootMargin: '0px 0px -20% 0px' },
  );

  io.observe(hero);

  // (opcjonalnie) oszczędzanie baterii gdy karta w tle
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) unmount();
    else if (active && !viewer) mount(heroSlot);
  });
}

export function teardownSplineHero() {
  if (io) {
    io.disconnect();
    io = null;
  }
  unmount();
  ready = false;
}
