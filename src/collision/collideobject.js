const Shape = require('collision/shape');
const collisionUtils = require('collision/utils');
const Path = require('core/path');

class CollideObject {
  constructor(data) {
    if (data.constructor === Array) {
      this.data = new Path(data);

      this.isShape = false;
    } else if (data instanceof Path) {
      this.data = data;

      this.isShape = false;
    } else if (data instanceof Shape) {
      this.data = data;

      this.isShape = true;
    } else {
      console.error('CollideObject recieved invalid parameters');
    }
  }

  get points() {
    return this.data.points;
  }

  getLines() {
    return this.data.toLines();
  }

  detectCollisionWithObject(obj) {
    if (obj instanceof CollideObject) {
      const lines1 = this.getLines();
      const lines2 = obj.getLines();

      let collisionPoint, line1, line2;
      for (let i = 0; i < lines1.length; i++) {
        line1 = lines1[i];
        for (let j = 0; j < lines2.length; j++) {
          line2 = lines2[j];
          collisionPoint = collisionUtils.detectLineCollision(line1, line2);
          if (collisionPoint) {
            return {
              line: lines2[j],
              point: collisionPoint,
            };
          }
        }
      }
      return false;
    }
  }

  detectMultipleCollisions(objList) {
    const collisions = [];
    let data;
    objList.forEach((obj, objIndex) => {
      data = this.detectCollisionWithObject(obj);
      if (data !== false) {
        collisions.push({
          objIndex: objIndex,
          line: data.line,
          point: data.point,
        });
      }
    });

    return collisions;
  }
}

module.exports = CollideObject;
