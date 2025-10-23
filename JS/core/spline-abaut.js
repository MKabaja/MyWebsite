// /JS/features/spline_about.js
let ready = false;
let scriptLoaded = false;
let viewer = null;
let active = false;
let io = null;

const SPLINE_URL = 'https://prod.spline.design/akDHOzTo50SWLgPr/scene.splinecode';
const SCRIPT_SRC = 'https://unpkg.com/@splinetool/viewer@1.10.81/build/spline-viewer.js';

function ensureScript() {
  return new Promise((res, rej) => {
    if (scriptLoaded || document.querySelector('script[data-spline-viewer]')) {
      scriptLoaded = true;
      return res();
    }
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

// poczekaj aż slot ma dodatni rozmiar (unikamy 0x0 → WebGL errors)
function waitForNonZeroSize(el) {
  return new Promise((res) => {
    const ok = () => el.clientWidth > 0 && el.clientHeight > 0;
    if (ok()) return res();
    const ro = new ResizeObserver(() => {
      if (ok()) {
        ro.disconnect();
        res();
      }
    });
    ro.observe(el);
  });
}

async function mount(slot) {
  await waitForNonZeroSize(slot);
  await ensureScript();
  if (viewer) return;

  const el = document.createElement('spline-viewer');
  el.className = 'h-[150%] w-[150%] mix-blend-lighten'; // zamiast 150% → wypełnij slot
  el.setAttribute('url', SPLINE_URL);

  viewer = el;
  slot.appendChild(el);
}

function unmount() {
  if (!viewer) return;
  viewer.remove();
  viewer = null;
}

export function initSplineAbout() {
  if (ready) return;
  ready = true;

  const section = document.getElementById('abaut');
  const slot = document.getElementById('abaut-3d');
  if (!section || !slot) return;

  io = new IntersectionObserver(
    (entries) => {
      const r = entries[0].intersectionRatio;

      // ON przy ≥ 0.50 ekranu; OFF przy ≤ 0.20 (histereza, bez „mrugania”)
      if (!active && r >= 0.5) {
        active = true;
        const run = () => mount(slot).catch(() => {});
        'requestIdleCallback' in window ? requestIdleCallback(run) : setTimeout(run, 0);
      } else if (active && r <= 0.2) {
        active = false;
        unmount();
      }
    },
    { threshold: [0, 0.2, 0.5, 0.75, 1], rootMargin: '0px 0px -15% 0px' },
  );

  io.observe(section);

  // dodatkowo: gdy karta w tle → zwolnij GPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) unmount();
    else if (active && !viewer) mount(slot);
  });
}

export function teardownSplineAbout() {
  if (io) {
    io.disconnect();
    io = null;
  }
  unmount();
  ready = false;
}
