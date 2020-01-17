import { Trait } from "../entity.js";
import { Vec2 } from "../math.js";
export default class PlayerController extends Trait {
    constructor() {
        super('playerKontroller');
        this.checkPoint = new Vec2(0, 0);
        this.time = 300;
        this.score = 0;
        this.gameOver = false;
    }
    setPlayer(entity) {
        this.player = entity;
        this.player.stomper.onStomp = () => {
            this.score += 100;
        };
    }
    update(entity, deltaTime, level) {
        if (this.gameOver) {
            return;
        }
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            level.entities.add(this.player);
        }
        else {
            this.time -= deltaTime * 2;
        }
        if (this.time <= 0) {
            this.player.killable.dead = true;
            this.gameOver = true;
        }
        this.player.killable.onScreenHandler(this.player.pos.y);
    }
}
