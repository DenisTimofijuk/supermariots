import Entity, { Trait } from "../entity.js";
import Level from "../level.js";

export default class Killable extends Trait {
    public dead: boolean;
    public deadTime: number
    public removeAfter: number
    pos: any;

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

    onScreenHandler(y: number) {
        if (y > 240) {
            console.log("onScreenHandler => kill under");
            this.kill();
        }
        if (y < 0) {
            console.log("onScreenHandler => kill over");
            this.kill();
        }
    }

    update(entity: Entity, deltaTime: number, level: Level) {
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity);
                })
            }
        }
    }
}