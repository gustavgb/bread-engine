const triangulation = require('collision/triangulation');
const Vec = require('core/vec');
const Path = require('core/path');

const correctPoints = (points) => {
  points.forEach(point => {
    if (!(point instanceof Vec)) {
      console.error('Shape must recieve array of Vectors');
    }
  });

  const last = points[points.length-1];
  const first = points[0];
  if (first.x === last.x && first.y === last.y) {
    return points;
  } else {
    return points.concat([
      new Vec(first.x, first.y),
    ]);
  }
};

class Shape {
  constructor(path) {
    if (path.constructor === Array) {
      const correctedPoints = correctPoints(path);
      this.path = new Path(correctedPoints);
    } if (path instanceof Path) {
      const correctedPoints = correctPoints(path.points);
      this.path = new Path(correctedPoints);
    } else {
      console.error('Shape recieved invalid parameters');
    }
    this.updateGroups();
  }

  get points() {
    return this.path.points;
  }

  toLines() {
    return this.path.toLines();
  }

  toVectors() {
    return this.path.toVectors();
  }

  updateGroups() {
    this.groups = Path.fromGroups(triangulation.triangulate(this.path));
  }
}

module.exports = Shape;
