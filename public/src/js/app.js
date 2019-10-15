import { loadLevel } from "./loaders.js";
import { loadMarioSprite, loadBackgroundSprites } from "./sprites.js";
import Compositor from "./compositor.js";
import { createBackgroundLayer } from "./layers.js";
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
function createSpriteLayer(sprites, pos) {
    return function drawSpriteLayer(context) {
        sprites.draw('idle', context, pos.x, pos.y);
    };
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
});
//# sourceMappingURL=app.js.map