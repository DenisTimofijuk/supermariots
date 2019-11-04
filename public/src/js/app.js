import { loadLevel } from "./loaders.js";
import { createCollisionLayer } from "./layers.js";
import { createMario } from "./entities.js";
import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    const camera = new Camera();
    mario.pos.set(64, 64);
    createCollisionLayer(level);
    level.entities.add(mario);
    const input = setUpKeyboard(mario);
    input.listenTo(window);
    const timer = new Timer();
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        if (mario.pos.x > 100) {
            camera.pos.x = mario.pos.x - 100;
        }
        level.comp.draw(ctx, camera);
    };
    timer.start();
});
//# sourceMappingURL=app.js.map