import {Sides, Trait} from '../Entity.js';

const dieSound = new Audio('../sounds/die.wav')
const revSound = new Audio('../sounds/revive.wav')

export default class Killable extends Trait {
  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 1;
  }
  kill() {
    this.queue(() => this.dead = true);
    dieSound.play();
  }

  revive(){
    this.dead = false;
    this.deadTime = 0;
    revSound.play();  
  }
  update(entity, deltaTime, level) {
    if (this.dead) {
      this.deadTime += deltaTime;
      if(this.deadTime > this.removeAfter) {
        this.queue(() => {
        level.entities.delete(entity);
      });
    }
    }
  }
}
