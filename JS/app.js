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
