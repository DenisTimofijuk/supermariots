import { Trait } from "../entity.js";
export default class Physics extends Trait {
    constructor() {
        super('physics');
    }
    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileColider.checkX(entity);
        entity.pos.y += entity.vel.y * deltaTime;
        level.tileColider.checkY(entity);
        entity.vel.y += level.gravity * deltaTime;
    }
}
//# sourceMappingURL=Phisics.js.map