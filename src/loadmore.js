export default class LoadMoreButton {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();

    //  hidden && this.hide() - можно записать и через if
    // if (hidden) {
    //   this.hide();
    // }
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
