import SpriteSheet, { SpriteSheetNames } from "./SpriteSheet.js";
import Level from "./level.js";
export declare function loadImage(url: string): Promise<HTMLImageElement>;
declare type json_File_Names = '1-1' | 'overworld' | 'Mario';
declare type TileType = 'ground';
export interface Background_Element {
    tile: SpriteSheetNames;
    type: TileType;
    ranges: Array<[number, number, number, number] | [number, number, number] | [number, number]>;
}
export interface level_1_1 {
    spriteSheet: json_File_Names;
    background: Array<Background_Element>;
}
export declare function loadSpriteSheet(name: json_File_Names): Promise<SpriteSheet>;
export declare function loadLevel(name: json_File_Names): Promise<Level>;
export {};
