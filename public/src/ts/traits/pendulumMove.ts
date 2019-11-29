import Entity, { Trait, Sides } from "../entity.js"

export default class PendulumMove extends Trait {
    public speed: number
    public enabled: boolean

    constructor() {
        if (Array.prototype && !Array.prototype.getRandom) {
            Array.prototype.getRandom = function (): any {
                return this[Math.floor(Math.random()*this.length)];
            };
        }

        const speeds = [-30, -40, -50]
        super('pendulumMove');
        this.speed = speeds.getRandom();
        this.enabled = true;
    }

    obstruct(entity: Entity, side: Symbol): void {
        if (side === Sides.RIGHT || side === Sides.LEFT) {
            this.speed = -this.speed;
        }
    }

    update(entiy: Entity, deltaTime: number): void {
        if (this.enabled) {
            entiy.vel.x = this.speed;
        }
    }
}