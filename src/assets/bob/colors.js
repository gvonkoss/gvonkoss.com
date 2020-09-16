// import { inputs, get, set } from './main.js';

const root = document.documentElement.style;

const randomize = () => `#${Math.random().toString(16).slice(2, 8)}`;

const original = {
	highlight: '#d1fff3',
	outline: '#21d19f',
	text: '#0f624b'
};

const grayscale = {
	highlight: '#dcdcdc',
	outline: '#000000',
	text: '#000000'
};

const random = () => ({
	highlight: randomize(),
	outline: randomize(),
	text: randomize()
});


const fill = () => {	
	root.setProperty('--highlight', get('highlight'));
	root.setProperty('--outline', get('outline'));
	root.setProperty('--text', get('text'));
	root.setProperty('--background', get('background'))
	root.setProperty('--background-size', get('size'))
	// inputs[0].value = get('highlight');
	// inputs[1].value = get('outline');
	// inputs[2].value = get('text');
}

export const setOne = (property, value) => {
	if ((property === 'dotted' || property === 'striped' || property === 'none')) {
		value = `var(--${property})`;
		let size = property === 'striped' ? 'none' : '4px 4px';
		property = 'background';

		set('size', size);
		root.setProperty('--background-size', get('size'));
	}

	root.setProperty(`--${property}`, value);
	set(property, value)
}

const setAll = (color) => {
	set('highlight', color.highlight);
	set('outline', color.outline);
	set('text', color.text);

	if (color.highlight === original.highlight) {
		set('background', 'var(--dotted)');
		set('size', '4px 4px');
	}

	fill();
}

const setOriginal = () => setAll(original);
const setRandom = () => setAll(random());
const setGrayScale = () => setAll(grayscale);

export const colors = {
  fill,
  setOne,
  setOriginal,
  setRandom,
  setGrayScale
}