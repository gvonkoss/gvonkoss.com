import {
  EggController
} from './controls/index.js';

const controller = new EggController();

const colors = controller.setUp();
(() => {
  sessionStorage.length === 0 ? colors.setAll() : colors.fill();

  const page = document.location.pathname.match(/[^/]{5,}/);

  if (page) {
    let link = document.querySelector(`a[href*="${page[0]}"]`);

    link ? link.setAttribute('aria-current', 'location') : null;
  }
})();
