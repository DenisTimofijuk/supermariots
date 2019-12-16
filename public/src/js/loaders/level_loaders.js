import { loadSpriteSheet, loadLevelJSON } from "../loaders.js";
import Level from "../level.js";
import { createSpriteLayer } from "../layers.js";
import { Matrix } from "../math.js";
import { createBackgroundLayer } from "../layers/background.js";
function setupCollision(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);
    const collosionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collosionGrid);
}
function setupBackground(levelSpec, level, backgroundSprites) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    });
}
function setupEntities(levelSpec, level, entotiFactory, audios) {
    const spriteLayer = createSpriteLayer(level.entities);
    levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
        const createEntity = entotiFactory[name];
        const entity = createEntity(audios);
        entity.pos.set(x, y);
        level.entities.add(entity);
    });
    level.comp.layers.push(spriteLayer);
}
export function createLevelLoader(entotiFactory, audios) {
    return function loadLevel(name) {
        return loadLevelJSON(`../json/levels/${name}.json`).then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet)
        ]))
            .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();
            setupCollision(levelSpec, level);
            setupBackground(levelSpec, level, backgroundSprites);
            setupEntities(levelSpec, level, entotiFactory, audios);
            return level;
        });
    };
}
function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { type: tile.type });
    }
    return grid;
}
function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { name: tile.name });
    }
    return grid;
}
function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield ({ x, y });
        }
    }
}
function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    }
    else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
    else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    }
    else {
        return expandSpan(0, 0, 0, 1);
    }
}
function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}
function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern !== undefined) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                }
                else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY
                    };
                }
            }
            ;
        }
        ;
    }
    yield* walkTiles(tiles, 0, 0);
}
;
//# sourceMappingURL=level_loaders.js.map