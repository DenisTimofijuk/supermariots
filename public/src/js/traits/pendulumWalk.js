import { Trait, Sides } from "../entity.js";
export default class PendulumWalk extends Trait {
    constructor() {
        super('pendulumWalk');
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
//# sourceMappingURL=pendulumWalk.js.map