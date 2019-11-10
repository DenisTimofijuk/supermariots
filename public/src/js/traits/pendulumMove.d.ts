import Entity, { Trait } from "../entity.js";
export default class PendulumMove extends Trait {
    speed: number;
    enabled: boolean;
    constructor();
    obstruct(entity: Entity, side: Symbol): void;
    update(entiy: Entity, deltaTime: number): void;
}
