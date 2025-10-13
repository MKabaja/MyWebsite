// inicjalizacja
const root = document.getElementById('header');
const logo = root?.querySelector('#header-logo');
const nav = root?.querySelector('#header-nav');
const hamburgerBtn = root?.querySelector('#header-hamburger');
const overlay = document.getElementById('site-overlay');

export function initHeader() {
  setupHamburger();
  setupDarkMode();
}

// funkcja pomocnicza do sprawdzenia breakpointu mediaquerry
function isScreenBelowMd() {
  const mdBrekPoint = '(max-width: 767px)'; //domyslne tailwindowe
  const mediaQuery = window.matchMedia(mdBrekPoint);
  return mediaQuery.matches;
}
// metoda nakładajaca listener na hamburger menu
function setupHamburger() {
  if (isScreenBelowMd) {
    hamburgerBtn.addEventListener('click', handleOpenNav);
  } else {
    hamburgerBtn.removeEventListener('click', handleOpenNav);
    nav.classList.remove('offmenu-closed');
  }
}
function handleOpenNav() {
  const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' || false;
  hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
  if (!isExpanded) {
    nav.classList.remove('offmenu-closed');
    nav.classList.add('offmenu-open');
    overlay.classList.add('overlay-open');
    overlay.addEventListener('click', handleCloseNav, { once: true });
  } else {
    handleCloseNav();
  }
}

function setupDarkMode() {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  logo.addEventListener('click', toggleMode);
}

function toggleMode() {
  //toggle icon

  //  jesli jest w local storage
  if (localStorage.getItem('color-theme')) {
    // jesli jasne, zmien na ciemny i dodaj do localstorage
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  } else {
    // jesli nie ma w local Storage
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }
}
function handleCloseNav() {
  nav.classList.remove('offmenu-open');
  nav.classList.add('offmenu-closed');
  overlay.classList.remove('overlay-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}
