import { colors } from './colors.js';

export const set = (property, value) => { sessionStorage.setItem(property, value) };
export const get = value => sessionStorage.getItem(value);

this.handleEvent = (e) => {
  const {id, value} = e.target
  switch (id) {
    case 'font-increase':
      fontSize.increase();
      break;
    case 'font-decrease':
      fontSize.decrease();
      break;
    case 'reset':
      colors.setOriginal();
      fontSizes.reset();
      break;
    case 'random':
      colors.setRandom();
      break;
    case 'grayscale':
      colors.setGrayScale();
      break;
    default:
      colors.setOne(id, value);
  }
}

export const inputs = Array.from(document.querySelectorAll('input'), input => {
	input.addEventListener('input', this);
	input.addEventListener('change', this);
	return input;
});

const buttons = Array.from(document.querySelectorAll('button'), button => {
	button.addEventListener('click', this);
});

(() => {
	sessionStorage.length === 0 ? setAllColors(original) : fillColors();

	let page = document.location.pathname.replace(/\//g, '');
	let link = document.querySelector(`a[href*="${page}"]`);

	link ? link.setAttribute('aria-current', true) : null;
})();
