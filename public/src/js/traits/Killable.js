import { Trait } from "../entity.js";
const MIN_ENTITY_POS = -50;
const MAX_ENTITY_POS = 240;
export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }
    kill() {
        this.queue(() => this.dead = true);
    }
    revive() {
        this.dead = false;
        this.deadTime = 0;
    }
    onScreenHandler(y) {
        if (y > MAX_ENTITY_POS) {
            this.kill();
        }
        if (y < MIN_ENTITY_POS) {
            this.kill();
        }
    }
    update(entity, deltaTime, level) {
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity);
                });
            }
        }
    }
}
