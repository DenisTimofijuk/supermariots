import Compositor from "./compositor.js";
import Entity from "./entity.js";
import { Matrix } from "./math.js";
import TileColider from "./tileColider.js";
export default class Level {
    backgrounds(backgrounds: any, backgroundSprites: any): void;
    gravity: number;
    comp: Compositor;
    entities: Set<Entity>;
    totalTime: number;
    tileColider: TileColider;
    constructor();
    setCollisionGrid(matrix: Matrix): void;
    update(deltaTime: number): void;
}
