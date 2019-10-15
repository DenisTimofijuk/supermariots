import { loadLevel } from "./loaders.js";
import { loadBackgroundSprites } from "./sprites.js";
import Compositor from "./compositor.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { createMario } from "./entities.js";
import Timer from "./timer.js";
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([mario, backgroundSprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.background, backgroundSprites);
    comp.layers.push(backgroundLayer);
    const gravity = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);
    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);
    const timer = new Timer();
    const deltaTime = 1 / 60;
    timer.update = function update(deltaTime) {
        comp.draw(ctx);
        mario.update(deltaTime);
        mario.vel.y += gravity;
    };
    timer.start();
});
//# sourceMappingURL=app.js.map