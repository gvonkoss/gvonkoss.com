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

  handleEvent (e) {
    if (e.key && (e.key !== 'Enter' || e.key !== '')) return;

    const value = `var(--${e.target.id})`;

    this.root.setProperty(`--background`, value);
    this.set('background', value)
  }
}