import { Vec2 } from "./math";
export default class BoundingBox {
    pos: Vec2;
    size: Vec2;
    offset: Vec2;
    constructor(pos: Vec2, size: Vec2, offset: Vec2);
    bottom: number;
    top: number;
    left: number;
    right: number;
}
