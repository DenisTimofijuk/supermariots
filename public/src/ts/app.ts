
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
import { loadLevel } from "./loaders/level_loaders.js";
import { loadEntities } from "./entities.js";

const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


Promise.all([
    loadEntities(),
    loadLevel('1-1')
]).then(([entity, level]) => {
    const camera = new Camera();
    const mario = entity.mario();

    mario.pos.set(64, 64);

    const goomba = entity.goomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

    const koopa = entity.koopa();
    koopa.pos.x = 260;
    level.entities.add(koopa);

    level.entities.add(mario);

    const input = setUpKeyboard(mario);
    input.listenTo(window);
    
    //debugger:
    level.comp.layers.push(
        createCollisionLayer(level),
        createCameraLayer(camera)
        );
    // setUpMouseControl(canvas, mario, camera);

    const timer = new Timer()
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if(mario.pos.x > 100){
            camera.pos.x = mario.pos.x - 100;
        }

        level.comp.draw(ctx, camera);
    }

    timer.start();

})
