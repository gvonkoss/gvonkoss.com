import './egg.js';
import ColorControls from './colors.js';

const controls = new ColorControls();

(() => {
  sessionStorage.length === 0 ? setAll(original) : controls.fill();

  const page = document.location.pathname.match(/[^/]{5,}/);

  if (page) {
    let link = document.querySelector(`a[href*="${page[0]}"]`);

    link ? link.setAttribute('aria-current', 'location') : null;
  }
})();
