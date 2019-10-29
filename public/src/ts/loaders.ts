import SpriteSheet, { SpriteSheetNames, TileName } from "./SpriteSheet.js";
import Level from "./level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

type json_File_Names = '1-1' | 'overworld';
type TileType = 'ground'
export interface Background_Element {
    tile: SpriteSheetNames
    type: TileType
    ranges: Array<[number, number, number, number] | [number, number, number] | [number, number]>
}

function createTiles(level: Level, backgrounds: Array<Background_Element>) {
    function applyRange(background: Background_Element, xStart: number, xLen: number, yStart: number, yLen: number) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        for (let x = xStart; x < xEnd; ++x) {
            for (let y = yStart; y < yEnd; ++y) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type
                })
            };
        };
    }

    backgrounds.forEach(background => {
        background.ranges.forEach(range => {
            if (range.length === 4) {
                const [xStart, xLen, yStart, yLen] = range;
                applyRange(background, xStart, xLen, yStart, yLen);
            }else if(range.length === 2){
                const [xStart, yStart] = range;
                applyRange(background, xStart, 1, yStart, 1);
            }else if(range.length === 3){
                const [xStart, xLen, yStart] = range;
                applyRange(background, xStart, xLen, yStart, 1);
            }
        });
    });
};


export interface level_1_1 {
    spriteSheet: json_File_Names;
    background: Array<Background_Element>
}

type Tile = {
    name: TileName,
    type: TileType,
    index:[number, number]
}

interface Overworld{
    imageURL:string,
    tileW:number,
    tileH:number,
    tiles:Array<Tile>
}

function loadJSON(url:string){
    return fetch(url).then(r => r.json() as Promise<level_1_1 | Overworld>);
}

function loadLevelJSON(url:string){
    return loadJSON(url) as Promise<level_1_1>;
}

function loadSpriteJSON(url:string){
    return loadJSON(url) as Promise<Overworld>;
}

function loadSpriteSheet(name:json_File_Names){
    return loadSpriteJSON(`../json/sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL)
    ]))
    .then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
        sheetSpec.tiles.forEach(tileSpec => {
            sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
        })
        return sprites;
    })
}

export function loadLevel(name: json_File_Names) {
    return loadLevelJSON(`../json/levels/${name}.json`).then(levelSpec => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
    ]))
    .then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.background)        

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}