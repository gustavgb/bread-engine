const Vec = require('core/vec');

const detectLineCollision = (line1, line2) => {
  const x1 = line1.x;
  const y1 = line1.y;
  const x2 = line1.z;
  const y2 = line1.w;

  const x3 = line2.x;
  const y3 = line2.y;
  const x4 = line2.z;
  const y4 = line2.w;

  let dx1, dy1, dx2, dy2;

  // Relative to line1
  dx1 = x2 - x1;
  dy1 = y2 - y1;
  dx2 = x3 - x1;
  dy2 = y3 - y1;

  const d1 = dx1*dy2 - dx2*dy1;

  dx2 = x4 - x1;
  dy2 = y4 - y1;

  const d2 = dx1*dy2 - dx2*dy1;

  // Relative to line2
  dx1 = x4 - x3;
  dy1 = y4 - y3;
  dx2 = x1 - x3;
  dy2 = y1 - y3;

  const d3 = dx1*dy2 - dx2*dy1;

  dx2 = x2 - x3;
  dy2 = y2 - y3;

  const d4 = dx1*dy2 - dx2*dy1;

  if (
    ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0))
      && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))
  ) {
    const a = ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    const x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/a;
    const y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/a;

    return new Vec(x, y);
  }
  return false;
};

const detectLineGroupCollision = (paths, checkLine) => {
  // Get vectors
  let lines, collision;
  const collisions = [];

  paths.forEach((path, groupIndex) => {
    lines = path.toLines();

    lines.forEach(line => {
      collision = detectLineCollision(line, checkLine);

      if (collision !== false) {
        collisions.push({
          hasCollision: true,
          data: {
            point: collision,
            groupIndex: groupIndex,
          },
        });
      }
    });
  });

  return collisions;
};

module.exports = {
  detectLineCollision,
  detectLineGroupCollision,
};
