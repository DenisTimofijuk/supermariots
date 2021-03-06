import { Trait, Sides } from "../entity.js";
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
        this.playJump = false;
    }
    get falling() {
        return this.ready < 0;
    }
    start() {
        this.requestTime = this.gracePeriod;
    }
    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            this.ready = 1;
        }
        else if (side === Sides.TOP) {
            this.cancel();
        }
    }
    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
    update(entiy, deltaTime) {
        if (entiy.killable.dead) {
            this.dead(entiy);
            return;
        }
        this.playJump = false;
        if (this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;
                this.requestTime = 0;
                this.playJump = true;
            }
            this.requestTime -= deltaTime;
        }
        if (this.engageTime > 0) {
            entiy.vel.y = -(this.velocity + Math.abs(entiy.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }
        this.ready--;
    }
    dead(entity) {
        entity.vel.x = 0;
    }
}
