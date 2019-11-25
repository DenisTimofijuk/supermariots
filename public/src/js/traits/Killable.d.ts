import Entity, { Trait } from "../entity.js";
import Level from "../level.js";
export default class Killable extends Trait {
    dead: boolean;
    deadTime: number;
    removeAfter: number;
    pos: any;
    constructor();
    kill(): void;
    revive(): void;
    onScreenHandler(y: number): void;
    update(entity: Entity, deltaTime: number, level: Level): void;
}
