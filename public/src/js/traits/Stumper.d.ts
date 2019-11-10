import Entity, { Trait } from "../entity.js";
export default class Stomper extends Trait {
    bounceSpeed: number;
    constructor();
    bounce(us: Entity, them: Entity): void;
    collides(us: Entity, them: Entity): void;
}
