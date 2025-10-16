import { initHeader } from './header.js';
// odpal tylko jeśli na stronie jest <header>
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('header')) {
    initHeader();
  }
});
//Sekcja Abaut
const createRadialMoveHandler = (card) => {
  const handler = (e) => {
    radialMove(card, e);
  };
  return handler;
};

const abautSection = document.getElementById('abaut');
abautSection.querySelectorAll('.card').forEach((card) => {
  const handler = createRadialMoveHandler(card);
  card.__radialMoveHandler = handler;

  card.addEventListener('mousemove', handler);
});

function radialMove(card, e) {
  //aktualizacja var-CSS
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--x', `${e.clientX - rect.left}px`);
  card.style.setProperty('--y', `${e.clientY - rect.left}px`);
}
