const CollideObject = require('collision/collideobject');
const Path = require('core/path');

class Terrain {
  constructor(paths) {
    if (paths.constructor === Array) {
      this.paths = paths.map(path => {
        if (path.constructor === Array) {
          return new Path(path);
        } else if (path instanceof Path) {
          return path;
        } else {
          return null;
        }
      }).filter(path => path !== null);
      const cut = paths.length - this.paths.length;
      if (cut > 0) {
        console.warn(`Terrain found ${cut} invalid path(s)`);
      }

      this.collideObjs = this.paths.map(path => new CollideObject(path));
    } else {
      console.error('Terrain recieved invalid parameters');
    }
  }

  checkCollision(obj) {
    if (obj instanceof CollideObject) {
      const collisions = obj.detectMultipleCollisions(this.collideObjs);
      return {
        hasCollision: collisions.length > 0,
        data: collisions,
      };
    } else {
      console.error('Recieved invalid parameters');
    }
  }
}

module.exports = Terrain;
