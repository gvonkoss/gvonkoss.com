const rootStyle = document.documentElement.style;

const changeColors = (root, color, outlineColor, textColor) => {
	root.setProperty('--color', color);
	root.setProperty('--outlineColor', outlineColor);
	root.setProperty('--textColor', textColor);
}

const randomize = () => {
	let hex = `#${Math.floor(Math.random() * 16777215).toString(16)}`; //16777215 is #ffffff
	return hex === '#ffffff' || hex.length !== 7 ? randomize() : hex;
};

const original = () => ({
	highlight: '#aeeedc',
	outline: '#21d19f',
	text: '#158666'
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
	if (e.target.className === 'text') {
		rootStyle.setProperty('--textColor', e.target.value);
	} else if (e.target.className === 'outline') {
		rootStyle.setProperty('--outlineColor', e.target.value);
	} else if (e.target.className === 'highlight') {
		rootStyle.setProperty('--color', e.target.value);
	} else if (e.target.className === 'reset') {
		set(original);
	} else if (e.target.className === 'random') {
		set(random);
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