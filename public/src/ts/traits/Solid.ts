import Entity, { Trait, Sides } from "../entity.js"
import { GetByIndex } from "../IAT.js";

export default class Solid extends Trait {
    public obstructs:boolean

    constructor() {
        super('solid');
        this.obstructs = true;

    }

    obstruct(entity: Entity, side: Symbol, match: GetByIndex) {
        if(!this.obstructs){
            return;
        }

        if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.vel.y = 0;
        } else if (side === Sides.TOP) {
            entity.bounds.top = match.y2;
            entity.vel.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.x2;
            entity.vel.x = 0;
        } else if (side === Sides.RIGHT) {
            entity.bounds.right = match.x1;
            entity.vel.x = 0;
        }
    }

}