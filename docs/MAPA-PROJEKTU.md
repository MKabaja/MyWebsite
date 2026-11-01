# 🗺️ Mapa projektu

> Ściąga: **co chcesz zmienić → który plik otworzyć.**
> Wszystkie ścieżki liczone od `src/`, chyba że zaczynają się od `messages/` albo `public/`.

---

## 1. Strona główna od góry do dołu

```
┌──────────────────────────────┐
│  HERO        zdjęcie, nagłówek, terminal     →  features/home/components/hero-section/
├──────────────────────────────┤
│  O MNIE      karta React, tekst, logotypy    →  features/home/components/about-section/
├──────────────────────────────┤
│  ZATRUDNIJ   stack, umiejętności, osiągn.    →  features/home/components/hire-section/
├──────────────────────────────┤
│  PORTFOLIO   „PORTFOLIO ×” + karuzela 3D     →  features/projects/components/portfolio-section/
├──────────────────────────────┤
│  PROJEKTY    kafelki z linkami               →  features/projects/components/projects-section/
├──────────────────────────────┤
│  KONTAKT     formularz, dane, stopka         →  features/contact/components/contact-section/
└──────────────────────────────┘
   Kolejność sekcji: features/home/components/home-page/home-page.tsx
```

Podstrony:

| Strona | Plik |
|---|---|
| `/portfolio/powertask` itd. | `features/projects/components/project-view/` |
| 404 | `features/not-found/components/not-found-view/` |

---

## 2. Najczęstsze zmiany

### ✏️ Teksty
- **Każdy napis na stronie** → `messages/pl.json` i `messages/en.json`. Zawsze zmieniaj **oba**.
- Klucze odpowiadają sekcjom: `home.hero`, `home.about`, `home.hire`, `home.portfolio`, `home.projects`, `contact`, `notFound`.

### 📁 Projekty
**Plik:** `features/projects/model/projects.constants.ts` (jedna lista dla karuzeli, kafelków i podstron).

| Pole | Do czego służy |
|---|---|
| `slug` | końcówka adresu: `/portfolio/<slug>` |
| `title`, `type`, `lead` | tytuł, typ, krótki opis (`pl` + `en`) |
| `stack` | technologie (chipy) |
| `video` | film w karuzeli, plik w `public/video/` |
| `links.live`, `links.repo` | przyciski „demo” i „kod” |
| `content` | treść podstrony: `heading`, `paragraph`, `image` |
| `isPlaceholder: true` | okładka „wkrótce” zamiast filmu |

### 👤 Dane osobowe
- **E-mail, telefon, sociale, klucze EmailJS** → `shared/lib/site.ts`
- **Zdjęcie** → `public/images/headshot.png` (podmień plik, ta sama nazwa)
- **Logo** → `shared/components/logo/`

### 🧰 Stack (ikony technologii)
- **Lista technologii** → `shared/lib/tech-stack.ts`
- **Ikony** pochodzą z `simple-icons`, importowane na górze tego pliku.

---

## 3. Wygląd

| Co | Gdzie | Wskazówka |
|---|---|---|
| Kolory, fonty | `styles/theme.css` | blok `@theme`, np. `--color-accent` |
| Kolory tła WebGL | `features/site-shell/components/shader-background/shader-background.program.ts` | obiekt `palette` |
| Ziarno / miękkość pasów tła | `features/site-shell/components/shader-background/shader-background.program.ts` | `GRAIN_STRENGTH`, `BAND_EDGE` |
| Gradient pod terminalem | `features/home/model/home.constants.ts` | |
| Komendy w terminalu | `features/home/components/hero-terminal/hero-terminal.constants.ts` | `TERMINAL_SESSION`, tempo: `TYPE_DELAY_MILLISECONDS` |
| Wygląd kart karuzeli | `features/projects/components/portfolio-card/portfolio-card.module.css` | |
| Wygląd kafelków projektów | `features/projects/components/project-tile/project-tile.styles.ts` | klasy Tailwind |
| Formularz | `features/contact/components/contact-form/contact-form.module.css` | |
| Kursor, preloader, „+” w rogach | `features/site-shell/components/` | `Cursor`, `Preloader`, `CornerMarks` |

**Klocki, z których zbudowane są sekcje** (`shared/components/`):
- `Tile` – kafelek: `solid` (pełny), `window` (prześwituje tło), `grain` (szary), `accent` (cyjan)
- `Scribble` – odręczny podpis ze strzałką
- `Marquee` – przewijany pasek tekstu

---

## 4. Animacje i scroll

| Efekt | Plik | Pokrętło |
|---|---|---|
| Płynny scroll (desktop) | `features/site-shell/components/smooth-scroll/smooth-scroll.tsx` | `smooth: 2` |
| Opóźnienie zjazdu do `#contact` | `features/site-shell/components/smooth-scroll/smooth-scroll.anchors.ts` | `ARRIVAL_DELAY_MILLISECONDS` |
| Rozszerzanie siatki (desktop) | `features/home/components/home-page/use-grid-widening.ts` | `DESKTOP_START_WIDTH_PIXELS` |
| Rozszerzanie hero (mobile) | `features/home/components/home-page/use-grid-widening.ts` | `MOBILE_START_SCALE` |
| Efekty scrolla (mobile) | `features/site-shell/components/smooth-scroll/smooth-scroll.mobile-effects.ts` | `SCRUB_IN_SECONDS` (opóźnienie) |
| Karuzela: tempo / pauza | `features/projects/components/portfolio-carousel/use-portfolio-carousel.ts` | `AMBIENT_DRIFT_PIXELS_PER_FRAME`, `NARROW_DRIFT_RESUME_DELAY_IN_SECONDS` |
| Pochylenie kart projektów | `features/projects/components/project-tile/use-project-tilt.ts` | `MAX_TILT_IN_DEGREES`, `MAX_SCROLL_TILT_IN_DEGREES` |
| Czułość na przechylenie telefonu | `features/projects/utils/device-tilt.ts` | `FULL_TILT_IN_DEGREES` |
| Przejścia między stronami | `shared/components/page-transition/page-transition.constants.ts` | `PAGE_LEAVE_MILLISECONDS`, `pageFrameStyle` |

**Atrybuty, które możesz dopisać do elementu w JSX:**

| Atrybut | Efekt |
|---|---|
| `data-speed="clamp(1.1)"` | parallax: >1 szybciej, <1 wolniej (desktop i mobile) |
| `data-fade` | element pojawia się przy wjeździe na ekran |
| `data-m-speed="0.05"` | parallax tylko na mobile |

---

## 5. Inne

| Co | Gdzie |
|---|---|
| Tytuł i opis w Google (SEO) | `shared/lib/seo.ts` + `meta` w `messages/*.json` |
| Walidacja formularza | `features/contact/utils/validate-contact-field.ts` |
| Języki (PL/EN) | `i18n/routing.ts` |
| Adres domeny | zmienna `NEXT_PUBLIC_SITE_URL` |

---

## 6. Komendy

```bash
npm run dev      # podgląd → http://localhost:3000  (EN: /en)
npm run lint:fix # Biome: lint, format, importy
npm run typecheck
npm run build    # test wersji produkcyjnej
```

> ⚠️ **Mobile vs desktop:** klasy z `max-lg:` działają tylko na telefonie i tablecie (< 992 px),
> a klasy z `lg:` tylko na komputerze. Zmieniając jedno, nie ruszysz drugiego.
