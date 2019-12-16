import Timer from "./timer.js";
import { setUpKeyboard } from "./input.js";
import Camera from "./camera.js";
import { createLevelLoader } from "./loaders/level_loaders.js";
import { loadEntities } from "./entities.js";
import Entity from "./entity.js";
import PlayerController from "./traits/PlayerController.js";
import { audioLoader } from "./loaders/audio_loader.js";
import { loadImage } from "./loaders.js";
import initDebugger from "./debugger.js";
function createPlayerENviroment(playerEntity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkPoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}
function initGameStart() {
}
function getAutioParameters() {
    const bg_music_node = document.getElementById('bg_music');
    const sound_effects_node = document.getElementById('sound_effects');
    const sound_level_node = document.getElementById('sound_level');
    const audioOptions = {
        bg_music_enabled: bg_music_node.checked,
        sound_effects_enabled: sound_effects_node.checked,
        sound_level: sound_level_node.value
    };
    return audioOptions;
}
async function main(canvas) {
    const audios = await audioLoader(getAutioParameters());
    const ctx = canvas.getContext('2d');
    const entityFactory = await loadEntities();
    const LoadLevel = await createLevelLoader(entityFactory, audios);
    const level = await LoadLevel('1-1');
    const camera = new Camera();
    const mario = entityFactory.mario(audios);
    const playerEnv = createPlayerENviroment(mario);
    level.entities.add(playerEnv);
    const input = setUpKeyboard(mario);
    input.listenTo(window);
    initDebugger(level, camera, canvas, mario, false);
    const timer = new Timer();
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        camera.pos.x = Math.min(Math.max(0, mario.pos.x - 100), 3136);
        level.comp.draw(ctx, camera);
    };
    timer.start();
}
async function initGame() {
    const canvas = document.getElementById('gameScreen');
    main(canvas);
    return;
    const ctx = canvas.getContext('2d');
    const coverIMG = await loadImage('../img/cover.png');
    ctx.drawImage(coverIMG, 0, 0);
    const startGame = document.getElementById('start_game');
    startGame.addEventListener('click', function () {
        startGame.disabled = true;
        main(canvas);
    });
}
initGame();
//# sourceMappingURL=app.js.map