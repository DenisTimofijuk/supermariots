import { Vec2 } from "./math.js";
import BoundingBox from "./boundingBox.js";
export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};
const STANDBY_RANGE = 366;
export class Trait {
    constructor(name) {
        this.NAME = name;
        this.speed = 0;
        this.tasks = [];
    }
    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }
    queue(task) {
        this.tasks.push(task);
    }
    collides(us, them) {
    }
    obstruct(entity, side, match) {
    }
    update(entiy, deltaTime, level) {
    }
}
export default class Entity {
    constructor(name) {
        this.name = name ? name : '';
        this.canCollide = true;
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
    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        });
    }
    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }
    standBy(playerPos) {
        var _this = this;
        function _setMode(flag) {
            if (_this.physics !== undefined && _this.physics.enabled !== undefined) {
                _this.physics.enabled = flag;
            }
        }
        _setMode(Math.abs(playerPos.x - this.pos.x) < STANDBY_RANGE);
    }
    obstruct(side, match) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        });
    }
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }
    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        });
        this.lifeTime += deltaTime;
    }
}
