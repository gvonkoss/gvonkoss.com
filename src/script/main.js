const randomize = () => `#${Math.random().toString(16).slice(2, 8)}`;

const original = {
	highlight: '#aeeedc',
	outline: '#21d19f',
	text: '#158666'
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

const root = document.documentElement.style;

const set = (property, value) => { sessionStorage.setItem(property, value) };
const get = value => sessionStorage.getItem(value);

const fill = () => {	
	root.setProperty('--highlight', get('highlight'));
	root.setProperty('--outline', get('outline'));
	root.setProperty('--text', get('text'));

	inputs[0].value = get('highlight');
	inputs[1].value = get('outline');
	inputs[2].value = get('text');
}

const setOne = (property, value) => {
	root.setProperty(`--${property}`, value);
	set(property, value)
}

const setAll = (colors) => {
	set('highlight', colors.highlight);
	set('outline', colors.outline);
	set('text', colors.text);

	fill();
}

this.handleEvent = (e) => {
	if (e.target.id === 'highlight') {
		setOne('highlight', e.target.value);
	} else if (e.target.id === 'outline') {
		setOne('outline', e.target.value);
	} else if (e.target.id === 'text') {
		setOne('text', e.target.value);
	} else if (e.target.id === 'reset') {
		setAll(original)
	} else if (e.target.id === 'random') {
		setAll(random());
	} else if (e.target.id === 'grayscale') {
		setAll(grayscale);
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

(() => {
	sessionStorage.length === 0 ? setAll(original) : fill();

	let page = document.location.pathname.replace(/\//g, '');
	let link = document.querySelector(`a[href*="${page}"]`);

	link ? link.setAttribute('aria-current', true) : null;
})();