const Module = require('core/module');
const WorldObject = require('world/worldobject');
const render = require('core/render');
const IdCounter = require('utils/id');

class World extends Module {
  constructor() {
    super();

    this.objects = [];
    this.terrains = [];

    this.stage = new render.Container();

    this.idCounter = new IdCounter('objectId');
  }

  addObject(object) {
    if (object instanceof WorldObject) {
      const name = this.idCounter.next();

      object.objectId = name;

      if (object.displayObj instanceof render.Sprite || object.displayObj instanceof render.Graphics || object.displayObj instanceof render.Container) {
        this.stage.addChild(object.displayObj);
      }

      this.objects.push(object);
    } else {
      console.error('object must be instanceof WorldObject');
    }
  }

  removeObject(object) {
    if (object.displayObj instanceof render.Sprite || object.displayObj instanceof render.Graphics || object.displayObj instanceof render.Container) {
      this.stage.removeChild(object.displayObj);
    }

    this.objects = this.objects.filter((m) => m.objectId !== object.objectId);
  }

  update() {
    this.objects.forEach(obj => {
      obj.update.call(obj);
    });
  }
}

module.exports = World;
