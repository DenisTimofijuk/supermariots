import TileResolver from "./TileResolver.js";
export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);
    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d');
    function redraw(startIndex, endIndex) {
        ctxBuffer.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = startIndex; x <= endIndex; ++x) {
            const con = tiles.grid[x];
            if (con) {
                con.forEach((tile, y) => {
                    if (tile.name && sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, ctxBuffer, x - startIndex, y, level.totalTime);
                    }
                    else if (tile.name) {
                        sprites.drawTile(tile.name, ctxBuffer, x - startIndex, y);
                    }
                });
            }
        }
    }
    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
    };
}
export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferCtx = spriteBuffer.getContext('2d');
    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferCtx.clearRect(0, 0, width, height);
            entity.draw(spriteBufferCtx);
            context.drawImage(spriteBuffer, entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y);
        });
    };
}
export function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileResolver = level.tileColider.tiles;
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };
    return function drawCollisions(contex, camera) {
        contex.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            contex.beginPath();
            contex.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
            contex.stroke();
        });
        contex.strokeStyle = 'red';
        level.entities.forEach(entity => {
            contex.beginPath();
            contex.rect(entity.pos.x - camera.pos.x, entity.offset.y + entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
            contex.stroke();
        });
        resolvedTiles.length = 0;
    };
}
export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(contex, fromCamera) {
        contex.strokeStyle = 'purple';
        contex.beginPath();
        contex.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y - fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        contex.stroke();
    };
}
//# sourceMappingURL=layers.js.map