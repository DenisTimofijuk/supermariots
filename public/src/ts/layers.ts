import { Background_Element } from "./loaders.js";
import SpriteSheet from "./SpriteSheet";
import Entity from "./entity.js";

export function createBackgroundLayer(backgrounds: Array<Background_Element>, sprites: SpriteSheet) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d') as CanvasRenderingContext2D;
    backgrounds.forEach(background => {
        drawBackground(background, ctxBuffer, sprites);
    })

    return function drawBackgroundLayer(context:CanvasRenderingContext2D){
        context.drawImage(buffer, 0, 0);
    };
}

export function createSpriteLayer(entity:Entity) {
    return function drawSpriteLayer(context: CanvasRenderingContext2D) {
        entity.draw(context);
    }
}

function drawBackground(background: Background_Element, ctx: CanvasRenderingContext2D, sprites: SpriteSheet) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, ctx, x, y);
            };
        };
    });
}