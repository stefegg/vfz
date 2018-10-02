import Entity, {Sides, Trait} from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'
import {loadSpriteSheet} from '../loaders.js';

export function loadRelf() {
  return loadSpriteSheet('relf')
    .then(createRelfFactory);
}

class Behavior extends Trait {
  constructor(){
    super('behavior');
  }
  collides(us, them) {
    if(us.killable.dead){
      return;
    }
    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
      us.killable.kill();
      us.pendulumMove.speed = 0;
    } else {
      them.killable.kill();
    }
  }
  }
}

function createRelfFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(relf){
    if (relf.killable.dead){
      return 'flat';
    }
    return walkAnim(relf.lifetime);
  }

  function drawRelf(context) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createRelf() {
    const relf = new Entity();
    relf.size.set(16, 16);
    relf.offset.y = 8;

    relf.addTrait(new Physics());
    relf.addTrait(new Solid());
    relf.addTrait(new PendulumMove());
    relf.addTrait(new Behavior());
    relf.addTrait(new Killable());
    relf.draw = drawRelf;

    return relf;
  }
}
