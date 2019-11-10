import { Trait, Sides } from "../entity.js";
export default class PendulumMove extends Trait {
    constructor() {
        super('pendulumMove');
        this.speed = -30;
        this.enabled = true;
    }
    obstruct(entity, side) {
        if (side === Sides.RIGHT || side === Sides.LEFT) {
            this.speed = -this.speed;
        }
    }
    update(entiy, deltaTime) {
        if (this.enabled) {
            entiy.vel.x = this.speed;
        }
    }
}
//# sourceMappingURL=pendulumMove.js.map