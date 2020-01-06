import Level from "../level.js";
import Camera from "../camera.js";
import Entity from "../entity.js";
import TileCollider from "../tileColider.js";

function createEntityLayer(entities:Set<Entity>) {
    return function drawBounidngBox(contex: CanvasRenderingContext2D, camera:Camera) {
        contex.strokeStyle = 'red';
        entities.forEach(entity => {
            contex.beginPath();
            contex.rect(
                entity.pos.x - camera.pos.x, 
                entity.offset.y + entity.pos.y - camera.pos.y, 
                entity.size.x, 
                entity.size.y
                );
            contex.stroke();
        })
    }
}

function createTileCandidateLayer(tileColider:TileCollider) {
    const resolvedTiles: Array<{ x: number, y: number }> = [];

    const tileResolver = tileColider.tiles;
    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x: number, y: number) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawTileCandidates(contex: CanvasRenderingContext2D, camera:Camera) {
        contex.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            contex.beginPath();
            contex.rect(x * tileSize - camera.pos.x, y * tileSize - camera.pos.y, tileSize, tileSize);
            contex.stroke();
        });
        resolvedTiles.length = 0;
    }
}

export function createCollisionLayer(level: Level) {
    
    const drawTileCandidates = createTileCandidateLayer(level.tileColider);
    const drawBoundingBoxes = createEntityLayer(level.entities);

    return function drawCollisions(contex: CanvasRenderingContext2D, camera:Camera) {
        drawTileCandidates(contex, camera);
        drawBoundingBoxes(contex, camera);
    }
}