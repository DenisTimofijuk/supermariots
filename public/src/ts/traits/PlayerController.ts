import Entity, { Trait } from "../entity.js";
import Level from "../level.js";
import { Vec2 } from "../math.js";

export default class PlayerController extends Trait {
    public player!: Entity;
    public checkPoint:Vec2;

    constructor() {
        super('playerKontroller');
        this.checkPoint = new Vec2(0,0);
    }

    setPlayer(entity: Entity) {
        this.player = entity;
    }

    update(entity: Entity, deltaTime: number, level: Level) {
        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            level.entities.add(this.player)
        }

        this.player.killable.onScreenHandler(this.player.pos.y);
    }
}