import Entity from "./entity";
import KeyboardState from "./keyboardState.js";

export function setUpKeyboard(entity:Entity){
    const input = new KeyboardState();
    input.addMapping('ArrowUp', (keyState: number) => {
        if(keyState > 0){
            entity.jump.start();
        }else{
            entity.jump.cancel();
        }
    })
    input.addMapping('ArrowRight', (keyState: number) => {
        entity.go.dir = keyState;
    })
    input.addMapping('ArrowLeft', (keyState: number) => {
        entity.go.dir = -keyState;
    })

    return input;
}
