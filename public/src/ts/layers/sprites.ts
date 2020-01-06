import Entity from "../entity.js";
import Camera from "../camera.js";

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
