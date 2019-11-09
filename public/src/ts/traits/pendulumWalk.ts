import Entity, { Trait, Sides } from "../entity.js"

export default class PendulumWalk extends Trait {
    public speed: number

    constructor() {
        super('pendulumWalk');
        this.speed = -30;
    }

    obstruct(entity: Entity, side: Symbol): void {
        if( side === Sides.RIGHT || side === Sides.LEFT ){
                this.speed = -this.speed;
        }
    }

    update(entiy: Entity, deltaTime: number): void {
        entiy.vel.x = this.speed;
    }   
}