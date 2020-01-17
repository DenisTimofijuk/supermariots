import { FontClass } from "../loaders/font_loader.js";
import Entity from "../entity.js";
export declare function createDashboardLayer(font: FontClass, playerEnv: Entity): (contex: CanvasRenderingContext2D) => void;
export declare function createGameOverLayer(font: FontClass, playerEnv: Entity): (contex: CanvasRenderingContext2D) => void;
