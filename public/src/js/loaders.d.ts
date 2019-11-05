import SpriteSheet, { SpriteSheetNames, TileName, Mario, Pipe } from "./SpriteSheet.js";
export declare function loadImage(url: string): Promise<HTMLImageElement>;
export declare type json_File_Names = '1-1' | 'overworld' | 'Mario';
declare type TileType = 'ground';
declare type Pattern = 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'pipe-2h' | Pipe | 'cloud-single';
declare type Tiles = {
    tiles: Array<Tile_Element>;
};
export declare type Pattern_Element = {
    [K in Pattern]: Tiles;
};
export declare type Rng = [number, number, number, number] | [number, number, number] | [number, number];
export interface Tile_Element {
    name?: SpriteSheetNames;
    pattern?: Pattern;
    type?: TileType;
    ranges: Array<Rng>;
}
declare type Layer = {
    tiles: Array<Tile_Element>;
};
export interface level_1_1 {
    spriteSheet: json_File_Names;
    layers: Array<Layer>;
    patterns: Pattern_Element;
}
declare type Tile_Overworld = {
    name: TileName;
    type: TileType;
    index: [number, number];
};
declare type AnimationElement = {
    name: TileName;
    frameLen: number;
    frames: Array<TileName>;
};
interface Overworld {
    imageURL: string;
    tileW: number;
    tileH: number;
    tiles: Array<Tile_Overworld>;
    animations: Array<AnimationElement>;
}
interface MarioJSON {
    imageURL: string;
    frames: Array<{
        name: Mario;
        rect: [number, number, number, number];
    }>;
}
export declare function loadJSON(url: string): Promise<level_1_1 | Overworld | MarioJSON>;
export declare function loadLevelJSON(url: string): Promise<level_1_1>;
export declare function loadSpriteJSON(url: string): Promise<Overworld | MarioJSON>;
export declare function loadSpriteSheet(name: json_File_Names): Promise<SpriteSheet>;
export {};
