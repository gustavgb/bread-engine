const collisionUtils = require('collision/utils');
const Vec = require('core/vec');
const Path = require('core/path');

const splitGroups = (pathGroups) => {
  const newGroups = [];

  pathGroups.forEach(path => {
    const points = path.points;

    if (points.length > 3) {
      const concaves = getConcaveCorners(path);

      if (concaves.length > 0) {
        // Split first ear
        let currentPoint = concaves[0];
        let start, end;
        do {
          currentPoint++;

          start = (currentPoint-1 + points.length) % points.length;
          end = (start + 2) % points.length;
        } while ((concaves.indexOf((start+1) % points.length) !== -1 || collisionUtils.detectLineGroupCollision(pathGroups, new Vec(
          points[start].x,
          points[start].y,
          points[end].x,
          points[end].y
        )).length > 0) && currentPoint < concaves[0]-1 + points.length);

        let newPoints = [];

        for (let i = start; i <= start + points.length; i++) {
          const index = i % points.length;

          if (i === start) {
            newPoints = [];
          }

          newPoints.push(points[index]);

          if (index === end || (index === start && i > start)) {
            newGroups.push(new Path(newPoints));
            newPoints = [];
            newPoints.push(points[index]);
          }
        }
      } else {
        newGroups.push(path);
      }
    } else {
      newGroups.push(path);
    }
  });

  return newGroups;
};

const getConcaveCorners = (path) => {
  if (path instanceof Path) {
    const vectors = path.toVectors();

    // find determinants
    var determinants = [];

    for (let i = 0; i < vectors.length; i++) {
      let p1, p2;
      if (i < vectors.length-1) {
        p1 = vectors[i];
        p2 = vectors[i+1];
      } else {
        p1 = vectors[i];
        p2 = vectors[0];
      }

      determinants.push({d: p1.x * p2.y - p2.x * p1.y, i: i});
    }

    // Determine concave corners
    const concaves = determinants.filter(val => val.d < 0).map(val => (val.i + 1) % determinants.length);

    return concaves;
  } else {
    console.error('getConcaveCorners recieved invalid parameters');
  }
};

const triangulate = (path) => {
  if (path instanceof Path) {
    let paths = [path];

    let n, last, allow;
    const canContinue = () => {
      n = paths.reduce((acc, p) => getConcaveCorners(p).length + acc, 0);
      allow = n > 0 && paths.length !== last;
      last = paths.length;
      return allow;
    };

    while (canContinue()) {
      paths = splitGroups(paths);
    }

    return paths;
  } else {
    console.error('triangulate recieved invalid parameters');
  }
};

module.exports = {
  triangulate,
  getConcaveCorners,
  splitGroups,
};
