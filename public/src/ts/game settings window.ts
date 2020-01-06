import { FontClass } from "./loaders/font_loader";
import { AudioSett } from "./app";

function displayTitle(font: FontClass, ctx: CanvasRenderingContext2D) {
    const LINE1 = font.size;
    font.print('GAME SETTINGS', ctx, 20, LINE1)
}

function displaySoundEffects(font: FontClass, ctx: CanvasRenderingContext2D, status: boolean) {
    const LINE = font.size * 3;
    const x = 20;
    const label = 'sound [s]';
    let val = status ? 'ON' : 'OFF';
    font.print(label, ctx, x, LINE);
    font.print(val, ctx, x + 80, LINE);
}

function displayMusic(font: FontClass, ctx: CanvasRenderingContext2D, status: boolean) {
    const LINE = font.size * 4 + font.size;
    const x = 20;
    let val = status ? 'ON' : 'OFF';
    font.print('music [m]', ctx, x, LINE)
    font.print(val, ctx, x + 80, LINE)
}

function displayControls(font: FontClass, ctx: CanvasRenderingContext2D) {
    const LINE1 = font.size * 9;
    const LINE2 = LINE1 + font.size * 2;
    const LINE3 = LINE2 + font.size * 2;
    const x = 10;
    font.print('GAME CONTROLS', ctx, x + 10, LINE1);
    font.print('Z X C', ctx, x, LINE3);
    font.print('AU', ctx, x + 94, LINE2);
    font.print('AL AD AR', ctx, x + 70, LINE3);
}

function displayStartBtn(font: FontClass, ctx: CanvasRenderingContext2D) {
    const LINE = font.size * 17;
    const x = 20;
    font.print('START [SPACE]', ctx, x, LINE)
}

function fillBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
    function _borderBlack() {        
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
        ctx.stroke();
        ctx.closePath();
    }

    function _borderWhite(){
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, 0);
        ctx.lineTo(width, 0);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.stroke();
        ctx.closePath();
    }

    function _background() {
        ctx.fillStyle = 'rgba(156, 74, 0, 0.8)';
        ctx.fillRect(0, 0, width, height);    
    }
    
    ctx.lineWidth = 3;
    _background();
    _borderBlack();
    _borderWhite()

    // ctx.globalAlpha = 1.0;
}

export function createGameSettingsWindow(font: FontClass, audioSettingd: AudioSett) {
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.imageSmoothingEnabled = false;

    fillBackground(context, canvas.width, canvas.height);
    displayTitle(font, context);
    displaySoundEffects(font, context, audioSettingd.sound_effects_enabled);
    displayMusic(font, context, audioSettingd.bg_music_enabled);
    displayStartBtn(font, context);
    displayControls(font, context);

    return canvas;
}