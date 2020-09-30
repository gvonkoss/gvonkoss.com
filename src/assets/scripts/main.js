import './egg.js';
import { 
  ColorControls,
  BackgroundControls
} from './controls/index.js';

const root = document.documentElement.style;
new BackgroundControls(root);
const colors = new ColorControls(root);

(() => {
  sessionStorage.length === 0 ? colors.setAll(original) : colors.fill();

  const page = document.location.pathname.match(/[^/]{5,}/);

  if (page) {
    let link = document.querySelector(`a[href*="${page[0]}"]`);

    link ? link.setAttribute('aria-current', 'location') : null;
  }
})();
