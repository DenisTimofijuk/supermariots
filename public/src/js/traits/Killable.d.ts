import Entity, { Trait } from "../entity.js";
import Level from "../level.js";
export default class Killable extends Trait {
    dead: boolean;
    deadTime: number;
    removeAfter: number;
    constructor();
    kill(): void;
    revive(): void;
    update(entity: Entity, deltaTime: number, level: Level): void;
}
