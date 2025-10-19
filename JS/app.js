import { initHeader } from './header.js';
import { createObserver } from './observer-manager.js';
// odpal tylko jeśli na stronie jest <header>
window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('header')) {
    initHeader();
  }
});
const observer = createObserver({
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px',
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
  observer.register(abautSection, {
    attach() {
      addHandlers();
    },
    detach() {
      removeHandlers();
    },
  });
  // const io = new IntersectionObserver(
  //   ([entry]) => {
  //     if (entry.isIntersecting) {
  //       addHandlers();
  //     } else {
  //       removeHandlers();
  //     }
  //   },
  //   { threshold: 0.15 },
  // );
  // io.observe(abautSection);
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

      const handlerEnter = () => playHandler(vid);
      const handlerLeave = () => stopHandler(vid);

      vid.__vidPlayHandler = handlerEnter;
      vid.__vidPlayHandler2 = handlerLeave;

      vid.addEventListener('mouseenter', handlerEnter);
      vid.addEventListener('mouseleave', handlerLeave);
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

  observer.register(projectsSection, {
    attach() {
      addHandlers();
    },
    detach() {
      removeHandlers();
    },
  });
  // const ioSecond = new IntersectionObserver(
  //   ([entry]) => {
  //     if (entry.isIntersecting) {
  //       addHandlers();
  //     } else {
  //       removeHandlers();
  //     }
  //   },
  //   { threshold: 0.2 },
  // );
  // ioSecond.observe(projectsSection);
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
const contactSection = document.getElementById('contact');
const form = contactSection?.querySelector('#contact-form');
if (contactSection && form) {
  const onSubmit = (e) => {
    e.preventDefault();
    toastHandler();
    form.reset();
  };
  const addHandler = () => {
    if (form.__submitHandlerAttached) return;
    form.addEventListener('submit', onSubmit);
    form.__submitHandlerAttached = true;
  };
  const removeHandler = () => {
    if (!form.__submitHandlerAttached) return;
    form.removeEventListener('submit', onSubmit);
    form.__submitHandlerAttached = false;
  };

  observer.register(contactSection, {
    attach() {
      addHandler();
    },
    detach() {
      removeHandler();
    },
  });
}
function toastHandler() {
  const msg = contactSection.querySelector('#contact-form__succes');

  showMsg(msg);

  setTimeout(() => hideMsg(msg), 3000);
}

function showMsg(msg) {
  msg.classList.remove('hidden', 'opacity-0');
  requestAnimationFrame(() => msg.classList.add('opacity-100'));
}
function hideMsg(msg) {
  const onEnd = (e) => {
    if (e.propertyName !== 'opacity') return;
    msg.removeEventListener('transitionend', onEnd);
    msg.classList.add('hidden');
  };
  msg.addEventListener('transitionend', onEnd, { once: true });
  msg.classList.remove('opacity-100');
  msg.classList.add('opacity-0');
}
