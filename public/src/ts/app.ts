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
import { loadFont } from "./loaders/font_loader.js";
import { createDashboardLayer } from "./layers/dashboard.js";
import { createGameSettingsWindow } from "./game settings window.js";

export type AudioSett = { bg_music_enabled: boolean, sound_effects_enabled: boolean, sound_level: string }

function createPlayerENviroment(playerEntity: Entity) {
    const playerEnv = new Entity();
    const playerControl = new PlayerController();
    playerControl.checkPoint.set(64, 64);
    playerControl.setPlayer(playerEntity);
    playerEnv.addTrait(playerControl);
    return playerEnv;
}

async function main(canvas: HTMLCanvasElement, audioSettingd: AudioSett) {
    const audios = await audioLoader(audioSettingd);
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const [entityFactory, font] = await Promise.all([
        loadEntities(),
        loadFont()
    ]);

    const LoadLevel = await createLevelLoader(entityFactory, audios);
    const level = await LoadLevel('1-1');

    const camera = new Camera();
    const mario = entityFactory.mario(audios);

    const playerEnv = createPlayerENviroment(mario);
    level.entities.add(playerEnv);

    const input = setUpKeyboard(mario);
    input.listenTo(window);

    initDebugger(level, camera, canvas, mario, false);
    level.comp.layers.push(createDashboardLayer(font, playerEnv));

    const timer = new Timer()
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        // max camera position calculations:
        // (last tile x poxition - tile width + 1) * tile width
        // (211-16 + 1)*16 = 3136
        camera.pos.x = Math.min(Math.max(0, mario.pos.x - 100), 3136);
        level.comp.draw(ctx, camera);

    }
    timer.start();
}

async function initGame() {
    const canvas = document.getElementById('gameScreen') as HTMLCanvasElement;
    const font = await loadFont();
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const coverIMG = await loadImage('../img/cover.png');
    var audioSettingd = {
        bg_music_enabled: true,
        sound_effects_enabled: true,
        sound_level: '100'
    }

    drawIntroScreen(audioSettingd);

    window.addEventListener('keyup', canvasEventHandler);

    function canvasEventHandler(e: KeyboardEvent) {
        if (e.code == 'KeyS') {
            audioSettingd.sound_effects_enabled = !audioSettingd.sound_effects_enabled;
            drawIntroScreen(audioSettingd);
        }
        if (e.code == 'KeyM') {
            audioSettingd.bg_music_enabled = !audioSettingd.bg_music_enabled;
            drawIntroScreen(audioSettingd);
        }
        if (e.code == 'Space') {
            window.removeEventListener('keyup', canvasEventHandler);
            main(canvas, audioSettingd);
        }
    }

    function drawIntroScreen(audioSettingd: AudioSett) {
        const gameSettingsWindow = createGameSettingsWindow(font, audioSettingd);
        ctx.drawImage(coverIMG, 0, 0);
        ctx.drawImage(gameSettingsWindow, 50, 50);
    }
}

initGame()