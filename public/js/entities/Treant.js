import Entity, {Sides, Trait} from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'
import {loadSpriteSheet} from '../loaders.js';

export function loadTreant() {
  return loadSpriteSheet('treant')
    .then(createTreantFactory);
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

function createTreantFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(treant){
    if (treant.killable.dead){
      return 'flat';
    }
    return walkAnim(treant.lifetime);
  }

  function drawTreant(context) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createTreant() {
    const treant = new Entity();
    treant.size.set(16, 16);
    treant.offset.y = 8;

    treant.addTrait(new Physics());
    treant.addTrait(new Solid());
    treant.addTrait(new PendulumMove());
    treant.addTrait(new Behavior());
    treant.addTrait(new Killable());
    treant.draw = drawTreant;

    return treant;
  }
}
