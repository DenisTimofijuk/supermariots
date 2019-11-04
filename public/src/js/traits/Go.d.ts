import Entity, { Trait } from "../entity.js";
export default class Go extends Trait {
    acceleration: number;
    dir: number;
    distance: number;
    heading: number;
    dragFactor: number;
    deceleration: number;
    constructor();
    update(entity: Entity, deltaTime: number): void;
}
