import Entity, { Trait } from "../entity.js"

export default class Go extends Trait {
    public speed: number
    public dir: number

    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 6000;
    }

    update(entiy: Entity, deltaTime: number): void {
        entiy.vel.x = this.speed * this.dir * deltaTime;

    }
}