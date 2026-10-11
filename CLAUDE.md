# CLAUDE.md — Portfolio Mateusza Kabaji (Next.js)

Zasady dla agentów (Claude, Codex, subagenci) pracujących w tym repo.

## Cel projektu

Przepisanie strony **Marchant Web '24** (Nuxt 3 / Vue 3, autor: Simon Le Marchant) na
**Next.js (App Router) + React + TypeScript** jako osobistego portfolio Mateusza Kabaji
— dla rekruterów i klientów indywidualnych.

- Źródło (tylko do odczytu, NIE modyfikować): `/home/mateusz/projects/Marchant-Web-main/Marchant-Web-main`
- Cel: to repo (`MyWebsite`), branch `nextjs-rewrite`. `main` zawiera starą stronę (Vite + Tailwind) — nie ruszać.
- Treści, zdjęcia, wideo i dane o Mateuszu bierzemy ze starej strony (historia `main`: `index.html`, `public/`).

**Priorytet nr 1: wygląd i animacje 1:1 z oryginałem.** Zmieniamy technologię i treść, nie design.

## Stack

- Next.js (najnowsza stabilna, App Router, `src/`), React, TypeScript `strict`
- Style: SCSS Modules (port 1:1 stylów `scoped` z plików `.vue`) + globalne SCSS (`app.scss`, typografia,
  siatka/utility Bootstrapa jak w oryginale) — *do potwierdzenia przez Mateusza*
- Animacje: `gsap` (publiczny pakiet z npm — Draggable/InertiaPlugin/Observer są darmowe; nie używać
  prywatnego registry ani tokenu z `.npmrc` oryginału), animacje CSS/keyframes przeniesione bez zmian, `aos`
- WebGL: czysty WebGL + shadery z oryginału (bez three.js)
- Ikony: **wyłącznie `lucide-react`** (zamiast Font Awesome). Ikon marek (GitHub, LinkedIn itp.) lucide nie ma
  → małe inline SVG w `src/components/icons/`
- Treść: typowane dane lokalne w `src/content/` (zamiast Notion API / `api.marchantweb.com`)

## Mapowanie Vue → React

| Vue / Nuxt | React / Next |
|---|---|
| `app.vue` + `layouts/default.vue` | `src/app/layout.tsx` + klientowy `SiteShell` |
| `<client-only><LazyHero/>` | `next/dynamic(..., { ssr: false })` |
| `ref` / `computed` / `watch` | `useState` / wartości wyliczane w renderze / `useEffect` tylko do synchronizacji z zewn. systemem |
| `@vueuse` (`useMouse`, `useWindowSize`, ...) | własne hooki w `src/hooks/` |
| `useState('x')` (Nuxt, globalny) | React context lub mały store (np. `portfolioScrollPercentage`) |
| `<Transition name="page" mode="out-in">` | własny system przejść: `TransitionLink` + provider (leave → `router.push` → enter), zachowując czasy/easingi per strona |
| `useHead` / `bodyAttrs` | `metadata` / `generateMetadata` + klasy `body` ustawiane per trasa w kliencie |
| `navigateTo` | `useRouter().push` przez provider przejść |
| `v-for` / `v-if` / sloty | `map` z `key` / warunki / `children` |
| `:deep()` | `:global()` w SCSS Modules |

## Zasady kodu

- Komponenty: function components, typowane `props`, brak `any`. Pliki `PascalCase.tsx` + `PascalCase.module.scss`.
- `"use client"` tylko tam, gdzie potrzebne (WebGL, kursor, slider, nawigacja zależna od myszy).
- **Wydajność:** pozycja myszy, scroll i wartości animowane co klatkę trzymamy w `useRef` i aplikujemy w
  `requestAnimationFrame` / `gsap.ticker` bezpośrednio do DOM/uniformów — NIE w `useState` (bez re-renderów co ruch myszy).
- Każdy efekt sprząta po sobie (listenery, `rAF`, tweeny GSAP, `Draggable`, `Observer`, kontekst WebGL).
- Wartości liczbowe animacji (czasy, `cubic-bezier`, opóźnienia, offsety, kolory shaderów) kopiujemy dokładnie z oryginału.
- Breakpointy jak w oryginale: 576 / 768 / 992 / 1200 / 1400 / 1680.
- Dostępność: semantyczny HTML, `alt`, `aria-label` na linkach-ikonach, respektować `prefers-reduced-motion` tam, gdzie nie psuje designu.

## Czego NIE przenosimy / co podmieniamy

- Imię, teksty, zdjęcia, projekty, logotypy klientów, linki (Calendly, Twitter, e-mail) autora → dane Mateusza.
- Badge Awwwards, ID Google Analytics (`G-E1LXB89D1E`), `api.marchantweb.com`, Cloudinary, logo „MW” → usunąć / zastąpić logo MK.
- Font N27 jest komercyjny — nie kopiować plików fontu bez potwierdzenia licencji; użyć zamiennika ustalonego z Mateuszem.

## Git

- Pracujemy wyłącznie na branchu `nextjs-rewrite`. Nie pushować bez zgody Mateusza.
- Commity małe, po każdym zakończonym etapie, w formacie Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `style:`).
- **ZAKAZ dopisków o AI** w commitach, PR-ach i kodzie: żadnych `Co-Authored-By: Claude`, „Generated with Claude Code”,
  „with Codex” itp. Autor commitów to wyłącznie Mateusz (z `git config`).
- Nie commitować sekretów, `.env*`, `node_modules`, `.next`.

## Weryfikacja (przed każdym commitem etapu)

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Wizualnie: porównanie zrzutów (Playwright) nowej strony z oryginałem dla tras `/`, `/explore`, `/about`,
`/contact`, `/portfolio/[slug]`, 404 — desktop 1440px i mobile 390px.

## Przekazanie pracy (np. do Codexa)

Stan prac prowadzimy w `HANDOFF.md`: co zrobione, co w toku, następne kroki, znane problemy.
Aktualizować przy każdym commicie etapu, tak aby inny agent mógł kontynuować bez kontekstu rozmowy.
