import { Vec2 } from "./math.js";

export default class Entity {
    public pos: Vec2;
    public vel: Vec2;
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
    }

    draw(context:CanvasRenderingContext2D){

    }

    update(deltaTime:number){

    }
}
