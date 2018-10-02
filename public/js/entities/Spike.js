import Entity, {Sides, Trait} from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import Killable from '../traits/Killable.js';
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'
import {loadSpriteSheet} from '../loaders.js';

export function loadSpike() {
  return loadSpriteSheet('spike')
    .then(createSpikeFactory);
}

class Behavior extends Trait {
  constructor(){
    super('behavior');
  }
  collides(us, them) {
    if(them.killable){
      them.killable.kill();
      return;
    }
  }
  }

function createSpikeFactory(sprite) {


  function drawSpike(context) {
    sprite.draw('lol', context, 0, 0);

  }

  return function createSpike() {
    const spike = new Entity();
    spike.size.set(16, 16);
    spike.addTrait(new Physics());
    spike.addTrait(new Solid());
    spike.addTrait(new Behavior());
    spike.draw = drawSpike;

    return spike;
  }
}
