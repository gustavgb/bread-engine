class KeyHandler {
  constructor(keyDownHandler, keyUpHandler) {
    this.keys = {};

    if (typeof keyDownHandler === 'function') {
      this.keyDownHandler = keyDownHandler;
    }
    if (typeof keyUpHandler === 'function') {
      this.keyUpHandler = keyUpHandler;
    }

    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.initiateKeyEvents();
  }

  keyDown(e) {
    if (!(e.keyCode in this.keys)) {
      this.keys[e.keyCode] = true;

      this.keyDownHandler();
    }
  }

  keyUp(e) {
    if (e.keyCode in this.keys) {
      delete this.keys[e.keyCode];

      this.keyUpHandler();
    }
  }

  initiateKeyEvents() {
    if (!this.eventsDone) {
      this.eventsDone = true;
      window.addEventListener('keydown', this.keyDown, false);
      window.addEventListener('keyup', this.keyUp, false);
    }
  }

  removeKeyEvents() {
    if (this.eventsDone) {
      window.removeEventListener('keydown', this.keyDown, false);
      window.removeEventListener('keyup', this.keyUp, false);
      this.eventsDone = false;
    }
  }

  keyDownHandler() {

  }

  keyUpHandler() {

  }
}

const instanceKeyHandler = new KeyHandler();

module.exports = instanceKeyHandler;
