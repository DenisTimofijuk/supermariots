import { Trait } from "../entity.js";
export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.bounceSpeed = 200;
        this.playStomp = false;
        this.cycleDellay = 0;
    }
    onStomp(us, them) {
    }
    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }
    collides(us, them) {
        if (!them.killable || them.killable.dead) {
            return;
        }
        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
            this.onStomp(us, them);
            this.playStomp = true;
        }
    }
    update(entity, deltaTime) {
        if (this.cycleDellay > 0) {
            this.cycleDellay = 0;
            this.playStomp = false;
        }
        if (this.playStomp && this.cycleDellay == 0) {
            this.cycleDellay++;
        }
    }
}
