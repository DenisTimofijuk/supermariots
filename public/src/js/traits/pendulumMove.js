import { Trait, Sides } from "../entity.js";
export default class PendulumMove extends Trait {
    constructor() {
        if (Array.prototype && !Array.prototype.getRandom) {
            Array.prototype.getRandom = function () {
                return this[Math.floor(Math.random() * this.length)];
            };
        }
        const speeds = [-30, -40, -50];
        super('pendulumMove');
        this.speed = speeds.getRandom();
        this.enabled = true;
    }
    obstruct(entity, side) {
        if (side === Sides.RIGHT || side === Sides.LEFT) {
            this.speed = -this.speed;
        }
    }
    update(entiy, deltaTime) {
        if (this.enabled) {
            entiy.vel.x = this.speed;
        }
    }
}
