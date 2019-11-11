import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
import { createLevelLoader } from "./loaders/level_loaders.js";
import { loadEntities } from "./entities.js";
import Entity from "./entity.js";
import PlayerController from "./traits/PlayerController.js";
function createPlayerENviroment(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkPoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}
async function main(canvas) {
    const ctx = canvas.getContext('2d');
    const entityFactory = await loadEntities();
    const LoadLevel = await createLevelLoader(entityFactory);
    const level = await LoadLevel('1-1');
    const camera = new Camera();
    const mario = entityFactory.mario();
    const playerEnv = createPlayerENviroment(mario);
    level.entities.add(playerEnv);
    const input = setUpKeyboard(mario);
    input.listenTo(window);
    const timer = new Timer();
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        camera.pos.x = Math.max(0, mario.pos.x - 100);
        level.comp.draw(ctx, camera);
    };
    timer.start();
}
const canvas = document.getElementById('gameScreen');
main(canvas);
//# sourceMappingURL=app.js.map