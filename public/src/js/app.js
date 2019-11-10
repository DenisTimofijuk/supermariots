import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
import { createLevelLoader } from "./loaders/level_loaders.js";
import { loadEntities } from "./entities.js";
async function main(canvas) {
    const ctx = canvas.getContext('2d');
    const entityFactory = await loadEntities();
    const LoadLevel = await createLevelLoader(entityFactory);
    const level = await LoadLevel('1-1');
    const camera = new Camera();
    const mario = entityFactory.mario();
    mario.pos.set(64, 64);
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
}
const canvas = document.getElementById('gameScreen');
main(canvas);
//# sourceMappingURL=app.js.map