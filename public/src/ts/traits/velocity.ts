import Entity, { Trait } from "../entity.js";

export default class Velocity extends Trait{
    constructor() {
        super('velocity')
    }

    update(entity:Entity, deltaTyme:number){
        entity.pos.x += entity.vel.x * deltaTyme;
        entity.pos.y += entity.vel.y * deltaTyme;
    }
}