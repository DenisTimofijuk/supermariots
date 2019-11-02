import { loadLevel } from "./loaders.js";
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import { createMario } from "./entities.js";
import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
import { setUpMouseControl } from "./debug.js";

const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


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
    
    //debugger:
    //level.comp.layers.push(
    //    createCollisionLayer(level),
    //    createCameraLayer(camera)
    //    );
    //debugger:
    setUpMouseControl(canvas, mario, camera);

    const timer = new Timer()
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(ctx, camera);
    }

    timer.start();

})
