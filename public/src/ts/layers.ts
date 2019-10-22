import SpriteSheet from "./SpriteSheet";
import Entity from "./entity.js";
import Level from "./level.js";

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d') as CanvasRenderingContext2D;

    level.tiles.forEach((tile, x, y) => {
        if (tile.name) {
            sprites.drawTile(tile.name, ctxBuffer, x, y);
        }
    })

    return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
        context.drawImage(buffer, 0, 0);
    };
}

export function createSpriteLayer(entities: Set<Entity>) {
    return function drawSpriteLayer(context: CanvasRenderingContext2D) {
        entities.forEach(entity => {
            entity.draw(context);
        });
    }
}

export function createCollisionLayer(level:Level) {
    const resolvedTiles:Array<{x:number,y:number}> = [];

    const tileResolver = level.tileColider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x:number, y:number){
        resolvedTiles.push({x, y});
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisions(contex:CanvasRenderingContext2D) {
        contex.strokeStyle = 'blue';
        resolvedTiles.forEach(({x,y}) => {
            contex.beginPath();
            contex.rect(x*tileSize, y*tileSize, tileSize, tileSize);
            contex.stroke();
        });

        contex.strokeStyle = 'red';
        level.entities.forEach(entity => {
            contex.beginPath();
            contex.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            contex.stroke();
        })

        resolvedTiles.length = 0;
    }
}