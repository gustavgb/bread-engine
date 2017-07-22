const Vec = require('core/vec');

class Path {
  constructor(points) {
    if (points.constructor === Array) {
      this.points = points.filter(point => point instanceof Vec);
      const cut = points.length - this.points.length;
      if (cut > 0) {
        console.warn(`Path found ${cut} invalid point(s)`);
      }
    } else {
      console.error('Path must recieve an array');
    }
  }

  toLines() {
    const points = this.points;
    const lines = [];

    for (let i = 0; i < points.length; i++) {
      let x1, y1, x2, y2;
      if (i < points.length-1) {
        x1 = points[i].x;
        y1 = points[i].y;
        x2 = points[i+1].x;
        y2 = points[i+1].y;
        lines.push(new Vec(x1, y1, x2, y2));
      }
    }

    return lines;
  }

  toVectors() {
    const points = this.points;
    const vectors = [];

    for (let i = 0; i < points.length; i++) {
      let x, y;
      if (i < points.length-1) {
        x = points[i+1].x - points[i].x;
        y = points[i+1].y - points[i].y;
        vectors.push(new Vec(x, y));
      }
    }

    return vectors;
  }

  static fromGroups(groups) {
    return groups.map(path => new Path(path));
  }
}

module.exports = Path;
