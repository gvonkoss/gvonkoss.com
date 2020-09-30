import {
  ColorControls,
  BackgroundControls
} from './index.js';

export class EggController {
  constructor () {
    this.root = document.documentElement.style;
    this.original = {
      highlight: '#d1fff3',
      outline: '#21d19f',
      text: '#0f624b',
      background: 'var(--dotted)'
    }

    this.halloween = {
      highlight: '#ffb75c',
      outline: '#ef9939',
      text: '#000000',
      background: 'var(--pumpkin-background)'
    }

    this.palette = this.original;

    this.months = {
      9: {
        colors: this.halloween,
        egg: 'halloween'
      }
    }
  }

  triggerEgg (month) {
    this.palette = month.colors;
    document.documentElement.classList.add(`${month.egg}-egg`);
  }

  setUp () {
    const month = new Date().getMonth();

    if (this.months[month]) {
      this.triggerEgg(this.months[month]);
    }

    new BackgroundControls(this.root);
    return new ColorControls(this.root, this.palette)
  }
}