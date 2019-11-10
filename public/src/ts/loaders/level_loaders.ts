import { loadSpriteSheet, loadLevelJSON } from "../loaders.js";
import Level from "../level.js";
import { createBackgroundLayer, createSpriteLayer } from "../layers.js";
import { Matrix } from "../math.js";
import SpriteSheet from "../SpriteSheet.js";
import { level_1_1, Tile_Element, EntityFactories, json_File_Names, Pattern_Element, Rng } from "../IAT.js";

function setupCollision(levelSpec: level_1_1, level: Level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles)
    }, [] as Tile_Element[])

    const collosionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collosionGrid);
}

function setupBackground(levelSpec: level_1_1, level: Level, backgroundSprites: SpriteSheet) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    })
}

function setupEntities(levelSpec: level_1_1, level: Level, entotiFactory: EntityFactories) {
    const spriteLayer = createSpriteLayer(level.entities);

    levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
        const createEntity = entotiFactory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        level.entities.add(entity);
    })

    level.comp.layers.push(spriteLayer);
}

export function createLevelLoader(entotiFactory: EntityFactories) {
    return function loadLevel(name: json_File_Names) {
        return loadLevelJSON(`../json/levels/${name}.json`).then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet)
        ]))
            .then(([levelSpec, backgroundSprites]) => {
                const level = new Level();

                setupCollision(levelSpec, level);
                setupBackground(levelSpec, level, backgroundSprites);
                setupEntities(levelSpec, level, entotiFactory);

                return level;
            });
    }
}

function createCollisionGrid(tiles: Array<Tile_Element>, patterns: Pattern_Element) {
    const grid = new Matrix()
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { type: tile.type })
    }
    return grid;
}

function createBackgroundGrid(tiles: Array<Tile_Element>, patterns: Pattern_Element) {
    const grid = new Matrix()
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        grid.set(x, y, { name: tile.name })
    }
    return grid;
}

function* expandSpan(xStart: number, xLen: number, yStart: number, yLen: number) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield ({ x, y });
        }
    }
}

function expandRange(range: Rng) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    } else {
        //TEMP workaround to avoid return null:
        return expandSpan(0, 0, 0, 1);
    }
}

function* expandRanges(ranges: Array<Rng>) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function* expandTiles(tiles: Array<Tile_Element>, patterns: Pattern_Element) {
    function* walkTiles(tiles: Array<Tile_Element>, offsetX: number, offsetY: number): Generator<{ tile: Tile_Element, x: number, y: number }> {
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern !== undefined) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY
                    }
                }
            };
        };
    }

    yield* walkTiles(tiles, 0, 0);
};
