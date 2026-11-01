---
paths:
  - "src/features/site-shell/**"
  - "src/features/home/components/home-page/**"
  - "src/features/projects/components/portfolio-carousel/**"
  - "src/shared/components/tile/**"
  - "src/shared/components/marquee/**"
  - "src/shared/lib/shader-cells.ts"
  - "src/shared/lib/gsap.ts"
  - "src/shared/hooks/use-split-reveal.ts"
---

# Animacje i shader

- Nie zmieniaj rozmiaru canvasa w trakcie scrolla (czyści bufor, czarne błyski). Canvas ma stały rozmiar okna i jest przycinany `clip-path` do `--grid-w`; rozmiar ustawiaj tylko w pętli renderu, w tej samej klatce co rysowanie.
- Odczyty pozycji DOM dla shadera i rysowanie rób w `gsap.ticker` (po ScrollSmootherze), nie w osobnym rAF, inaczej kafelki spóźniają się o klatkę.
- Shader rysujemy w 50% rozdzielczości i czasem z zegara tickera (niezależnie od odświeżania). Kolory w `palette`.
- Maks. 16 kafelków `grain` i 16 `accent` widocznych naraz (`MAX_CELLS`), nadmiarowe są pomijane bez błędu.
- W obszarze poszerzania siatki (pierwsze 300% scrolla na desktopie) wysokości kafelków podawaj w `vh`/px, nie zależnie od treści.
- Mobilny hero skaluj przez `transform`, nie `--grid-w` (zmiana szerokości to reflow co klatkę).
- Parallax: `data-speed="clamp(1.03…1.7)"`, `data-lag`, `data-fade`; na mobile te same wartości odtwarza `smooth-scroll.mobile-effects.ts`.
- Element, którego treść zmienia się podczas scrolla (terminal), musi mieć `overflow-anchor: none`, inaczej przeglądarka przesuwa stronę na mobile.
- Marquee: pętla `translateX(-50%)` wymaga połowy toru szerszej od ekranu; dobierz `repeat` i `duration` (prędkość zależy od długości toru).
- Tilt kart: transform na elemencie, który zawiera etykiety, inaczej etykiety stoją w miejscu.
- Karuzela na dotyku wymaga `touch-action: pan-y`, bo Draggable wymusza `manipulation` i psuje swipe.
- `cacheComponents` zostaje wyłączone: ukrywa poprzednią trasę przez `<Activity>` zamiast ją odmontować, co psuje przejścia out-in.
- Po zmianach w HMR efekty GSAP potrafią zostać w starym stanie; odśwież stronę, zanim uznasz, że coś nie działa. Na desktopie w Playwright przewijaj przez `window.scrollTo`.
