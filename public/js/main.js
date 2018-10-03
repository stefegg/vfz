import Camera from './Camera.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Timer from './Timer.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {setupKeyboard} from './input.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';
// import {setupMouseControl} from './debug.js';
//debug

function createPlayerEnv(playerEntity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(64, 64);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

async function main(canvas){
  const context = canvas.getContext('2d');
  const [entityFactory, font] = await Promise.all([
    loadEntities(),
    loadFont (),
  ]);

  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel('eversong');

  const camera = new Camera();

  const trollio = entityFactory.trollio();
  const playerEnv = createPlayerEnv(trollio);


  level.entities.add(playerEnv);


  // level.comp.layers.push(createCollisionLayer(level));
// for debugging collision area only
  level.comp.layers.push(createDashboardLayer(font, playerEnv));


  const input = setupKeyboard(trollio);
  input.listenTo(window);

// setupMouseControl(canvas, trollio, camera);
//debug

const timer = new Timer(1/60);
  timer.update = function update(deltaTime) {
  level.update(deltaTime);
    camera.pos.x = Math.max(0, trollio.pos.x - 100);
    level.comp.draw(context, camera);
  }
  timer.start();
}
const canvas = document.getElementById('screen');
main(canvas);
