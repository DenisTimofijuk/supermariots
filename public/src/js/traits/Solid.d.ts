import Entity, { Trait } from "../entity.js";
import { GetByIndex } from "../IAT.js";
export default class Solid extends Trait {
    obstructs: boolean;
    constructor();
    obstruct(entity: Entity, side: Symbol, match: GetByIndex): void;
}
