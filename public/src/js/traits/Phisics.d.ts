import Entity, { Trait } from "../entity.js";
import Level from "../level.js";
export default class Physics extends Trait {
    enabled: boolean;
    constructor();
    update(entity: Entity, deltaTime: number, level: Level): void;
}
