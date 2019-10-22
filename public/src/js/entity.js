import { Vec2 } from "./math.js";
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
        this.traits = [];
        this.lifeTime = 0;
    }
    draw(context) {
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