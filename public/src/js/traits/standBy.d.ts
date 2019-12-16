import Entity, { Trait } from "../entity.js";
export default class StandBy extends Trait {
    constructor();
    update(entiy: Entity, deltaTime: number): void;
}
