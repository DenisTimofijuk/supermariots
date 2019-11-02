import Entity, { Trait } from "../entity.js";
export default class Go extends Trait {
    speed: number;
    dir: number;
    distance: number;
    heading: number;
    constructor();
    update(entiy: Entity, deltaTime: number): void;
}
