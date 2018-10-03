import Entity, {Sides, Trait} from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import {loadSpriteSheet} from '../loaders.js';
import Physics from '../traits/Physics.js'

import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js'

export function loadTreant() {
  return loadSpriteSheet('treant')
    .then(createTreantFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_PANIC = Symbol('panic');


class Behavior extends Trait {
  constructor(){
    super('behavior');
    this.panicSpeed = 150;
    this.walkSpeed = null;
    this.state = STATE_WALKING;
  }
  collides(us, them) {
    if(us.killable.dead){
      return;
    }
    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
    } else {
      them.killable.kill();
    }
  }
  }




  handleStomp(us, them) {
    if (this.state === STATE_WALKING) {
      this.panic(us);
    } else if (this.state === STATE_PANIC) {
      us.killable.kill();
      us.pendulumMove.speed = 0;
    }
  }
  panic(us, them) {
    us.pendulumMove.enabled = true;
    us.pendulumMove.speed = this.panicSpeed;
    this.state = STATE_PANIC;
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
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createTreant() {
    const treant = new Entity();
    treant.size.set(16, 16);
    treant.offset.y = 8;
    treant.addTrait(new Physics());
    treant.addTrait(new Solid());
    treant.addTrait(new PendulumMove());
    treant.addTrait(new Killable());
    treant.addTrait(new Behavior());
    treant.draw = drawTreant;

    return treant;
  }
}
