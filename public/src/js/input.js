import KeyboardState from "./keyboardState.js";
export function setUpKeyboard(mario) {
    const input = new KeyboardState();
    input.addMapping('ArrowUp', (keyState) => {
        if (keyState > 0) {
            mario.jump.start();
        }
        else {
            mario.jump.cancel();
        }
    });
    input.addMapping('KeyZ', (keyState) => {
        mario.turbo(keyState);
    });
    input.addMapping('ArrowRight', (keyState) => {
        mario.go.dir += keyState ? 1 : -1;
    });
    input.addMapping('ArrowLeft', (keyState) => {
        mario.go.dir += keyState ? -1 : 1;
    });
    return input;
}
