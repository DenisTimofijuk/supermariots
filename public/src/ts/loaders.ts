import SpriteSheet, { SpriteSheetNames, TileName, Mario, Pipe } from "./SpriteSheet.js";
import Level from "./level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { createAnim } from "./anim.js";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export type json_File_Names = '1-1' | 'overworld' | 'Mario';
type TileType = 'ground'
type Pattern = 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'pipe-2h' | Pipe | 'cloud-single';
type Tiles = {
    tiles: Array<Tile_Element>
}
export type  Pattern_Element = {
    [K in Pattern]:Tiles;
}
export type Rng = [number, number, number, number] | [number, number, number] | [number, number];

export interface Tile_Element {
    name?: SpriteSheetNames
    pattern?:Pattern
    type?: TileType
    ranges: Array<Rng>
}
type Layer = {
    tiles: Array<Tile_Element>
}
export interface level_1_1 {
    spriteSheet: json_File_Names;
    layers: Array<Layer>
    patterns: Pattern_Element
}

type Tile_Overworld = {
    name: TileName,
    type: TileType,
    index:[number, number]
}
type AnimationElement = {
    name:TileName
    frameLen:number
    frames:Array<TileName>
}
interface Overworld{
    imageURL:string,
    tileW:number,
    tileH:number,
    tiles:Array<Tile_Overworld>,
    animations:Array<AnimationElement>
}

interface MarioJSON{
    imageURL:string;
    frames:Array<{name:Mario, rect:[number, number, number, number]}>
}

export function loadJSON(url:string){
    return fetch(url).then(r => r.json() as Promise<level_1_1 | Overworld | MarioJSON>);
}

export function loadLevelJSON(url:string){
    return loadJSON(url) as Promise<level_1_1>;
}

export function loadSpriteJSON(url:string){
    return loadJSON(url) as Promise<Overworld | MarioJSON>;
}

export function loadSpriteSheet(name:json_File_Names){
    return loadSpriteJSON(`../json/sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL)
    ]))
    .then(([sheetSpec, image]) => {
        var sheetSpecOverworld = sheetSpec as Overworld
        var sheetSpecMarioJSON = sheetSpec as MarioJSON

        const sprites = new SpriteSheet(image, sheetSpecOverworld.tileW, sheetSpecOverworld.tileH);

        if( sheetSpecOverworld.tiles !== undefined ){
            sheetSpecOverworld.tiles.forEach(tileSpec => {
                sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
            })
        }

        
        if( sheetSpecMarioJSON.frames !== undefined ){
            sheetSpecMarioJSON.frames.forEach(frameSpec => {
                sprites.define(frameSpec.name, ...frameSpec.rect);
            })
        }

        if( sheetSpecOverworld.animations !== undefined ){
            sheetSpecOverworld.animations.forEach(animSpec => {
                const animation = createAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);
            })
        }
        
        return sprites;
    })
}
