# 🗺️ Mapa projektu

> Ściąga: **co chcesz zmienić → który plik otworzyć.**
> Wszystkie ścieżki liczone od `src/`, chyba że zaczynają się od `messages/` albo `public/`.

---

## 1. Strona główna od góry do dołu

```
┌──────────────────────────────┐
│  HERO        zdjęcie, nagłówek, terminal     →  components/home/HeroSection.tsx
├──────────────────────────────┤
│  O MNIE      karta React, tekst, logotypy    →  components/home/AboutSection.tsx
├──────────────────────────────┤
│  ZATRUDNIJ   stack, umiejętności, osiągn.    →  components/home/HireSection.tsx
├──────────────────────────────┤
│  PORTFOLIO   „PORTFOLIO ×” + karuzela 3D     →  components/home/PortfolioSection.tsx
├──────────────────────────────┤
│  PROJEKTY    kafelki z linkami               →  components/home/ProjectsSection.tsx
├──────────────────────────────┤
│  KONTAKT     formularz, dane, stopka         →  components/home/ContactSection.tsx
└──────────────────────────────┘
   Kolejność sekcji: components/home/HomePage.tsx
```

Podstrony:

| Strona | Plik |
|---|---|
| `/portfolio/powertask` itd. | `components/portfolio/ProjectView.tsx` |
| 404 | `components/not-found/NotFoundView.tsx` |

---

## 2. Najczęstsze zmiany

### ✏️ Teksty
- **Każdy napis na stronie** → `messages/pl.json` i `messages/en.json`. Zawsze zmieniaj **oba**.
- Klucze odpowiadają sekcjom: `home.hero`, `home.about`, `home.hire`, `home.portfolio`, `home.projects`, `contact`, `notFound`.

### 📁 Projekty
**Plik:** `content/projects.ts` (jedna lista dla karuzeli, kafelków i podstron).

| Pole | Do czego służy |
|---|---|
| `slug` | końcówka adresu: `/portfolio/<slug>` |
| `title`, `type`, `lead` | tytuł, typ, krótki opis (`pl` + `en`) |
| `stack` | technologie (chipy) |
| `video` | film w karuzeli, plik w `public/video/` |
| `links.live`, `links.repo` | przyciski „demo” i „kod” |
| `content` | treść podstrony: `heading`, `paragraph`, `image` |
| `placeholder: true` | okładka „wkrótce” zamiast filmu |

### 👤 Dane osobowe
- **E-mail, telefon, sociale, klucze EmailJS** → `lib/site.ts`
- **Zdjęcie** → `public/images/headshot.png` (podmień plik, ta sama nazwa)
- **Logo** → `components/ui/Logo.tsx`

### 🧰 Stack (ikony technologii)
- **Lista technologii** → `content/stack.ts`
- **Ikony** pochodzą z `simple-icons`, importowane na górze tego pliku.

---

## 3. Wygląd

| Co | Gdzie | Wskazówka |
|---|---|---|
| Kolory, fonty | `app/globals.css` | blok `@theme`, np. `--color-accent` |
| Kolory tła WebGL | `components/background/shader.ts` | obiekt `palette` |
| Ziarno / miękkość pasów tła | `components/background/shader.ts` | `GRAIN_STRENGTH`, `BAND_EDGE` |
| Gradient pod terminalem | `components/home/hero/gradient.ts` | |
| Komendy w terminalu | `components/home/hero/HeroTerminal.tsx` | `SESSION`, tempo: `TYPE_MS` |
| Wygląd kart karuzeli | `components/home/portfolio/ProjectCard.module.css` | |
| Wygląd kafelków projektów | `components/home/projects/ProjectCard.tsx` | klasy Tailwind |
| Formularz | `components/contact/ContactForm.module.css` | |
| Kursor, preloader, „+” w rogach | `components/shell/` | `Cursor`, `Preloader`, `CornerMarks` |

**Klocki, z których zbudowane są sekcje** (`components/grid/`):
- `Tile` – kafelek: `solid` (pełny), `window` (prześwituje tło), `grain` (szary), `accent` (cyjan)
- `Scribble` – odręczny podpis ze strzałką
- `Marquee` – przewijany pasek tekstu

---

## 4. Animacje i scroll

| Efekt | Plik | Pokrętło |
|---|---|---|
| Płynny scroll (desktop) | `components/smooth/SmoothScroll.tsx` | `smooth: 2` |
| Opóźnienie zjazdu do `#contact` | `components/smooth/SmoothScroll.tsx` | `ANCHOR_DELAY` (ms) |
| Rozszerzanie siatki (desktop) | `components/home/HomePage.tsx` | `START_WIDTH` |
| Rozszerzanie hero (mobile) | `components/home/HomePage.tsx` | `MOBILE_START_SCALE` |
| Efekty scrolla (mobile) | `components/smooth/mobileEffects.ts` | `SCRUB` (opóźnienie) |
| Karuzela: tempo / pauza | `components/home/portfolio/PortfolioCarousel.tsx` | `AMBIENT_SPEED`, `RESUME_DELAY` |
| Pochylenie kart projektów | `components/home/projects/ProjectCard.tsx` | `MAX_TILT`, `SCROLL_TILT` |
| Czułość na przechylenie telefonu | `lib/deviceTilt.ts` | `RANGE` |
| Przejścia między stronami | `lib/routes.ts` | czasy w `pageTimings` |

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
| Tytuł i opis w Google (SEO) | `lib/seo.ts` + `meta` w `messages/*.json` |
| Walidacja formularza | `lib/validation.ts` |
| Języki (PL/EN) | `i18n/routing.ts` |
| Adres domeny | zmienna `NEXT_PUBLIC_SITE_URL` |

---

## 6. Komendy

```bash
npm run dev      # podgląd → http://localhost:3000  (EN: /en)
npm run lint     # sprawdzenie kodu
npm run build    # test wersji produkcyjnej
```

> ⚠️ **Mobile vs desktop:** klasy z `max-lg:` działają tylko na telefonie i tablecie (< 992 px),
> a klasy z `lg:` tylko na komputerze. Zmieniając jedno, nie ruszysz drugiego.
