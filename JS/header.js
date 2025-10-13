// inicjalizacja
const root = document.getElementById('header');
const logo = root?.querySelector('#header-logo');
const nav = root?.querySelector('#header-nav');
const hamburgerBtn = root?.querySelector('#header-hamburger');

export function initHeader() {
  setupHamburger();
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
  }
}
function handleOpenNav() {
  const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true' || false;
  hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
  nav.classList.toggle('hidden');
}
