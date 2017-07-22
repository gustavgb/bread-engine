const render = require('core/render');
const IdCounter = require('utils/id');

class Engine {
  constructor(renderer) {
    if (renderer) {
      this.modules = [];

      this.running = false;

      this.renderer = renderer;

      this.stage = new render.Container();

      this.displayObjs = {};

      this.moduleIds = new IdCounter('moduleId');
    } else {
      console.error('Engine must be supplied a renderer');
    }
  }

  addDisplayObject(child) {
    if (child instanceof render.DisplayObject) {
      this.stage.addChild(child);

      return child;
    } else {
      console.error('Engine.addDisplayObject recieved invalid parameters');
    }
  }

  removeDisplayObject(child) {
    if (child instanceof render.DisplayObject) {
      this.stage.removeChild(child);

      return child;
    } else {
      console.error('Engine.removeDisplayObject recieved invalid parameters');
    }
  }

  addModule(module) {
    const name = 'moduleId' + this.idCounter;
    this.idCounter++;

    module.moduleId = name;
    module.engine = this;
    module.start();

    if (module.stage instanceof render.Container) {
      this.stage.addChild(module.stage);
    }

    this.modules.push(module);
  }

  removeModule(module) {
    if (module.stage instanceof render.Container) {
      this.stage.removeChild(module.stage);
    }

    module.stop();
    module.engine = null;

    this.modules = this.modules.filter((m) => m.moduleId !== module.moduleId);
  }

  start() {
    this.running = true;
    this.run();
  }

  render() {
    this.renderer.render(this.stage);
  }

  run() {
    if (this.running) {
      requestAnimationFrame(this.run.bind(this));

      this.modules.forEach(module => {
        if (module.running) {
          module.update();
        }
      });

      this.render();
    }
  }

  stop() {
    this.running = false;
  }
}

module.exports = Engine;
