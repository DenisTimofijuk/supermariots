import { Vec2 } from "./math.js";
import BoundingBox from "./boundingBox.js";
export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};
export class Trait {
    constructor(name) {
        this.NAME = name;
        this.speed = 0;
    }
    obstruct(entity, side) {
    }
    update(entiy, deltaTime) {
        console.warn('unhandled update call in Trait');
    }
}
export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.traits = [];
        this.lifeTime = 0;
    }
    draw(context) {
    }
    obstruct(side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        });
    }
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
        this.lifeTime += deltaTime;
    }
}
//# sourceMappingURL=entity.js.map