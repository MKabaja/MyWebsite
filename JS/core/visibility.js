import { createObserver } from '../observer-manager.js';

let initialized = false;
export function initVisibility() {
  if (initialized) return;
  initialized = true;

  const revealIO = createObserver({ rootMargin: '20% 0px', threshold: 0 });

  const wire = (el) => {
    if (!el) return;

    revealIO.register(el, {
      once: true,
      async attach(node) {
        node.removeAttribute('inert');
        node.classList.add('is-visible');

        switch (node.id) {
          case 'abaut': {
            const m = await import('../sections/abaut.js');
            m.initAbaut?.();
            break;
          }
          case 'projects': {
            const m = await import('../sections/projects.js');
            m.initProject?.();
            break;
          }
          case 'contact': {
            const m = await import('../sections/contact.js');
            m.initContact?.();
            break;
          }
        }
      },
    });
  };
  wire(document.getElementById('abaut'));
  wire(document.getElementById('projects'));
  wire(document.getElementById('contact'));

  import('./spline-hero.js').then((m) => m.initSplineHero?.());
}
