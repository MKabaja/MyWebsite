let ready = false;

export function initAbaut() {
  if (ready) return;
  ready = true;

  const root = document.getElementById('abaut');
  if (!root) return;

  const items = root.querySelectorAll('.card');
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;
  addHandlers();

  function addHandlers() {
    items.forEach((card) => {
      if (card.__radialMoveHandler) return;
      const handler = (e) => radialMove(card, e);
      card.__radialMoveHandler = handler;
      card.addEventListener('pointermove', handler);
    });
  }

  function removeHandlers() {
    items.forEach((card) => {
      if (!card.__radialMoveHandler) return;
      card.removeEventListener('pointermove', card.__radialMoveHandler);
      card.__radialMoveHandler = null;
    });
  }

  function radialMove(card, e) {
    //aktualizacja var-CSS
    if (card.__ticking) return;
    card.__ticking = true;
    const { left, top } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    requestAnimationFrame(() => {
      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
      card.__ticking = false;
    });
  }
  return function abortAbaut() {
    removeHandlers();
    ready = false;
  };
}
