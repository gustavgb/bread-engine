const Component = require('components/component');
const render = require('core/render');

class WorldObject {
  constructor(displayObj, updateFunction) {
    if (typeof updateFunction === 'function') {
      this.update = updateFunction;
    }

    if (displayObj instanceof render.Texture) {
      this.displayObj = new render.Sprite(displayObj);
    } else if (displayObj instanceof render.DisplayObject) {
      this.displayObj = displayObj;
    } else {
      console.error('WorldObject instantiated with invalid parameters');
    }
  }

  applyComponent(component) {
    if (component instanceof Component) {
      component.runner(this);
    }
    return this;
  }

  update() {

  }

  get x() {
    return this.displayObj.position.x;
  }

  get y() {
    return this.displayObj.position.y;
  }

  set x(val) {
    this.displayObj.position.x = val;
  }

  set y(val) {
    this.displayObj.position.y = val;
  }

  get width() {
    return this.displayObj.width;
  }

  get height() {
    return this.displayObj.height;
  }
}

module.exports = WorldObject;
