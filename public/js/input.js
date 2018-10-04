import Keyboard from './KeyboardState.js';

export function setupKeyboard(trollio) {
  const gameSong = new Audio('../sounds/song.wav');
  gameSong.loop = true;

  const input = new Keyboard();
  input.addMapping('Space', keyState => {
    if (keyState) {
      trollio.jump.start();
    } else {
      trollio.jump.cancel();
    }
  });
  input.addMapping('KeyO', keyState => {
    trollio.turbo(keyState);
  });
  input.addMapping('KeyD', keyState => {
    trollio.go.dir += keyState ? 1 : -1;
  });
  input.addMapping('KeyA', keyState => {
    trollio.go.dir += -keyState ? -1 : 1;
  });
  input.addMapping('Digit1', keyState => {
    gameSong.play();
  });
  input.addMapping('Digit2', keyState => {
    gameSong.pause();
    gameSong.currentTime = 0;
  });
  return input;
}
