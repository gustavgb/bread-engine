const WorldObject = require('world/worldobject');
const Gravity = require('components/gravity');
const Movement = require('components/movement');
const CollideObject = require('collision/collideobject');
const Vector = require('core/vec');
const Path = require('core/path');

class Entity extends WorldObject {
  constructor(texture, x, y) {
    super(texture);

    this.x = x || 0;
    this.y = y || 0;

    this.vX = 0;
    this.vY = 0;

    this.falling = false;
    this.collision = false;

    this.components = {};
    this.components.movement = new Movement();
    this.components.gravity = new Gravity();
  }

  update() {
    this.applyComponent(this.components.movement);

    if (this.terrain) {
      const collideObj = this.getCollisionObj();
      let collision = this.terrain.checkCollision(collideObj);
      if (!collision.hasCollision) {
        this.applyComponent(this.components.gravity);
      } else {
        if (this.vY > 0) {
          this.vY = 0;
        }
        const fixY = collision.data[0].point.y;
        if (this.y + this.height > fixY) {
          this.y = fixY - this.height;
        }
      }
    }
  }

  getCollisionObj() {
    const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;
    const path = new Path([
      new Vector(x+width/2, y),
      new Vector(x+width/2, y+height),
    ]);
    return new CollideObject(path);
  }
}

module.exports = Entity;
