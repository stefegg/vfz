import {Sides, Trait} from '../Entity.js';

export default class PendulumRun extends Trait {
  constructor(){
    super('pendulumRun');
    this.enabled = true;
    this.speed = -45;
  }

  obstruct(entity, side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
        this.speed = -this.speed;
    }
  }

  update(entity, deltaTime) {
    if(this.enabled) {

      entity.vel.x = this.speed;
    }
  }
}
