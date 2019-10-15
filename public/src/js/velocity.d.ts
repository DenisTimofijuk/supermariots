import Entity, { Trait } from "./entity.js";
export default class Velocity extends Trait {
    constructor();
    update(entity: Entity, deltaTyme: number): void;
}
