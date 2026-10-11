# Mateusz Kabaja — Portfolio

Osobiste portfolio (wizytówka + projekty) w Next.js, React i TypeScript, z tłem WebGL płynnie przechodzącym między podstronami.

Design i animacje oparte na otwartoźródłowym projekcie [Marchant Web '24](https://github.com/marchantweb/Marchant-Web) (Simon Le Marchant), przepisanym z Nuxt/Vue na Next.js/React, z własną treścią, kolorystyką i fontami.

## Stack

- Next.js (App Router) · React · TypeScript
- Tailwind CSS v4 + CSS Modules (animacje)
- GSAP (Draggable, Inertia, Observer) · WebGL (własny shader) · AOS
- next-intl (PL / EN) · EmailJS (formularz kontaktowy) · lucide-react

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produkcyjny (output: standalone)
npm run start
```

## Konfiguracja

| Zmienna | Opis |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Publiczny adres strony (canonical, sitemap, hreflang), np. `https://mojadomena.pl` |

Dane kontaktowe i klucze EmailJS: `src/lib/site.ts`. Projekty: `src/content/projects.ts`. Teksty: `messages/pl.json`, `messages/en.json`.
