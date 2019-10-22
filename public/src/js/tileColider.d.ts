import { Matrix } from "./math";
import Entity from "./entity";
import TileResolver from "./TileResolver.js";
export default class TileCollider {
    tiles: TileResolver;
    constructor(tileMatrix: Matrix);
    checkX(entity: Entity): void;
    checkY(entity: Entity): void;
    test(entity: Entity): void;
}
