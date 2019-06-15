const rootStyle = document.documentElement.style;

const changeColors = (root, color, outlineColor, textColor) => {
	root.setProperty('--color', color);
	root.setProperty('--outlineColor', outlineColor);
	root.setProperty('--textColor', textColor);
}

const randomize = () => `#${Math.random().toString(16).slice(2, 8)}`;

const original = () => ({
	highlight: '#aeeedc',
	outline: '#21d19f',
	text: '#158666'
});

const grayscale = () => ({
	highlight: '#dcdcdc',
	outline: '#000000',
	text: '#000000'
});

const random = () => ({
	highlight: randomize(),
	outline: randomize(),
	text: randomize()
});

const set = (newColors) => {
	let colors = newColors();
	changeColors(rootStyle, colors.highlight, colors.outline, colors.text);
	inputs[0].value = colors.highlight;
	inputs[1].value = colors.outline;
	inputs[2].value = colors.text;
}

this.handleEvent = (e) => {
	if (e.target.id === 'text') {
		rootStyle.setProperty('--textColor', e.target.value);
	} else if (e.target.id === 'outline') {
		rootStyle.setProperty('--outlineColor', e.target.value);
	} else if (e.target.id === 'highlight') {
		rootStyle.setProperty('--color', e.target.value);
	} else if (e.target.id === 'reset') {
		set(original);
	} else if (e.target.id === 'random') {
		set(random);
	} else if (e.target.id === 'grayscale') {
		set(grayscale);
	}
}

const inputs = Array.from(document.querySelectorAll('input'), input => {
	input.addEventListener('input', this);
	input.addEventListener('change', this);
	return input;
});

const buttons = Array.from(document.querySelectorAll('button'), button => {
	button.addEventListener('click', this);
});

window.addEventListener('onunload', set(original));

(() => {
	let page = document.location.pathname.replace(/\//g, '');
	let link = document.querySelector(`a[href*="${page}"]`);

	link ? link.setAttribute('aria-current', true) : null;
})();