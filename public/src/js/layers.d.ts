import SpriteSheet from "./SpriteSheet";
import Entity from "./entity.js";
import Level from "./level.js";
export declare function createBackgroundLayer(level: Level, sprites: SpriteSheet): (context: CanvasRenderingContext2D) => void;
export declare function createSpriteLayer(entities: Set<Entity>): (context: CanvasRenderingContext2D) => void;
export declare function createCollisionLayer(level: Level): (contex: CanvasRenderingContext2D) => void;
