module.exports = {
  content: [
    // Skanuje pliki .html w katalogu głównym i we wszystkich podkatalogach
    './index.html',
    './JS/**/*.js',
  ],

  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'scroll-down': {
          '0%': { opacity: '0' },
          '30%,60%': { opacity: '1' },
          '100%': { opacity: '0', top: '90%' },
        },
        autoRun: {
          // Stan początkowy (0% animacji)
          from: {
            // Wartość "100%" jest poprawna
            left: '100%',
          },
          // Stan końcowy (100% animacji)
          to: {
            // Całą funkcję calc() musisz podać jako string
            left: 'calc(var(--width) * -1)',
          },
        },
      },
      animation: {
        'scroll-down': 'scroll-down 3s ease-in-out infinite',
        'auto-run': 'autoRun 10s linear infinite',
      },
      colors: {
        pearl: '#E6D7C8',
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
        cl: ['0 0 4px rgba(0, 150, 136, 0.8)', '0 0 8px rgba(0, 150, 136, 0.4)'],
      },
      boxShadow: {
        gorange: '0 0 0 3px rgba(255,140,50,0.35), 0 0 30px rgba(255,140,50,0.45)',
        gcyan: '0 0 0 3px rgba(0,255,245,0.35), 0 0 30px rgba(0,255,245,0.45)',
        scrol: ' 0 0 10px rgba(255,255,255,0.5)',
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
