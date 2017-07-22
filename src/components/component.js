class Component {
  constructor(runner) {
    if (typeof runner === 'function') {
      this.runner = runner;

      this.componentId = '';
    }
  }

  runner(state) {
    return state;
  }
}

module.exports = Component;
