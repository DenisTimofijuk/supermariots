import { SpriteSheetNames } from "./SpriteSheet.js";
import Level from "./level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { loadBackgroundSprites } from "./sprites.js";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}


type json_File_Names = '1-1';

export interface Background_Element {
    tile: SpriteSheetNames
    ranges: Array<[number, number, number, number]>
}

export interface level_1_1 {
    background: Array<Background_Element>
}

function createTiles(level: Level, backgrounds: Array<Background_Element>) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tiles.set(x, y, {
                        name: background.tile
                    })
                };
            };
        });
    });
};

export function loadLevel(name: json_File_Names) {
    return Promise.all([
        fetch(`../json/levels/${name}.json`).then(r => r.json() as Promise<level_1_1>),
        loadBackgroundSprites()
    ]).then(([levelSpec, backgroundSprites]) => {
        const level = new Level();
        
        createTiles(level, levelSpec.background)

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}