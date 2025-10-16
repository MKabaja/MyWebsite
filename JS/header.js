// inicjalizacja
const root = document.getElementById('header');
const logo = root?.querySelector('#header-logo');
const nav = root?.querySelector('#header-nav');
const hamburgerBtn = root?.querySelector('#header-hamburger');
const overlay = document.getElementById('site-overlay');

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

function handleCloseNav() {
  nav.classList.remove('offmenu-open');
  nav.classList.add('offmenu-closed');
  overlay.classList.remove('overlay-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}
