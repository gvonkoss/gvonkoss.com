import { SessionStorage } from './session.js';

export class BackgroundControls extends SessionStorage {
  constructor(root) {
    super();
    this.root = root;
    this.buttons = Array.from(document.querySelectorAll('.controls .background'), button => {
      button.addEventListener('click', this);
      button.addEventListener('keydown', this);
    })
  }

  handleEvent ({ target: { id } }) {
    const value = `var(--${id})`;

    this.root.setProperty(`--background`, value);
    this.set('background', value)
  }
}