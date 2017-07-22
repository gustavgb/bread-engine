const Vec = require('core/vec');

const convertPointsVectors = (points) => {
  var vectors = [];

  for (let i = 0; i < points.length; i++) {
    let x, y;
    if (i < points.length-1) {
      x = points[i+1].x - points[i].x;
      y = points[i+1].y - points[i].y;
      vectors.push(new Vec(x, y));
    }
  }

  return vectors;
};

const convertPointsLines = (points) => {
  var lines = [];

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
};

module.exports = {
  convertPointsLines,
  convertPointsVectors,
};
