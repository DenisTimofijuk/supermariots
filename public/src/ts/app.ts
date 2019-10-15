import { loadLevel } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import Compositor from "./compositor.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { createMario } from "./entities.js";
import Timer from "./timer.js";
import KeyboardState from "./keyboardState.js";

const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.background, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 2000;
    mario.pos.set(64, 180);

    const SPACE = 32;
    const input = new KeyboardState();
    input.addMapping(SPACE, (keyState: number) => {
        if(keyState > 0){
            mario.jump.start();
        }else{
            mario.jump.cancel();
        }
    })
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);
    const timer = new Timer()
    const deltaTime = 1 / 60;

    timer.update = function update(deltaTime) {
        mario.update(deltaTime);
        comp.draw(ctx);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();

})
