import Entity from "./entity";
import KeyboardState from "./keyboardState.js";

export function setUpKeyboard(mario:Entity){
    const input = new KeyboardState();
    input.addMapping('ArrowUp', (keyState: number) => {
        if(keyState > 0){
            mario.jump.start();
        }else{
            mario.jump.cancel();
        }
    })
    
    input.addMapping('KeyZ', (keyState: number) => {
        mario.turbo(keyState);
    })

    input.addMapping('ArrowRight', (keyState: number) => {
        mario.go.dir += keyState ? 1 : -1;
    })
    input.addMapping('ArrowLeft', (keyState: number) => {
        mario.go.dir += keyState ? -1 : 1;
    })

    return input;
}
