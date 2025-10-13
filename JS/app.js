import { initHeader } from './header.js';

window.addEventListener('DOMContentLoaded', () => {
  // odpal tylko jeśli na stronie jest <header>
  if (document.querySelector('header')) {
    initHeader();
  }
});
