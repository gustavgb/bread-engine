const Component = require('components/component');
const keyHandler = require('utils/keyhandler');
const modifier = require('core/modifier');

const defaultControls = {
  left: 37,
  right: 39,
  up: 38,
  down: 40,
};

class MovementComponent extends Component {
  constructor(controls) {
    super();

    this.controls = controls || defaultControls;
  }

  runner(obj) {
    const keys = keyHandler.keys;
    const ctrl = this.controls;
    const speed = obj.speed || 200;
    if (ctrl.left in keys) {
      obj.x -= speed * modifier;
    }

    if (ctrl.right in keys) {
      obj.x += speed * modifier;
    }

    if (ctrl.down in keys) {
      obj.y += speed * modifier;
    }

    if (ctrl.up in keys) {
      obj.y -= speed * modifier;
    }
  }
}

module.exports = MovementComponent;
