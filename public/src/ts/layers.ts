import Entity from "./entity.js";
import Level from "./level.js";
import Camera from "./camera.js";

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