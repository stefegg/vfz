import {Sides, Trait} from '../Entity.js';

export default class PendulumSprint extends Trait {
  constructor(){
    super('pendulumSprint');
    this.enabled = true;
    this.speed = -60;
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
