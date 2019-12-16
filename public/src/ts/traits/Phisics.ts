import Entity, { Trait } from "../entity.js"
import Level from "../level.js";

export default class Physics extends Trait {
    public enabled: boolean;

    constructor() {
        super('physics');
        this.enabled = true;
    }

    update(entity: Entity, deltaTime: number, level: Level) {
        if (this.enabled) {
            entity.pos.x += entity.vel.x * deltaTime;
            level.tileColider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            level.tileColider.checkY(entity);
            entity.vel.y += level.gravity * deltaTime;
        }else{
            entity.pos.x += 0 * deltaTime;
            level.tileColider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            level.tileColider.checkY(entity);
            entity.vel.y += level.gravity * deltaTime;
        }
    }
}