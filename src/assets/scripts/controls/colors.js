import { SessionStorage } from './session.js';

export class ColorControls extends SessionStorage {
  constructor(root, original) {
    super();
    this.root = root
    this.inputs = Array.from(document.querySelectorAll('input'), input => {
      input.addEventListener('input', this);
      input.addEventListener('change', this);
      return input;
    })

    this.buttons = Array.from(document.querySelectorAll('.controls .color'), button => {
      button.addEventListener('click', this);
      button.addEventListener('keydown', this);
    })

    this.original = original;

    this.grayscale = {
      highlight: '#dcdcdc',
      outline: '#000000',
      text: '#000000'
    }

    this.random = () => ({
      highlight: this.randomize(),
      outline: this.randomize(),
      text: this.randomize()
    })
  }

  randomize () {
    return `#${Math.random().toString(16).slice(2, 8)}`;
  }

  fill () {
    this.root.setProperty('--highlight', this.get('highlight'));
    this.root.setProperty('--outline', this.get('outline'));
    this.root.setProperty('--text', this.get('text'));
    this.root.setProperty('--background', this.get('background'))
    this.root.setProperty('--background-size', this.get('size'))
    this.inputs[0].value = this.get('highlight');
    this.inputs[1].value = this.get('outline');
    this.inputs[2].value = this.get('text');
  }

  setOne = (property, value) => {
    this.root.setProperty(`--${property}`, value);
    this.set(property, value)
  }

  setAll = (colors = this.original) => {
    this.set('highlight', colors.highlight);
    this.set('outline', colors.outline);
    this.set('text', colors.text);
  
    if (colors.highlight === this.original.highlight) {
      this.set('background', this.original.background);
      this.set('size', '4px 4px');
    }
  
    this.fill();
  }

  handleEvent (e) {
    if (e.key && (e.key !== 'Enter' || e.key !== '')) return;
  
    switch (e.target.id) {
      case 'reset':
        this.setAll(this.original);
        break;
      case 'random':
        this.setAll(this.random());
        break;
      case 'grayscale':
        this.setAll(this.grayscale)
        break;
      default:
        this.setOne(e.target.id, e.target.value);
    }
  }
}