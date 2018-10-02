import Keyboard from './KeyboardState.js';

export function setupKeyboard(trollio) {

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
  return input;
}
