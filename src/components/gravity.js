const Component = require('components/component');
const modifier = require('core/modifier');

class GravityComponent extends Component {
  runner(obj) {
    if (!obj.collision) {
      obj.vY += 100*modifier;

      obj.y += obj.vY * modifier;
    } else {
      obj.vY = 0;
    }
  }
}

module.exports = GravityComponent;
