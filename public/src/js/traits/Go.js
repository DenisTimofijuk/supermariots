import { Trait } from "../entity.js";
export default class Go extends Trait {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 6000;
    }
    update(entiy, deltaTime) {
        entiy.vel.x = this.speed * this.dir * deltaTime;
    }
}
//# sourceMappingURL=Go.js.map