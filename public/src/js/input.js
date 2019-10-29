import KeyboardState from "./keyboardState.js";
export function setUpKeyboard(entity) {
    const input = new KeyboardState();
    input.addMapping('ArrowUp', (keyState) => {
        if (keyState > 0) {
            entity.jump.start();
        }
        else {
            entity.jump.cancel();
        }
    });
    input.addMapping('ArrowRight', (keyState) => {
        entity.go.dir = keyState;
    });
    input.addMapping('ArrowLeft', (keyState) => {
        entity.go.dir = -keyState;
    });
    return input;
}
//# sourceMappingURL=input.js.map