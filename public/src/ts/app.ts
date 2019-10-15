import SpriteSheet from "./SpriteSheet.js";
import { loadLevel } from "./loaders.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";
import Compositor from "./compositor.js";
import { createBackgroundLayer } from "./layers.js";

const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;



function createSpriteLayer(sprites:SpriteSheet, pos: {x:number, y:number}) {
    return function drawSpriteLayer(context:CanvasRenderingContext2D) {
        sprites.draw('idle', context, pos.x, pos.y);
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([MarioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.background, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const pos = {
        x: 64,
        y: 64
    };

    const spriteLayer = createSpriteLayer(MarioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(ctx);
        MarioSprite.draw('idle', ctx, pos.x, pos.y); 
        pos.x += 2;
        pos.y += 2; 
        
        requestAnimationFrame(update);
    }

    update();
    
})
