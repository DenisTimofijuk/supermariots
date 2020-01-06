function createEntityLayer(entities) {
    return function drawBounidngBox(contex, camera) {
        contex.strokeStyle = 'red';
        entities.forEach(entity => {
            contex.beginPath();
            contex.rect(entity.pos.x - camera.pos.x, entity.offset.y + entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
            contex.stroke();
        });
    };
}
function createTileCandidateLayer(tileColider) {
    const resolvedTiles = [];
    const tileResolver = tileColider.tiles;
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };
    return function drawTileCandidates(contex, camera) {
        contex.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            contex.beginPath();
            contex.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
            contex.stroke();
        });
        resolvedTiles.length = 0;
    };
}
export function createCollisionLayer(level) {
    const drawTileCandidates = createTileCandidateLayer(level.tileColider);
    const drawBoundingBoxes = createEntityLayer(level.entities);
    return function drawCollisions(contex, camera) {
        drawTileCandidates(contex, camera);
        drawBoundingBoxes(contex, camera);
    };
}
//# sourceMappingURL=collision.js.map