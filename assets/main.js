let rootStyle = document.documentElement.style;

const changeColors = (root, color, outlineColor, textColor) => {
  root.setProperty('--color', color);
  root.setProperty('--outlineColor', outlineColor);
  root.setProperty('--textColor', textColor);
}
let text = document.querySelector('input.text')
let outline = document.querySelector('input.outline')
let highlight = document.querySelector('input.highlight')

let inputs = document.querySelectorAll('input');
inputs.forEach(input => input.addEventListener('input', this));
inputs.forEach(input => input.addEventListener('change', this));

handleEvent = (e) => {
  if (e.target.className === 'text') {
    rootStyle.setProperty('--textColor', e.target.value)
  } else if (e.target.className === 'outline') {
    rootStyle.setProperty('--outlineColor', e.target.value)
  } else if (e.target.className === 'highlight') {
    rootStyle.setProperty('--color', e.target.value)
  }
}

let buttons = document.querySelectorAll('button');
const randomize = () => {
  let hex = '#'+Math.floor(Math.random()*16777215).toString(16);
  console.log(hex);
  return hex === '#ffffff' || hex.length !== 7 ? randomize() : hex;
};

buttons.forEach(button => button.addEventListener('click', e => {
  let rootStyle = document.documentElement.style;
  if (e.target.className === 'reset') {
    changeColors(rootStyle, '#aeeedc', '#21d19f', '#158666');
    text.value = '#158666';
    outline.value = '#21d19f'
    highlight.value = '#aeeedc'
  } else if (e.target.className === 'random') {
    let one = randomize();
    let two = randomize();
    let three = randomize();
    changeColors(rootStyle, one, two, three);
    text.value = one;
    outline.value = two;
    highlight.value = three;
  }
}))