import Entity, { Trait } from "../entity.js";
export default class Stomper extends Trait {
    bounceSpeed: number;
    playStomp: boolean;
    private cycleDellay;
    constructor();
    onStomp(us: Entity, them: Entity): void;
    bounce(us: Entity, them: Entity): void;
    collides(us: Entity, them: Entity): void;
    update(entity: Entity, deltaTime: number): void;
}
