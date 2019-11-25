import { Trait } from "../entity.js";
import { Vec2 } from "../math.js";
export default class PlayerController extends Trait {
    constructor() {
        super('playerKontroller');
        this.checkPoint = new Vec2(0, 0);
    }
    setPlayer(entity) {
        this.player = entity;
    }
    update(entity, deltaTime, level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            level.entities.add(this.player);
        }
        this.player.killable.onScreenHandler(this.player.pos.y);
    }
}
//# sourceMappingURL=PlayerController.js.map