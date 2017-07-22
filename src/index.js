require('pixi');

const Engine = require('core/engine');
const Module = require('core/module');
const imageLoader = require('utils/imageloader');
const Vector = require('core/vec');
const Path = require('core/path');
const keyHandler = require('utils/keyhandler');

const World = require('world/world');
const Entity = require('world/entity');
const WorldObject = require('world/worldobject');

const Component = require('components/component');
const Movement = require('components/movement');
const Gravity = require('components/gravity');

const collisionUtils = require('collision/utils');
const triangulation = require('collision/triangulation');
const Shape = require('collision/shape');
const CollideObject = require('collision/collideobject');
const Terrain = require('collision/terrain');

const BREAD = {
  Engine,
  Module,
  imageLoader,
  keyHandler,
  Vector,
  Path,
  world: {
    World,
    WorldObject,
    Entity,
  },
  components: {
    Component,
    Movement,
    Gravity,
  },
  collision: {
    Shape,
    CollideObject,
    utils: collisionUtils,
    triangulation,
    Terrain,
  },
};

window.BREAD = BREAD;
module.exports = BREAD;
