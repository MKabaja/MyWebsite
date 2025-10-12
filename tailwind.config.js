module.exports = {
  content: [
    // Skanuje pliki .html w katalogu głównym i we wszystkich podkatalogach
    './*.html',
    './**/*.html',

    // Skanuje pliki .js tylko w Twoich katalogach źródłowych (SRC i JS)
    // Dzięki temu nie skanujemy katalogu node_modules
    './src/**/*.js',
    './js/**/*.js',
  ],

  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D', // główne tło
        graphite: {
          DEFAULT: '#1C1C1C', // karty / sekcje
          2: '#262626', // delikatne odcięcie
        },
        // Akcent 1 — Neon Orange
        accent: {
          DEFAULT: '#FF8C32', // Twój główny neon
          soft: '#FFA86A', // jaśniejszy (hover/gradients)
          strong: '#FF6B00', // bardziej „cyber” (active/focus)
        },
        // Akcent 2 — Electric Cyan
        cyber: {
          DEFAULT: '#00FFF5',
          soft: '#7CFFF7',
          strong: '#00D4CC',
        },
      },
      fontFamily: {
        sans: [
          'Rajdhani',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Rajdhani',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
      },
      // Neonowe efekty świecenia
      dropShadow: {
        neon: ['0 0 8px rgba(255,140,50,0.6)', '0 0 16px rgba(255,140,50,0.4)'],
        cyan: ['0 0 8px rgba(0,255,245,0.6)', '0 0 16px rgba(0,255,245,0.4)'],
      },
      boxShadow: {
        'glow-orange': '0 0 0 3px rgba(255,140,50,0.35), 0 0 30px rgba(255,140,50,0.45)',
        'glow-cyan': '0 0 0 3px rgba(0,255,245,0.35), 0 0 30px rgba(0,255,245,0.45)',
      },
      backgroundImage: (theme) => ({
        'logo-dark-mode': "url('../images/logo-dark-mode.svg')",
        'logo-light-mode': "url('../images/logo-light-mode.svg')",
        'curvy-dark-mode': "url('../images/bg-curvy-dark-mode.svg')",
        'curvy-light-mode': "url('../images/bg-curvy-light-mode.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ['dark'],
    },
  },
  plugins: [],
};
