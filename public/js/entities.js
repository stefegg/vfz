import {loadTrollio} from './entities/Trollio.js';
import {loadCat} from './entities/Cat.js';
import {loadGhoul} from './entities/Ghoul.js';
import {loadTreant} from './entities/Treant.js';
import {loadElf} from './entities/Elf.js';
import {loadRelf} from './entities/Relf.js';

import {loadSpike} from './entities/Spike.js';

export function loadEntities() {
  const entityFactories = {};

  function addAs(name) {
    return factory => entityFactories[name] = factory;
  }

  return Promise.all([
  loadTrollio().then(addAs('trollio')),
  loadCat().then(addAs('cat')),
  loadTreant().then(addAs('treant')),
  loadElf().then(addAs('elf')),
  loadSpike().then(addAs('spike')),
  loadRelf().then(addAs('relf')),

  loadGhoul().then(addAs('ghoul'))
])
.then(() => entityFactories);
}
