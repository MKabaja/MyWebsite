import { initHeader } from './header.js';
import { initVisibility } from './core/visibility.js';
import { initModels3D } from './core/spline.controler.js';
import { createObserver } from './observer-manager.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

window.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('header')) {
    initHeader();
    initVisibility();
    initModels3D();
    setupScrollDown();
  }
});

function setupScrollDown() {
  const scrollDown = document.getElementById('scroll-down');

  const sections = document.querySelectorAll('section');
  const io = createObserver({ threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
  io.registerAll(sections, (el) => ({
    attach() {
      if (el.id === 'contact') {
        scrollDown.classList.add('duration-200', 'rotate-180');

        scrollDown.removeEventListener('click', scrollToFooter);
        scrollDown.addEventListener('click', scrollToHome);
      } else {
        scrollDown.classList.remove('duration-200', 'rotate-180');
        scrollDown.removeEventListener('click', scrollToHome);
        scrollDown.addEventListener('click', scrollToFooter);
      }
    },
    detach() {},
  }));
}
function scrollToHome() {
  const section = document.getElementById('header');
  if (!section) return;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function scrollToFooter() {
  const section = document.getElementById('footer');
  if (!section) return;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
