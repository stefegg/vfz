import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js'
import Solid from '../traits/Solid.js'
import Physics from '../traits/Physics.js'
import Stomper from '../traits/Stomper.js'
import {
  loadSpriteSheet
} from '../loaders.js';

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadTrollio() {
  return loadSpriteSheet('trollio')
    .then(createTrollioFactory);
}



function createTrollioFactory(sprite) {

  const runAnim = sprite.animations.get('run');

  function routeFrame(trollio) {
    if (trollio.jump.falling) {
      return 'jump';
    }
    if (trollio.go.distance > 0) {
      if ((trollio.vel.x > 0 && trollio.go.dir < 0) || (trollio.vel.x < 0 && trollio.go.dir > 0)) {
        return 'break';
      }
      return runAnim(trollio.go.distance);
    }
    return 'idle';
  }

  function setTurboState(turboOn) {
    this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
  }


  function drawTrollio(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
  }

  return function createTrollio() {
    const trollio = new Entity();
    trollio.size.set(14, 16);
    trollio.offset.y = 4;
    trollio.addTrait(new Physics());
    trollio.addTrait(new Solid());
    trollio.addTrait(new Go());
    trollio.addTrait(new Jump());
    trollio.addTrait(new Killable());
    trollio.addTrait(new Stomper());
    trollio.killable.removeAfter = 0;
    trollio.turbo = setTurboState;
    trollio.draw = drawTrollio;
    trollio.turbo(false);

    return trollio;
  }
}
