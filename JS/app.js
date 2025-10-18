import { initHeader } from './header.js';
// odpal tylko jeśli na stronie jest <header>
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('header')) {
    initHeader();
  }
});
// =======================================================
// Sekcja ABAUT
// =======================================================
const abautSection = document.getElementById('abaut');
const items = abautSection.querySelectorAll('.card');

if (abautSection) {
  const addHandlers = () => {
    items.forEach((card) => {
      if (card.__radialMoveHandler) return;
      const handler = (e) => radialMove(card, e);
      card.__radialMoveHandler = handler;
      card.addEventListener('mousemove', handler);
    });
  };
  const removeHandlers = () => {
    items.forEach((card) => {
      if (!card.__radialMoveHandler) return;
      card.removeEventListener('mousemove', card.__radialMoveHandler);
      card.__radialMoveHandler = null;
    });
  };

  // =======================================================
  // INTERSECTION OBSERVER I ZARZĄDZANIE PAMIĘCIĄ
  // =======================================================
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        addHandlers();
      } else {
        removeHandlers();
      }
    },
    { threshold: 0.15 },
  );
  io.observe(abautSection);
}

function radialMove(card, e) {
  //aktualizacja var-CSS
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

// =======================================================
// Auto Play na hover
// =======================================================
const projectsSection = document.getElementById('projects');

if (projectsSection) {
  const videos = projectsSection.querySelectorAll('video');
  const addHandlers = () => {
    videos.forEach((vid) => {
      if (vid.__vidPlayHandler || vid.__vidPlayHandler2) return;
      const handler = () => playHandler(vid);
      vid.__vidPlayHandler = handler;
      const handler2 = () => stopHandler(vid);
      vid.__vidPlayHandler2 = handler2;

      vid.addEventListener('mouseenter', handler);
      vid.addEventListener('mouseleave', handler2);
    });
  };
  const removeHandlers = () => {
    videos.forEach((vid) => {
      if (!vid.__vidPlayHandler || !vid.__vidPlayHandler2) return;
      vid.removeEventListener('mouseenter', vid.__vidPlayHandler);
      vid.removeEventListener('mouseleave', vid.__vidPlayHandler2);
      vid.__vidPlayHandler = null;
      vid.__vidPlayHandler2 = null;
    });
  };

  const ioSecond = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        addHandlers();
      } else {
        removeHandlers();
      }
    },
    { threshold: 0.2 },
  );
  ioSecond.observe(projectsSection);
}

function playHandler(vid) {
  vid.muted = true;
  vid.playsInline = true;
  vid.play().catch(() => {});
}
function stopHandler(vid) {
  vid.pause();
  vid.currentTime = 0;
}

// =======================================================
//  Form wiadomosci
// =======================================================
