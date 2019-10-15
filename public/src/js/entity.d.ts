import { Vec2 } from "./math.js";
export default class Entity {
    pos: Vec2;
    vel: Vec2;
    constructor();
    draw(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
}
