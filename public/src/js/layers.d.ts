import SpriteSheet from "./SpriteSheet";
import Entity from "./entity.js";
import Level from "./level.js";
import Camera from "./camera.js";
import { Matrix } from "./math.js";
export declare function createBackgroundLayer(level: Level, tiles: Matrix, sprites: SpriteSheet): (context: CanvasRenderingContext2D, camera: Camera) => void;
export declare function createSpriteLayer(entities: Set<Entity>, width?: number, height?: number): (context: CanvasRenderingContext2D, camera: Camera) => void;
export declare function createCollisionLayer(level: Level): (contex: CanvasRenderingContext2D, camera: Camera) => void;
export declare function createCameraLayer(cameraToDraw: Camera): (contex: CanvasRenderingContext2D, fromCamera: Camera) => void;
