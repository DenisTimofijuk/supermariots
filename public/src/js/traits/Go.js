import { Trait } from "../entity.js";
export default class Go extends Trait {
    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 6000;
        this.distance = 0;
        this.heading = 1;
    }
    update(entiy, deltaTime) {
        entiy.vel.x = this.speed * this.dir * deltaTime;
        if (this.dir) {
            this.heading = this.dir;
            this.distance += Math.abs(entiy.vel.x) * deltaTime;
        }
        else {
            this.distance = 0;
        }
    }
}
//# sourceMappingURL=Go.js.map