import { createObserver } from '../observer-manager';
let ready = false;
export function initProject() {
  if (ready) return;
  ready = true;

  const root = document.getElementById('projects');

  if (!root) return;
  const videos = root.querySelectorAll('video');
  videos.forEach((vid) => {
    const handlerEnter = () => playHandler(vid);

    const handlerLeave = () => vid.pause();

    vid.addEventListener('mouseenter', handlerEnter, { once: true });
    vid.addEventListener('mouseleave', handlerLeave);
  });

  function playHandler(vid) {
    vid.muted = true;
    vid.playsInline = true;
    vid.play().catch(() => {});
  }
  function stopHandler(vid) {
    vid.pause();
    vid.currentTime = 0;
  }

  const videoIO = createObserver({ threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
  videoIO.registerAll(videos, (el) => ({
    attach() {
      if (!el.closest('[data-state="locked"]')) playHandler(el);
    },
    detach() {
      stopHandler(el);
    },
  }));
}
