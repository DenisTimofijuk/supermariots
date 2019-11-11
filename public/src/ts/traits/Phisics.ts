import Entity, { Trait } from "../entity.js"
import Level from "../level.js";

export default class Physics extends Trait {

    constructor() {
        super('physics');
    }

    update(entity: Entity, deltaTime: number, level: Level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileColider.checkX(entity);
        entity.pos.y += entity.vel.y * deltaTime;
        level.tileColider.checkY(entity);
        entity.vel.y += level.gravity * deltaTime;
    }
}