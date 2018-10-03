import Entity, {Sides, Trait} from '../Entity.js';
import PendulumSprint from '../traits/PendulumSprint.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'
import {loadSpriteSheet} from '../loaders.js';

export function loadCat() {
  return loadSpriteSheet('cat')
    .then(createCatFactory);
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
      us.pendulumSprint.speed = 0;
    } else {
      them.killable.kill();
    }
  }
  }
}

function createCatFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(cat){
    if (cat.killable.dead){
      return 'flat';
    }
    return walkAnim(cat.lifetime);
  }

  function drawCat(context) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createCat() {
    const cat = new Entity();
    cat.size.set(16, 16);
    cat.addTrait(new Physics());
    cat.addTrait(new Solid());
    cat.addTrait(new PendulumSprint());
    cat.addTrait(new Behavior());
    cat.addTrait(new Killable());
    cat.draw = drawCat;

    return cat;
  }
}
