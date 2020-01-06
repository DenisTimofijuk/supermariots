import Entity from "../entity.js";
import Camera from "../camera.js";
export declare function createSpriteLayer(entities: Set<Entity>, width?: number, height?: number): (context: CanvasRenderingContext2D, camera: Camera) => void;
