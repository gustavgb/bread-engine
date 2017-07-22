const render = require('core/render');
const loader = render.loader;

class ImageLoader {
  constructor(afterLoad) {
    this.images = [];

    this.names = {};

    if (typeof afterLoad === 'function') {
      this.afterLoad = afterLoad;
    }
  }

  load(images) {
    let name;
    images.forEach(image => {
      loader.add(image.path);

      name = image.name && image.name.length > 0 ? image.name : image.path;
      this.addName(name, image.path);
    });
    loader.load(this.requestDone.bind(this));
  }

  addName(name, resourceName) {
    this.names[name] = resourceName;
  }

  removeName(name) {
    delete this.names[name];
  }

  requestDone() {
    this.images = loader.resources;
    this.onload(this.getTexture.bind(this));
  }

  onload() {}

  getTexture(name) {
    const resourceName = this.names[name];
    if (name && resourceName) {
      const re = this.images[resourceName].texture;
      return re;
    }
    return;
  }
}

const instanceLoader = new ImageLoader();

module.exports = instanceLoader;
