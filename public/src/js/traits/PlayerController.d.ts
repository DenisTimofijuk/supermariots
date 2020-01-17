import Entity, { Trait } from "../entity.js";
import Level from "../level.js";
import { Vec2 } from "../math.js";
export default class PlayerController extends Trait {
    player: Entity;
    checkPoint: Vec2;
    time: number;
    score: number;
    gameOver: boolean;
    constructor();
    setPlayer(entity: Entity): void;
    update(entity: Entity, deltaTime: number, level: Level): void;
}
