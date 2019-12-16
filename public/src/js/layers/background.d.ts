import Level from "../level.js";
import { Matrix } from "../math.js";
import SpriteSheet from "../SpriteSheet.js";
import Camera from "../camera.js";
export declare function createBackgroundLayer(level: Level, tiles: Matrix, sprites: SpriteSheet): (context: CanvasRenderingContext2D, camera: Camera) => void;
