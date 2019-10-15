import { Trait } from "./entity.js";
export default class Velocity extends Trait {
    constructor() {
        super('velocity');
    }
    update(entity, deltaTyme) {
        entity.pos.x += entity.vel.x * deltaTyme;
        entity.pos.y += entity.vel.y * deltaTyme;
    }
}
//# sourceMappingURL=velocity.js.map