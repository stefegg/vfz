import Entity, {Sides, Trait} from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'
import {loadSpriteSheet} from '../loaders.js';

export function loadElf() {
  return loadSpriteSheet('elf')
    .then(createElfFactory);
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

function createElfFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(elf){
    if (elf.killable.dead){
      return 'flat';
    }
    return walkAnim(elf.lifetime);
  }

  function drawElf(context) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createElf() {
    const elf = new Entity();
    elf.size.set(16, 16);
    elf.offset.y = 8;

    elf.addTrait(new Physics());
    elf.addTrait(new Solid());
    elf.addTrait(new PendulumMove());
    elf.addTrait(new Behavior());
    elf.addTrait(new Killable());
    elf.draw = drawElf;

    return elf;
  }
}
