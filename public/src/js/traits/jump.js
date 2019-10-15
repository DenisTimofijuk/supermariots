import { Trait } from "../entity.js";
export default class Jump extends Trait {
    constructor() {
        super('jump');
        this.ready = 0;
        this.duration = 0.3;
        this.velocity = 200;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;
    }
    get falling() {
        return this.ready < 0;
    }
    start() {
        this.engageTime = this.duration;
    }
    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
    update(entiy, deltaTime) {
        if (this.engageTime > 0) {
            entiy.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}
//# sourceMappingURL=jump.js.map