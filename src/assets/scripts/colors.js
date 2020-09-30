export default class Colors {
  constructor() {
    this.root = document.documentElement.style;
    this.inputs = Array.from(document.querySelectorAll('input'), input => {
      input.addEventListener('input', this);
      input.addEventListener('change', this);
      return input;
    })

    this.buttons = Array.from(document.querySelectorAll('button'), button => {
      button.addEventListener('click', this);
      button.addEventListener('keydown', this);
      return button;
    })

    this.original = {
      highlight: '#d1fff3',
      outline: '#21d19f',
      text: '#0f624b'
    }

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

  get (value) { 
    return sessionStorage.getItem(value)
  };

  set (property, value) { sessionStorage.setItem(property, value) };

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
    if ((property === 'dotted' || property === 'striped' || property === 'none')) {
      value = `var(--${property})`;
      let size = property === 'striped' ? 'none' : '4px 4px';
      property = 'background';
  
      this.set('size', size);
      this.root.setProperty('--background-size', this.get('size'));
    }
  
    this.root.setProperty(`--${property}`, value);
    this.set(property, value)
  }

  setAll = (colors) => {
    this.set('highlight', colors.highlight);
    this.set('outline', colors.outline);
    this.set('text', colors.text);
  
    if (colors.highlight === this.original.highlight) {
      this.set('background', 'var(--dotted)');
      this.set('size', '4px 4px');
    }
  
    this.fill();
  }

  handleEvent ({target}) {
    switch (target.id) {
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
        this.setOne(target.id, target.value);
    }
  }
}