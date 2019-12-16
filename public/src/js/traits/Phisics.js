import { Trait } from "../entity.js";
export default class Physics extends Trait {
    constructor() {
        super('physics');
        this.enabled = true;
    }
    update(entity, deltaTime, level) {
        if (this.enabled) {
            entity.pos.x += entity.vel.x * deltaTime;
            level.tileColider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            level.tileColider.checkY(entity);
            entity.vel.y += level.gravity * deltaTime;
        }
        else {
            entity.pos.x += 0 * deltaTime;
            level.tileColider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            level.tileColider.checkY(entity);
            entity.vel.y += level.gravity * deltaTime;
        }
    }
}
//# sourceMappingURL=Phisics.js.map