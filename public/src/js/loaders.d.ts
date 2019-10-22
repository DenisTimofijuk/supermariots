import { SpriteSheetNames } from "./SpriteSheet.js";
import Level from "./level.js";
export declare function loadImage(url: string): Promise<HTMLImageElement>;
declare type json_File_Names = '1-1';
export interface Background_Element {
    tile: SpriteSheetNames;
    ranges: Array<[number, number, number, number]>;
}
export interface level_1_1 {
    background: Array<Background_Element>;
}
export declare function loadLevel(name: json_File_Names): Promise<Level>;
export {};
