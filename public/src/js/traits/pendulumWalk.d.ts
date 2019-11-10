import Entity, { Trait } from "../entity.js";
export default class PendulumWalk extends Trait {
    speed: number;
    enabled: boolean;
    constructor();
    obstruct(entity: Entity, side: Symbol): void;
    update(entiy: Entity, deltaTime: number): void;
}
