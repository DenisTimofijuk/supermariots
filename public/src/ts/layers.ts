import SpriteSheet from "./SpriteSheet";
import Entity from "./entity.js";
import Level from "./level.js";
import Camera from "./camera.js";
import { Matrix } from "./math.js";
import TileResolver from "./TileResolver.js";

export function createBackgroundLayer(level: Level, tiles:Matrix, sprites: SpriteSheet) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d') as CanvasRenderingContext2D;

    function redraw(startIndex:number, endIndex:number) {
        ctxBuffer.clearRect(0, 0, buffer.width, buffer.height);
        
        for( let x = startIndex; x <= endIndex; ++x){
            const con = tiles.grid[x];
            if(con){
                con.forEach((tile, y) => {
                    if(tile.name && sprites.animations.has(tile.name)){
                        sprites.drawAnim(tile.name, ctxBuffer, x - startIndex, y, level.totalTime);
                    }else if (tile.name) {
                        sprites.drawTile(tile.name, ctxBuffer, x - startIndex, y);
                    }
                })
            }
        }
    }

    return function drawBackgroundLayer(context: CanvasRenderingContext2D, camera: Camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, 
            -camera.pos.x % 16, 
            -camera.pos.y
            );
    };
}

export function createSpriteLayer(entities: Set<Entity>, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferCtx = spriteBuffer.getContext('2d') as CanvasRenderingContext2D;


    return function drawSpriteLayer(context: CanvasRenderingContext2D, camera: Camera) {
        entities.forEach(entity => {
            spriteBufferCtx.clearRect(0, 0, width, height);

            entity.draw(spriteBufferCtx);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y
            )
        });
    }
}

export function createCollisionLayer(level: Level) {
    const resolvedTiles: Array<{ x: number, y: number }> = [];

    const tileResolver = level.tileColider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x: number, y: number) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisions(contex: CanvasRenderingContext2D, camera:Camera) {
        contex.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            contex.beginPath();
            contex.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
            contex.stroke();
        });

        contex.strokeStyle = 'red';
        level.entities.forEach(entity => {
            contex.beginPath();
            contex.rect(
                entity.pos.x - camera.pos.x, 
                entity.offset.y + entity.pos.y - camera.pos.y, 
                entity.size.x, 
                entity.size.y
                );
            contex.stroke();
        })

        resolvedTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw:Camera) {
    return function drawCameraRect(contex:CanvasRenderingContext2D, fromCamera:Camera) {
        contex.strokeStyle = 'purple';
        contex.beginPath();
        contex.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y-fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        contex.stroke();
    }
}