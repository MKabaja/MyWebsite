export function createObserver(options = {}) {
  const ioOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
    ...options,
  };

  /**
   *  Używamy new WeakMap w celu UNIKNIĘCIA WYCIEKÓW PAMIĘCI (Memory Leaks).
   *  WeakMap jest kolekcją, która trzyma klucze (MUSZĄ BYĆ TO OBIEKTY)
   *  w formie "słabych referencji" (Weak References).
   *  CO TO ZNACZY: Jeśli obiekt używany jako klucz zostanie usunięty
   *  (czyli przestanie być referencjonowany w naszym kodzie),
   *  Garbage Collector (GC) może go usunąć z pamięci, a powiązana
   *  z nim para (klucz-wartość) zostanie automatycznie usunięta
   *  z WeakMap.
   *  ZWYKŁY MAP: Użycie Map blokowałoby usunięcie klucza, powodując
   *  "wyciek pamięci" dla danych, które nie są już potrzebne.
   *  CEL: Idealne do przechowywania prywatnych danych lub metadanych
   *  powiązanych z instancjami obiektów, które powinny zniknąć
   *  razem z tymi instancjami.
   */

  //Mapuję kazdy element na metadane i stan
  const meta = new WeakMap();

  // jedna instacja IntersectionObserver
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target;
      const m = meta.get(el);
      if (!m) continue;

      if (entry.isIntersecting && !m.isActive) {
        m.isActive = true;
        m.attach?.(el);
        if (m.once) io.unobserve(el);
      } else if (!entry.isIntersecting && m.isActive) {
        m.isActive = false;
        m.detach?.(el);
      }
    }
  }, ioOptions);

  const api = {
    register(el, { attach, detach, once } = {}) {
      if (!el || meta.has(el)) return;
      meta.set(el, { attach, detach, once: !!once, isActive: false });
      io.observe(el);
    },
    unregister(el) {
      const m = meta.get(el);
      if (!m) return;
      if (m.isActive && m.detach) m.detach(el);
      io.unobserve(el);
      meta.delete(el);
    },
    registerAll(elements, factory) {
      if (!elements) return;
      const list = Array.from(elements);
      for (const el of list) {
        const cfg = typeof factory === 'function' ? factory(el) : {};
        api.register(el, cfg);
      }
    },
  };
  return api;
}
