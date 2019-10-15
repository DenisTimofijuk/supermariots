import { Background_Element } from "./loaders.js";
import SpriteSheet from "./SpriteSheet";
import Entity from "./entity.js";
export declare function createBackgroundLayer(backgrounds: Array<Background_Element>, sprites: SpriteSheet): (context: CanvasRenderingContext2D) => void;
export declare function createSpriteLayer(entity: Entity): (context: CanvasRenderingContext2D) => void;
