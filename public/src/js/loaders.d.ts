import SpriteSheet from "./SpriteSheet.js";
import { level_1_1, Overworld, MarioJSON, json_File_Names } from "./IAT.js";
export declare function loadImage(url: string): Promise<HTMLImageElement>;
export declare function loadJSON(url: string): Promise<level_1_1 | Overworld | MarioJSON>;
export declare function loadLevelJSON(url: string): Promise<level_1_1>;
export declare function loadSpriteJSON(url: string): Promise<Overworld | MarioJSON>;
export declare function loadSpriteSheet(name: json_File_Names): Promise<SpriteSheet>;
