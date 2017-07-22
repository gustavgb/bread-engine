class Module {
  constructor() {
    this.running = false;
    this.moduleId = '';
    this.engine = {};
  }
  
  start() {
    this.running = true;
  }
  
  stop() {
    this.running = false;
  }
  
  update() {
    // Do things
  }
}

module.exports = Module;