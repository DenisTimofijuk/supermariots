
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
import { createLevelLoader } from "./loaders/level_loaders.js";
import { loadEntities } from "./entities.js";
import { setUpMouseControl } from "./debug.js";
import Entity from "./entity.js";
import PlayerController from "./traits/PlayerController.js";
import { audioLoader } from "./loaders/audio_loader.js";

function createPlayerENviroment(playerEntity:Entity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkPoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas:HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const entityFactory = await loadEntities();
    const LoadLevel = await createLevelLoader(entityFactory);
    const level = await LoadLevel('1-1');
    // const audio = await audioLoader();

    const camera = new Camera();
    const mario = entityFactory.mario();

    const playerEnv = createPlayerENviroment(mario);
    level.entities.add(playerEnv);

    const input = setUpKeyboard(mario);
    input.listenTo(window);
    
    //debugger:
    // level.comp.layers.push(
    //     createCollisionLayer(level),
    //     createCameraLayer(camera)
    //     );
    //setUpMouseControl(canvas, mario, camera);

    const timer = new Timer()
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        // max camera position calculations:
        // (last tile x poxition - tile width + 1) * tile width
        // (211-16 + 1)*16 = 3136
        camera.pos.x = Math.min( Math.max(0, mario.pos.x - 100), 3136); 

        level.comp.draw(ctx, camera);
    }

    timer.start();

}

const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
main(canvas);