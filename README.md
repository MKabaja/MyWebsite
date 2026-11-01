# Mateusz Kabaja — Portfolio

Osobiste portfolio w Next.js, React i TypeScript: jedna długa strona z siatki kafelków nad tłem WebGL.

Techniki inspirowane [marchantweb.com](https://marchantweb.com) (Simon Le Marchant), z własną treścią, kolorystyką i fontami.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4 + CSS Modules · Biome
- GSAP (ScrollSmoother, ScrollTrigger, SplitText, Draggable) · WebGL (własny shader)
- next-intl (PL / EN) · EmailJS (formularz) · lucide-react · simple-icons

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produkcyjny (output: standalone)
npm run start
```

## Konfiguracja

| Zmienna | Opis |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Publiczny adres strony (canonical, sitemap, hreflang) |

Dokumentacja: `docs/ARCHITECTURE.md`, `docs/MAPA-PROJEKTU.md`, `docs/kontekstProjektu.md`, `docs/HANDOFF.md`.
