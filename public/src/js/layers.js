export function createBackgroundLayer(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d');
    level.tiles.forEach((tile, x, y) => {
        if (tile.name) {
            sprites.drawTile(tile.name, ctxBuffer, x, y);
        }
    });
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
export function createSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
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
    return function drawCollisions(contex) {
        contex.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            contex.beginPath();
            contex.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            contex.stroke();
        });
        contex.strokeStyle = 'red';
        level.entities.forEach(entity => {
            contex.beginPath();
            contex.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            contex.stroke();
        });
        resolvedTiles.length = 0;
    };
}
//# sourceMappingURL=layers.js.map